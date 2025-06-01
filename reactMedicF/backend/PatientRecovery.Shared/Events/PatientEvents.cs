
namespace PatientRecovery.Shared.Events
{
    public class PatientAssignedEvent
    {
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public int AssignedBy { get; set; }
        public DateTime AssignedAt { get; set; }
        public string PatientName { get; set; } = string.Empty;
        public string DoctorName { get; set; } = string.Empty;
    }

    public class VitalSignsUpdatedEvent
    {
        public int PatientId { get; set; }
        public int HeartRate { get; set; }
        public decimal Temperature { get; set; }
        public string BloodPressure { get; set; } = string.Empty;
        public int OxygenSaturation { get; set; }
        public int RespiratoryRate { get; set; }
        public DateTime RecordedAt { get; set; }
        public bool IsEmergency { get; set; }
    }

    public class EmergencyAlertEvent
    {
        public int PatientId { get; set; }
        public string AlertType { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Severity { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
        public int? DoctorId { get; set; }
    }

    public class MedicalAnalysisCompletedEvent
    {
        public int AnalysisId { get; set; }
        public int PatientId { get; set; }
        public string AnalysisType { get; set; } = string.Empty;
        public string Results { get; set; } = string.Empty;
        public DateTime CompletedAt { get; set; }
        public int CompletedBy { get; set; }
    }
}
