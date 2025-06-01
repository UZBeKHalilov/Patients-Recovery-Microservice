using System.ComponentModel.DataAnnotations;

namespace RehabilitationService.Dtos
{
    public class RehabilitationPlanCreateDto
    {
        [Required]
        public Guid PatientId { get; set; }
        [Required]
        public Guid DoctorId { get; set; }
        [Required]
        public string PlanName { get; set; } = string.Empty;
        public string? Description { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public List<ExerciseDto> Exercises { get; set; } = new List<ExerciseDto>();
    }
}