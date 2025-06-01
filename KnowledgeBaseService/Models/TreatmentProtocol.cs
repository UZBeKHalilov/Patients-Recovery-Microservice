using System.ComponentModel.DataAnnotations;

namespace KnowledgeBaseService.Models
{
    public class TreatmentProtocol
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string ProtocolName { get; set; } = string.Empty;
        public string? Description { get; set; }
        [Required]
        public string TargetCondition { get; set; } = string.Empty; // e.g., "Type 2 Diabetes", "Hypertension"
        public string RecommendedMedications { get; set; } = string.Empty; // Could be a JSON string or structured data
        public string LifestyleRecommendations { get; set; } = string.Empty;
        public string MonitoringGuidelines { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public bool IsCurrent { get; set; } = true;
    }
}