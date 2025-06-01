namespace DoctorManagementService.Events
{
    public class DoctorRegisteredEvent
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Specialization { get; set; }
        // Kerakli boshqa maydonlar
    }
}