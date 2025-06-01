using AppointmentService.Models;
using System.ComponentModel.DataAnnotations;

namespace AppointmentService.Dtos
{
    public class AppointmentUpdateDto
    {
        public int Id { get; set; } // Added Id property

        [Required]
        public int PatientId { get; set; }

        [Required]
        public int DoctorId { get; set; }

        [Required]
        public DateTime AppointmentDateTime { get; set; }

        [Required]
        public AppointmentStatus Status { get; set; }

        public string? Notes { get; set; }
    }
}