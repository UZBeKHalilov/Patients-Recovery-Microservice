
using System.ComponentModel.DataAnnotations;

namespace PatientRecovery.Shared.Models
{
    public class Doctor
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        
        [MaxLength(50)]
        public string LicenseNumber { get; set; } = string.Empty;
        
        [MaxLength(100)]
        public string Specialization { get; set; } = string.Empty;
        
        [MaxLength(50)]
        public string Department { get; set; } = string.Empty;
        
        public int YearsOfExperience { get; set; }
        
        [MaxLength(15)]
        public string PhoneNumber { get; set; } = string.Empty;
        
        public bool IsAvailable { get; set; } = true;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public User User { get; set; } = null!;
        public List<Patient> AssignedPatients { get; set; } = new();
    }
}
