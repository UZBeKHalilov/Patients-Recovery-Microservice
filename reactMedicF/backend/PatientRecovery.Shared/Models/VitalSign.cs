
namespace PatientRecovery.Shared.Models
{
    public class VitalSign
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        
        public int HeartRate { get; set; }
        public decimal Temperature { get; set; }
        public string BloodPressure { get; set; } = string.Empty;
        public int OxygenSaturation { get; set; }
        public int RespiratoryRate { get; set; }
        
        public DateTime RecordedAt { get; set; } = DateTime.UtcNow;
        public int RecordedBy { get; set; } // UserId of the recorder
        
        public string? Notes { get; set; }
        
        // Navigation properties
        public Patient Patient { get; set; } = null!;
    }
}
