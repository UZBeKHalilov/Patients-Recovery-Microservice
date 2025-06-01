namespace RehabilitationService.Dtos
{
    public class RehabilitationProgressReadDto
    {
        public Guid Id { get; set; }
        public Guid RehabilitationPlanId { get; set; }
        public DateTime RecordDate { get; set; }
        public string ProgressNotes { get; set; } = string.Empty;
        public int? PainLevel { get; set; }
        public int? FunctionalAbilityScore { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}