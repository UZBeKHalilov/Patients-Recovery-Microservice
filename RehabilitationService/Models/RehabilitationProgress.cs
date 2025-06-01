using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RehabilitationService.Models
{
    public class RehabilitationProgress
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public Guid RehabilitationPlanId { get; set; }
        [ForeignKey("RehabilitationPlanId")]
        public RehabilitationPlan? RehabilitationPlan { get; set; }
        public DateTime RecordDate { get; set; } = DateTime.UtcNow;
        [Required]
        public string ProgressNotes { get; set; } = string.Empty;
        public int? PainLevel { get; set; } // 0-10 scale
        public int? FunctionalAbilityScore { get; set; } // Specific scale, e.g., FIM
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}