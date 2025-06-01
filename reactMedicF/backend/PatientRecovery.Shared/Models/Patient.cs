
using System.ComponentModel.DataAnnotations;

namespace PatientRecovery.Shared.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        
        [Required]
        [MaxLength(20)]
        public string PatientCode { get; set; } = string.Empty;
        
        public DateTime DateOfBirth { get; set; }
        
        [MaxLength(10)]
        public string Gender { get; set; } = string.Empty;
        
        [MaxLength(15)]
        public string PhoneNumber { get; set; } = string.Empty;
        
        [MaxLength(200)]
        public string Address { get; set; } = string.Empty;
        
        [MaxLength(100)]
        public string SurgeryType { get; set; } = string.Empty;
        
        public DateTime SurgeryDate { get; set; }
        
        public int? AssignedDoctorId { get; set; }
        
        public PatientStatus Status { get; set; } = PatientStatus.InHospital;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public User User { get; set; } = null!;
        public Doctor? AssignedDoctor { get; set; }
        public List<VitalSign> VitalSigns { get; set; } = new();
        public List<MedicalAnalysis> MedicalAnalyses { get; set; } = new();
    }
    
    public enum PatientStatus
    {
        InHospital = 1,
        Recovering = 2,
        InRehabilitation = 3,
        Discharged = 4,
        Critical = 5
    }
}
