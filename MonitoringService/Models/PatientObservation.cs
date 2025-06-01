using System.ComponentModel.DataAnnotations;

namespace MonitoringService.Models
{
    public class PatientObservation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int PatientId { get; set; } // PatientManagementService dagi Patient Id siga ishora qiladi

        [Required]
        public DateTime ObservationTimestamp { get; set; }

        public double? HeartRate { get; set; } // Yurak urishi (zarba/daqiqa)
        public double? TemperatureCelsius { get; set; } // Tana harorati (Selsiyda)
        public string? BloodPressure { get; set; } // Qon bosimi (masalan, "120/80 mmHg")
        public double? OxygenSaturation { get; set; } // Kislorod bilan to'yinganlik (%)
        public string? Notes { get; set; } // Qo'shimcha qaydlar

        // Boshqa kerakli kuzatuv parametrlari qo'shilishi mumkin
    }
}