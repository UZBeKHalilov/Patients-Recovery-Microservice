using System.ComponentModel.DataAnnotations;

namespace AppointmentService.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        [Required]
        public int PatientId { get; set; }

        [Required]
        public int DoctorId { get; set; }

        [Required]
        public DateTime AppointmentDateTime { get; set; }

        [Required]
        [MaxLength(50)]
      public AppointmentStatus Status { get; set; }
// e.g., "Scheduled", "Completed", "Cancelled", "Rescheduled"

        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}