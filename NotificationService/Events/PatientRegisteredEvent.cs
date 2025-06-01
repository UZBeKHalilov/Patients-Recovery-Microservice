namespace NotificationService.Events
{
    public class PatientRegisteredEvent
    {
        public Guid Id { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        // Boshqa kerakli maydonlar
    }
}