using System.ComponentModel.DataAnnotations;
using System;

namespace MonitoringService.Models
{
    public enum AlertLevel
    {
        Info,
        Warning,
        Critical
    }

    public class Alert
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int PatientId { get; set; } // PatientManagementService dagi Patient bilan bog'lanish uchun

        [Required]
        public string Message { get; set; }

        public AlertLevel Level { get; set; }

        public DateTime Timestamp { get; set; }

        public bool IsAcknowledged { get; set; } // Ogohlantirish ko'rib chiqilganmi?

        public int? PatientObservationId { get; set; } // Qaysi kuzatuv asosida ogohlantirish yaratildi (ixtiyoriy)
        public PatientObservation? PatientObservation { get; set; }

        public Alert()
        {
            Timestamp = DateTime.UtcNow;
            IsAcknowledged = false;
        }
    }
}