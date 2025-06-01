using System.ComponentModel.DataAnnotations;

namespace RehabilitationService.Dtos
{
    public class ExerciseDto
    {
        public Guid? Id { get; set; } // Nullable for creation, non-nullable for read
        [Required]
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int? Sets { get; set; }
        public int? Repetitions { get; set; }
        public string? Duration { get; set; }
        public string? Frequency { get; set; }
    }
}