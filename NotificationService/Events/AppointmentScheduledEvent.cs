namespace NotificationService.Events
{
    public class AppointmentScheduledEvent
    {
        public Guid Id { get; set; }
        public Guid PatientId { get; set; }
        public Guid DoctorId { get; set; }
        public DateTime AppointmentDateTime { get; set; }
        public string? Notes { get; set; }
        // Bemor va shifokor haqida qo'shimcha ma'lumot (masalan, email) kerak bo'lishi mumkin
    }
}