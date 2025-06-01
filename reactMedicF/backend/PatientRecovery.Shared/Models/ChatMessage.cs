
using System.ComponentModel.DataAnnotations;

namespace PatientRecovery.Shared.Models
{
    public class ChatMessage
    {
        public int Id { get; set; }
        
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public int? PatientId { get; set; } // For context
        
        [Required]
        public string Message { get; set; } = string.Empty;
        
        public MessageType Type { get; set; } = MessageType.Text;
        
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        public DateTime? ReadAt { get; set; }
        
        public bool IsEmergency { get; set; } = false;
        
        // Navigation properties
        public User Sender { get; set; } = null!;
        public User Receiver { get; set; } = null!;
        public Patient? Patient { get; set; }
    }
    
    public enum MessageType
    {
        Text = 1,
        Image = 2,
        Document = 3,
        VitalSignsAlert = 4,
        EmergencyAlert = 5
    }
}
