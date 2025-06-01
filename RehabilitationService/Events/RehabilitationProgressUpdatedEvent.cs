namespace RehabilitationService.Events
{
    public class RehabilitationProgressUpdatedEvent
    {
        public Guid ProgressId { get; set; }
        public Guid RehabilitationPlanId { get; set; }
        public Guid PatientId { get; set; } // To help identify the patient easily
        public DateTime RecordDate { get; set; }
        public string ProgressNotes { get; set; } = string.Empty;
        public int? PainLevel { get; set; }
        public int? FunctionalAbilityScore { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}