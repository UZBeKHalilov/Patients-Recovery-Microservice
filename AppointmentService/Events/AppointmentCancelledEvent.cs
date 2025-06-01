namespace AppointmentService.Events
{
    public class AppointmentCancelledEvent
    {
        public int AppointmentId { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
    }
}