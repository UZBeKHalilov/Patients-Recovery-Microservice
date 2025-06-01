using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppointmentService.Data;
using AppointmentService.Models;
using AppointmentService.Dtos;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppointmentService.Services; // Add this
using AppointmentService.Events; // Add this

namespace AppointmentService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IRabbitMQPublisherService _rabbitMQPublisherService; // Uncomment this

        public AppointmentsController(ApplicationDbContext context, IRabbitMQPublisherService rabbitMQPublisherService) // Modify constructor
        {
            _context = context;
            _rabbitMQPublisherService = rabbitMQPublisherService; // Uncomment this
        }

        // GET: api/Appointments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppointmentReadDto>>> GetAppointments()
        {
            var appointments = await _context.Appointments
                .Select(a => new AppointmentReadDto
                {
                    Id = a.Id,
                    PatientId = a.PatientId,
                    DoctorId = a.DoctorId,
                    AppointmentDateTime = a.AppointmentDateTime,
                    Status = a.Status,
                    Notes = a.Notes,
                    CreatedAt = a.CreatedAt,
                    UpdatedAt = a.UpdatedAt
                })
                .ToListAsync();
            return Ok(appointments);
        }

        // GET: api/Appointments/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<AppointmentReadDto>> GetAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
            {
                return NotFound();
            }

            var appointmentDto = new AppointmentReadDto
            {
                Id = appointment.Id,
                PatientId = appointment.PatientId,
                DoctorId = appointment.DoctorId,
                AppointmentDateTime = appointment.AppointmentDateTime,
                Status = appointment.Status,
                Notes = appointment.Notes,
                CreatedAt = appointment.CreatedAt,
                UpdatedAt = appointment.UpdatedAt
            };

            return Ok(appointmentDto);
        }

        // POST: api/Appointments
        [HttpPost]
        public async Task<ActionResult<AppointmentReadDto>> PostAppointment(AppointmentCreateDto appointmentCreateDto)
        {
            var appointment = new Appointment
            {
                PatientId = appointmentCreateDto.PatientId,
                DoctorId = appointmentCreateDto.DoctorId,
                AppointmentDateTime = appointmentCreateDto.AppointmentDateTime,
                Status = appointmentCreateDto.Status, // Directly use enum from DTO
                Notes = appointmentCreateDto.Notes,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            var appointmentScheduledEvent = new AppointmentScheduledEvent 
            {
                AppointmentId = appointment.Id, 
                PatientId = appointment.PatientId, 
                DoctorId = appointment.DoctorId, 
                AppointmentDateTime = appointment.AppointmentDateTime,
                Status = appointment.Status.ToString() // Convert enum to string for event
            };
            _rabbitMQPublisherService.PublishMessage("appointment.scheduled", appointmentScheduledEvent);

            var appointmentReadDto = new AppointmentReadDto
            {
                Id = appointment.Id,
                PatientId = appointment.PatientId,
                DoctorId = appointment.DoctorId,
                AppointmentDateTime = appointment.AppointmentDateTime,
                Status = appointment.Status, // This should be fine as AppointmentReadDto.Status is AppointmentStatus
                Notes = appointment.Notes,
                CreatedAt = appointment.CreatedAt,
                UpdatedAt = appointment.UpdatedAt
            };

            return CreatedAtAction(nameof(GetAppointment), new { id = appointment.Id }, appointmentReadDto);
        }

        // PUT: api/Appointments/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppointment(int id, AppointmentUpdateDto appointmentUpdateDto)
        {
            if (id != appointmentUpdateDto.Id) // Now Id exists in AppointmentUpdateDto
            {
                return BadRequest();
            }

            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }

            appointment.PatientId = appointmentUpdateDto.PatientId;
            appointment.DoctorId = appointmentUpdateDto.DoctorId;
            appointment.AppointmentDateTime = appointmentUpdateDto.AppointmentDateTime;
            appointment.Status = appointmentUpdateDto.Status; // Directly use enum from DTO
            appointment.Notes = appointmentUpdateDto.Notes;
            appointment.UpdatedAt = DateTime.UtcNow;

            _context.Entry(appointment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Publish an event (e.g., AppointmentUpdatedEvent)
            var appointmentUpdatedEvent = new AppointmentUpdatedEvent 
            {
                AppointmentId = appointment.Id, 
                Status = appointment.Status.ToString(), // Convert enum to string for event
                NewAppointmentDateTime = appointment.AppointmentDateTime
            };
            _rabbitMQPublisherService.PublishMessage("appointment.updated", appointmentUpdatedEvent);

            return NoContent();
        }

        // DELETE: api/Appointments/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();

            // Publish an event (e.g., AppointmentCancelledEvent)
            var appointmentCancelledEvent = new AppointmentCancelledEvent 
            {
                AppointmentId = appointment.Id,
                PatientId = appointment.PatientId,
                DoctorId = appointment.DoctorId
            };
            _rabbitMQPublisherService.PublishMessage("appointment.cancelled", appointmentCancelledEvent);

            return NoContent();
        }

        private bool AppointmentExists(int id)
        {
            return _context.Appointments.Any(e => e.Id == id);
        }
    }
}