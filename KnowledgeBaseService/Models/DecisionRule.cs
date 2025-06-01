using System.ComponentModel.DataAnnotations;

namespace KnowledgeBaseService.Models
{
    public class DecisionRule
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string RuleName { get; set; } = string.Empty;
        public string? Description { get; set; }
        [Required]
        public string ConditionExpression { get; set; } = string.Empty; // e.g., "Patient.Age > 65 AND Patient.HasDiabetes == true"
        [Required]
        public string ActionToTake { get; set; } = string.Empty; // e.g., "Recommend intensive monitoring", "Suggest consultation with specialist"
        public int Priority { get; set; } = 0; // Higher number means higher priority
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}