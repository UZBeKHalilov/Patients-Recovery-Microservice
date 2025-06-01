namespace NotificationService.Events
{
    // This class should mirror the AlertCreatedEvent in MonitoringService
    public class AlertCreatedEvent
    {
        public int AlertId { get; set; }
        public int PatientId { get; set; }
        public string Message { get; set; }
        public string AlertLevel { get; set; }
        public DateTime Timestamp { get; set; }
        public int? PatientObservationId { get; set; }
    }
}