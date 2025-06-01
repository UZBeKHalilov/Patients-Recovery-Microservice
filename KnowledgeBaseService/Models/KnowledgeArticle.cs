using System.ComponentModel.DataAnnotations;

namespace KnowledgeBaseService.Models
{
    public class KnowledgeArticle
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Content { get; set; } = string.Empty;
        public string? Category { get; set; } // e.g., Cardiology, Neurology, General Health
        public List<string> Tags { get; set; } = new List<string>();
        public Guid AuthorId { get; set; } // Could be a DoctorId or a system user
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public bool IsPublished { get; set; } = false;
    }
}