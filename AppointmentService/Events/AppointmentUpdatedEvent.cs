namespace AppointmentService.Events
{
    public class AppointmentUpdatedEvent
    {
        public int AppointmentId { get; set; }
        public string Status { get; set; }
        public DateTime NewAppointmentDateTime { get; set; }
        // Add other relevant properties that might change
    }
}