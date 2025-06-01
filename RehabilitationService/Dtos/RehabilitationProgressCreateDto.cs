using System.ComponentModel.DataAnnotations;

namespace RehabilitationService.Dtos
{
    public class RehabilitationProgressCreateDto
    {
        [Required]
        public Guid RehabilitationPlanId { get; set; }
        [Required]
        public string ProgressNotes { get; set; } = string.Empty;
        public int? PainLevel { get; set; }
        public int? FunctionalAbilityScore { get; set; }
    }
}