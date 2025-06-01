using AppointmentService.Models;
using System.ComponentModel.DataAnnotations;

namespace AppointmentService.Dtos
{
    public class AppointmentCreateDto
    {
        [Required]
        public int PatientId { get; set; } // Changed from Guid to int

        [Required]
        public int DoctorId { get; set; }

        [Required]
        public DateTime AppointmentDateTime { get; set; }

        [Required]
        public AppointmentStatus Status { get; set; } // Added Status property

        public string? Notes { get; set; }
    }
}