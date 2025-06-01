
using PatientRecovery.Shared.Models;

namespace PatientRecovery.DoctorService.Services
{
    public interface IDoctorService
    {
        Task<Doctor?> GetDoctorByIdAsync(int doctorId);
        Task<Doctor?> GetDoctorByUserIdAsync(int userId);
        Task<List<Doctor>> GetAllDoctorsAsync();
        Task<List<Doctor>> GetAvailableDoctorsAsync();
        Task<Doctor> CreateDoctorAsync(Doctor doctor);
        Task<Doctor?> UpdateDoctorAsync(Doctor doctor);
        Task<bool> DeleteDoctorAsync(int doctorId);
        Task<List<Patient>> GetDoctorPatientsAsync(int doctorId);
        Task<bool> UpdateAvailabilityAsync(int doctorId, bool isAvailable);
    }
}
