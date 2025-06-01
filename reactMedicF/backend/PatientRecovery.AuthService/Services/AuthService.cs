
using Microsoft.EntityFrameworkCore;
using PatientRecovery.AuthService.Data;
using PatientRecovery.Shared.Models;
using System.Security.Cryptography;
using System.Text;

namespace PatientRecovery.AuthService.Services
{
    public class AuthService : IAuthService
    {
        private readonly AuthDbContext _context;

        public AuthService(AuthDbContext context)
        {
            _context = context;
        }

        public async Task<User?> AuthenticateAsync(string email, string password)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == email && x.IsActive);

            if (user == null || !VerifyPassword(password, user.PasswordHash))
                return null;

            return user;
        }

        public async Task<User> RegisterAsync(RegisterRequest request)
        {
            // Check if user already exists
            if (await _context.Users.AnyAsync(x => x.Email == request.Email))
                throw new InvalidOperationException("User with this email already exists");

            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PasswordHash = HashPassword(request.Password),
                Role = request.Role,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Create role-specific profile
            if (request.Role == UserRole.Doctor)
            {
                var doctor = new Doctor
                {
                    UserId = user.Id,
                    LicenseNumber = request.LicenseNumber ?? "",
                    Specialization = request.Specialization ?? "",
                    Department = request.Department ?? "",
                    PhoneNumber = request.PhoneNumber ?? "",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                _context.Doctors.Add(doctor);
            }
            else if (request.Role == UserRole.Patient)
            {
                var patient = new Patient
                {
                    UserId = user.Id,
                    PatientCode = GeneratePatientCode(),
                    DateOfBirth = request.DateOfBirth ?? DateTime.Now.AddYears(-30),
                    Gender = request.Gender ?? "",
                    PhoneNumber = request.PhoneNumber ?? "",
                    Address = request.Address ?? "",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                _context.Patients.Add(patient);
            }

            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> GetUserByIdAsync(int userId)
        {
            return await _context.Users
                .FirstOrDefaultAsync(x => x.Id == userId && x.IsActive);
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(x => x.Email == email && x.IsActive);
        }

        public async Task<bool> UpdateUserAsync(User user)
        {
            user.UpdatedAt = DateTime.UtcNow;
            _context.Users.Update(user);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<User>> GetUsersByRoleAsync(UserRole role)
        {
            return await _context.Users
                .Where(x => x.Role == role && x.IsActive)
                .OrderBy(x => x.FirstName)
                .ToListAsync();
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }

        private bool VerifyPassword(string password, string hash)
        {
            return HashPassword(password) == hash;
        }

        private string GeneratePatientCode()
        {
            return "P" + DateTime.Now.ToString("yyyyMMdd") + 
                   new Random().Next(1000, 9999).ToString();
        }
    }
}
