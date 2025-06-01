using System.ComponentModel.DataAnnotations;

namespace RehabilitationService.Models
{
    public class RehabilitationPlan
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public Guid PatientId { get; set; }
        [Required]
        public Guid DoctorId { get; set; }
        [Required]
        public string PlanName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<RehabilitationProgress> ProgressRecords { get; set; } = new List<RehabilitationProgress>();
        public ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();
    }
}