namespace NotificationService
{
    public class RabbitMQSettings
    {
        public string HostName { get; set; } = string.Empty;
        public int Port { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string ExchangeName { get; set; } = string.Empty;
        public string PatientRegisteredQueueName { get; set; } = string.Empty;
        public string DoctorRegisteredQueueName { get; set; } = string.Empty;
        public string AppointmentScheduledQueueName { get; set; } = string.Empty;
        public string AppointmentUpdatedQueueName { get; set; } = string.Empty;
        public string AppointmentCancelledQueueName { get; set; } = string.Empty;
    }
}