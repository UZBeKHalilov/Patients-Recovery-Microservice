
using PatientRecovery.Shared.Models;

namespace PatientRecovery.AuthService.Services
{
    public interface ITokenService
    {
        string GenerateToken(User user);
        Task<bool> ValidateTokenAsync(string token);
    }
}
