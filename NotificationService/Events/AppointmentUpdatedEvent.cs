namespace NotificationService.Events
{
    public class AppointmentUpdatedEvent
    {
        public Guid Id { get; set; }
        public Guid PatientId { get; set; }
        public Guid DoctorId { get; set; }
        public DateTime NewAppointmentDateTime { get; set; }
        public DateTime OldAppointmentDateTime { get; set; }
        public string? Status { get; set; }
        public string? Notes { get; set; }
    }
}