using System.ComponentModel.DataAnnotations;

namespace KnowledgeBaseService.Dtos
{
    public class KnowledgeArticleCreateDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Content { get; set; } = string.Empty;
        public string? Category { get; set; }
        public List<string> Tags { get; set; } = new List<string>();
        [Required]
        public Guid AuthorId { get; set; }
        public bool IsPublished { get; set; } = false;
    }
}