using System.ComponentModel.DataAnnotations;

namespace DoctorManagementService.Models
{
    public class Doctor
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        [Required]
        [StringLength(100)]
        public string Specialization { get; set; }

        [Phone]
        public string PhoneNumber { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        // Agar kerak bo'lsa, boshqa maydonlar qo'shilishi mumkin
        // Masalan, ish tajribasi, litsenziya raqami va hokazo.
    }
}