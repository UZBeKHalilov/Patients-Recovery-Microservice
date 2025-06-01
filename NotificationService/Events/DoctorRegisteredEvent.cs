namespace NotificationService.Events
{
    public class DoctorRegisteredEvent
    {
        public Guid Id { get; set; }
        public string? FullName { get; set; }
        public string? Specialization { get; set; }
        public string? Email { get; set; } // Email or other contact info
        // Boshqa kerakli maydonlar
    }
}