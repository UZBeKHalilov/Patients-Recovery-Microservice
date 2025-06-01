namespace AppointmentService.Events
{
    public class AppointmentScheduledEvent
    {
        public int AppointmentId { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public DateTime AppointmentDateTime { get; set; }
        public string Status { get; set; }
    }
}