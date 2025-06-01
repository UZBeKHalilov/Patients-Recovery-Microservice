using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RehabilitationService.Models
{
    public class Exercise
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public Guid RehabilitationPlanId { get; set; }
        [ForeignKey("RehabilitationPlanId")]
        public RehabilitationPlan? RehabilitationPlan { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int? Sets { get; set; }
        public int? Repetitions { get; set; }
        public string? Duration { get; set; }
        public string? Frequency { get; set; } // e.g., "3 times a week"
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}