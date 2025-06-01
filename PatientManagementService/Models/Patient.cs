using System;
using System.ComponentModel.DataAnnotations;

namespace PatientManagementService.Models
{
    public class Patient
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(100)]
        public string? FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string? LastName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [StringLength(20)]
        public string? Gender { get; set; }

        [StringLength(200)]
        public string? Address { get; set; }

        [Phone]
        [StringLength(20)]
        public string? PhoneNumber { get; set; }

        [EmailAddress]
        [StringLength(100)]
        public string? Email { get; set; }

        public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;

        // Qo'shimcha maydonlar, masalan, tibbiy tarixga oid ma'lumotlar
        // public string MedicalHistorySummary { get; set; }
    }
}