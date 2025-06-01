using MonitoringService.Models;

namespace MonitoringService.Events
{
    public class AlertCreatedEvent
    {
        private int id;
        private AlertLevel level;

        public int AlertId { get; set; }
        public int PatientId { get; set; }
        public string Message { get; set; }
        public string AlertLevel { get; set; }
        public DateTime Timestamp { get; set; }
        public int? PatientObservationId { get; set; }

        public AlertCreatedEvent(int alertId, int patientId, string message, string alertLevel, DateTime timestamp, int? patientObservationId)
        {
            AlertId = alertId;
            PatientId = patientId;
            Message = message;
            AlertLevel = alertLevel;
            Timestamp = timestamp;
            PatientObservationId = patientObservationId;
        }

        public AlertCreatedEvent(int id, int patientId, string message, AlertLevel level, DateTime timestamp, int? patientObservationId)
        {
            this.id = id;
            PatientId = patientId;
            Message = message;
            this.level = level;
            Timestamp = timestamp;
            PatientObservationId = patientObservationId;
        }
    }
}