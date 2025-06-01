using System.ComponentModel.DataAnnotations;

namespace KnowledgeBaseService.Dtos
{
    public class DecisionRuleCreateDto
    {
        [Required]
        public string RuleName { get; set; } = string.Empty;
        public string? Description { get; set; }
        [Required]
        public string ConditionExpression { get; set; } = string.Empty;
        [Required]
        public string ActionToTake { get; set; } = string.Empty;
        public int Priority { get; set; } = 0;
        public bool IsActive { get; set; } = true;
    }
}