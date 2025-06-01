using System.ComponentModel.DataAnnotations;

namespace RehabilitationService.Dtos
{
    public class RehabilitationPlanUpdateDto
    {
        public Guid? PatientId { get; set; }
        public Guid? DoctorId { get; set; }
        public string? PlanName { get; set; }
        public string? Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? IsActive { get; set; }
        public List<ExerciseDto>? Exercises { get; set; }
    }
}