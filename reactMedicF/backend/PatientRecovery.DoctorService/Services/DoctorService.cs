
using Microsoft.EntityFrameworkCore;
using PatientRecovery.DoctorService.Data;
using PatientRecovery.Shared.Models;

namespace PatientRecovery.DoctorService.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly DoctorDbContext _context;

        public DoctorService(DoctorDbContext context)
        {
            _context = context;
        }

        public async Task<Doctor?> GetDoctorByIdAsync(int doctorId)
        {
            return await _context.Doctors
                .Include(d => d.User)
                .Include(d => d.AssignedPatients)
                .FirstOrDefaultAsync(d => d.Id == doctorId);
        }

        public async Task<Doctor?> GetDoctorByUserIdAsync(int userId)
        {
            return await _context.Doctors
                .Include(d => d.User)
                .Include(d => d.AssignedPatients)
                .FirstOrDefaultAsync(d => d.UserId == userId);
        }

        public async Task<List<Doctor>> GetAllDoctorsAsync()
        {
            return await _context.Doctors
                .Include(d => d.User)
                .Include(d => d.AssignedPatients)
                .ToListAsync();
        }

        public async Task<List<Doctor>> GetAvailableDoctorsAsync()
        {
            return await _context.Doctors
                .Include(d => d.User)
                .Where(d => d.IsAvailable)
                .ToListAsync();
        }

        public async Task<Doctor> CreateDoctorAsync(Doctor doctor)
        {
            doctor.CreatedAt = DateTime.UtcNow;
            doctor.UpdatedAt = DateTime.UtcNow;
            
            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();
            return doctor;
        }

        public async Task<Doctor?> UpdateDoctorAsync(Doctor doctor)
        {
            var existingDoctor = await _context.Doctors.FindAsync(doctor.Id);
            if (existingDoctor == null)
                return null;

            existingDoctor.LicenseNumber = doctor.LicenseNumber;
            existingDoctor.Specialization = doctor.Specialization;
            existingDoctor.Department = doctor.Department;
            existingDoctor.YearsOfExperience = doctor.YearsOfExperience;
            existingDoctor.PhoneNumber = doctor.PhoneNumber;
            existingDoctor.IsAvailable = doctor.IsAvailable;
            existingDoctor.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existingDoctor;
        }

        public async Task<bool> DeleteDoctorAsync(int doctorId)
        {
            var doctor = await _context.Doctors.FindAsync(doctorId);
            if (doctor == null)
                return false;

            _context.Doctors.Remove(doctor);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<Patient>> GetDoctorPatientsAsync(int doctorId)
        {
            return await _context.Patients
                .Include(p => p.User)
                .Where(p => p.AssignedDoctorId == doctorId)
                .ToListAsync();
        }

        public async Task<bool> UpdateAvailabilityAsync(int doctorId, bool isAvailable)
        {
            var doctor = await _context.Doctors.FindAsync(doctorId);
            if (doctor == null)
                return false;

            doctor.IsAvailable = isAvailable;
            doctor.UpdatedAt = DateTime.UtcNow;
            
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
