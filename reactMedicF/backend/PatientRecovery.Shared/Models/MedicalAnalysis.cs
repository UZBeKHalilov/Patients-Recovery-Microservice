
using System.ComponentModel.DataAnnotations;

namespace PatientRecovery.Shared.Models
{
    public class MedicalAnalysis
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string AnalysisType { get; set; } = string.Empty;
        
        [Required]
        public string Results { get; set; } = string.Empty; // JSON format
        
        [MaxLength(500)]
        public string? DoctorNotes { get; set; }
        
        public AnalysisStatus Status { get; set; } = AnalysisStatus.Pending;
        
        public DateTime OrderedDate { get; set; } = DateTime.UtcNow;
        public DateTime? CompletedDate { get; set; }
        public int OrderedBy { get; set; } // Doctor UserId
        
        // Navigation properties
        public Patient Patient { get; set; } = null!;
    }
    
    public enum AnalysisStatus
    {
        Pending = 1,
        InProgress = 2,
        Completed = 3,
        Cancelled = 4
    }
}
