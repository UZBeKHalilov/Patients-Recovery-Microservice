using DoctorManagementService.Data;
using DoctorManagementService.Dtos;
using DoctorManagementService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DoctorManagementService.Services; // Buni qo'shing
using DoctorManagementService.Events; // Buni qo'shing
using System.Text.Json; // JsonSerializer uchun
using DoctorManagementService.Services;

namespace DoctorManagementService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IRabbitMQPublisherService _rabbitMQPublisherService; // Buni qo'shing

        public DoctorsController(ApplicationDbContext context, IRabbitMQPublisherService rabbitMQPublisherService) // Buni o'zgartiring
        {
            _context = context;
            _rabbitMQPublisherService = rabbitMQPublisherService; // Buni qo'shing
        }

        // GET: api/Doctors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorReadDto>>> GetDoctors()
        {
            var doctors = await _context.Doctors
                .Select(d => new DoctorReadDto
                {
                    Id = d.Id,
                    FirstName = d.FirstName,
                    LastName = d.LastName,
                    Specialization = d.Specialization,
                    PhoneNumber = d.PhoneNumber,
                    Email = d.Email
                })
                .ToListAsync();

            return Ok(doctors);
        }

        // GET: api/Doctors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DoctorReadDto>> GetDoctor(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);

            if (doctor == null)
            {
                return NotFound();
            }

            var doctorDto = new DoctorReadDto
            {
                Id = doctor.Id,
                FirstName = doctor.FirstName,
                LastName = doctor.LastName,
                Specialization = doctor.Specialization,
                PhoneNumber = doctor.PhoneNumber,
                Email = doctor.Email
            };

            return Ok(doctorDto);
        }

        // POST: api/Doctors
        [HttpPost]
        public async Task<ActionResult<DoctorReadDto>> PostDoctor(DoctorCreateDto doctorCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var doctor = new Doctor
            {
                FirstName = doctorCreateDto.FirstName,
                LastName = doctorCreateDto.LastName,
                Specialization = doctorCreateDto.Specialization,
                PhoneNumber = doctorCreateDto.PhoneNumber,
                Email = doctorCreateDto.Email
            };

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            var doctorReadDto = new DoctorReadDto
            {
                Id = doctor.Id,
                FirstName = doctor.FirstName,
                LastName = doctor.LastName,
                Specialization = doctor.Specialization,
                PhoneNumber = doctor.PhoneNumber,
                Email = doctor.Email
            };

            // RabbitMQ orqali DoctorRegisteredEvent yuborish
            var doctorRegisteredEvent = new DoctorRegisteredEvent
            {
                Id = doctor.Id,
                FirstName = doctor.FirstName,
                LastName = doctor.LastName,
                Specialization = doctor.Specialization
            };
           _rabbitMQPublisherService.PublishEvent(doctorRegisteredEvent, "doctor.registered");

            return CreatedAtAction(nameof(GetDoctor), new { id = doctor.Id }, doctorReadDto);
        }

        // PUT: api/Doctors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoctor(int id, DoctorUpdateDto doctorUpdateDto)
        {
            if (id != doctorUpdateDto.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }

            doctor.FirstName = doctorUpdateDto.FirstName;
            doctor.LastName = doctorUpdateDto.LastName;
            doctor.Specialization = doctorUpdateDto.Specialization;
            doctor.PhoneNumber = doctorUpdateDto.PhoneNumber;
            doctor.Email = doctorUpdateDto.Email;

            _context.Entry(doctor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

                // RabbitMQ orqali DoctorUpdatedEvent yuborish (agar kerak bo'lsa)
                // var doctorUpdatedEvent = new DoctorUpdatedEvent { /* ... */ };
                // _rabbitMQPublisherService.PublishEvent(doctorUpdatedEvent, "doctor.updated");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoctorExists(id))
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

        // DELETE: api/Doctors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();

            // RabbitMQ orqali DoctorDeletedEvent yuborish (agar kerak bo'lsa)
            // var doctorDeletedEvent = new { Id = id }; // Anonim obyekt yoki maxsus DTO
            // _rabbitMQPublisherService.PublishEvent(doctorDeletedEvent, "doctor.deleted");

            return NoContent();
        }

        private bool DoctorExists(int id)
        {
            return _context.Doctors.Any(e => e.Id == id);
        }
    }
}