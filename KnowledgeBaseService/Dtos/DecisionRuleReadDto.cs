namespace KnowledgeBaseService.Dtos
{
    public class DecisionRuleReadDto
    {
        public Guid Id { get; set; }
        public string RuleName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string ConditionExpression { get; set; } = string.Empty;
        public string ActionToTake { get; set; } = string.Empty;
        public int Priority { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}