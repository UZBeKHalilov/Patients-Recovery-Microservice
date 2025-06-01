using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonitoringService.Data;
using MonitoringService.Models;
using MonitoringService.Services; // Add this for IRabbitMQPublisherService
using MonitoringService.Events;   // Add this for AlertCreatedEvent

namespace MonitoringService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlertsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IRabbitMQPublisherService _messagePublisher; // Add this

        // Modify the constructor to inject IRabbitMQPublisherService
        public AlertsController(ApplicationDbContext context, IRabbitMQPublisherService messagePublisher)
        {
            _context = context;
            _messagePublisher = messagePublisher; // Initialize it
        }

        // GET: api/Alerts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Alert>>> GetAlerts([FromQuery] bool includeAcknowledged = false)
        {
            if (includeAcknowledged)
            {
                return await _context.Alerts.OrderByDescending(a => a.Timestamp).ToListAsync();
            }
            return await _context.Alerts.Where(a => !a.IsAcknowledged).OrderByDescending(a => a.Timestamp).ToListAsync();
        }

        // GET: api/Alerts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Alert>> GetAlert(int id)
        {
            var alert = await _context.Alerts.FindAsync(id);

            if (alert == null)
            {
                return NotFound();
            }

            return alert;
        }

        // GET: api/Alerts/patient/123
        [HttpGet("patient/{patientId}")]
        public async Task<ActionResult<IEnumerable<Alert>>> GetAlertsByPatientId(int patientId, [FromQuery] bool includeAcknowledged = false) // Changed string patientId to int patientId
        {
            var query = _context.Alerts.Where(a => a.PatientId == patientId);
            if (!includeAcknowledged)
            {
                query = query.Where(a => !a.IsAcknowledged);
            }
            return await query.OrderByDescending(a => a.Timestamp).ToListAsync();
        }

        // POST: api/Alerts
        [HttpPost]
        public async Task<ActionResult<Alert>> PostAlert(Alert alert)
        {
            _context.Alerts.Add(alert);
            await _context.SaveChangesAsync();

            // Publish an event after saving the alert
            var alertEvent = new AlertCreatedEvent(
                alert.Id,
                alert.PatientId,
                alert.Message,
                alert.Level, // Changed from alert.AlertLevel to alert.Level
                alert.Timestamp,
                alert.PatientObservationId
            );
            _messagePublisher.PublishMessage(alertEvent, "alert_created_queue"); // Specify your queue name

            return CreatedAtAction(nameof(GetAlert), new { id = alert.Id }, alert);
        }

        // PUT: api/Alerts/5/acknowledge
        [HttpPut("{id}/acknowledge")]
        public async Task<IActionResult> AcknowledgeAlert(int id)
        {
            var alert = await _context.Alerts.FindAsync(id);
            if (alert == null)
            {
                return NotFound();
            }

            alert.IsAcknowledged = true;
            _context.Entry(alert).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Alerts.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        
        // DELETE: api/Alerts/5
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteAlert(int id)
        // {
        //     var alert = await _context.Alerts.FindAsync(id);
        //     if (alert == null)
        //     {
        //         return NotFound();
        //     }

        //     _context.Alerts.Remove(alert);
        //     await _context.SaveChangesAsync();

        //     return NoContent();
        // }
    }
}