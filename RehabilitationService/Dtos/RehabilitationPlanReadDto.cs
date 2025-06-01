namespace RehabilitationService.Dtos
{
    public class RehabilitationPlanReadDto
    {
        public Guid Id { get; set; }
        public Guid PatientId { get; set; }
        public Guid DoctorId { get; set; }
        public string PlanName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<ExerciseDto> Exercises { get; set; } = new List<ExerciseDto>();
        public List<RehabilitationProgressReadDto> ProgressRecords { get; set; } = new List<RehabilitationProgressReadDto>();
    }
}