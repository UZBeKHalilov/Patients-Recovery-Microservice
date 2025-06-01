using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatientManagementService.Data;
using PatientManagementService.Models;
using PatientManagementService.Services;
using PatientManagementService.Events;
using PatientManagementService.Dtos;

namespace PatientManagementService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly RabbitMQPublisherService _publisherService;

        public PatientsController(ApplicationDbContext context, RabbitMQPublisherService publisherService)
        {
            _context = context;
            _publisherService = publisherService;
        }

        // GET: api/Patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientReadDto>>> GetPatients()
        {
            var patients = await _context.Patients
                .Select(p => new PatientReadDto
                {
                    Id = p.Id,
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    DateOfBirth = p.DateOfBirth,
                    Gender = p.Gender,
                    Address = p.Address,
                    PhoneNumber = p.PhoneNumber,
                    Email = p.Email,
                    RegistrationDate = p.RegistrationDate
                })
                .ToListAsync();
            return Ok(patients);
        }

        // GET: api/Patients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PatientReadDto>> GetPatient(Guid id)
        {
            var patient = await _context.Patients.FindAsync(id);

            if (patient == null)
            {
                return NotFound();
            }

            var patientDto = new PatientReadDto
            {
                Id = patient.Id,
                FirstName = patient.FirstName,
                LastName = patient.LastName,
                DateOfBirth = patient.DateOfBirth,
                Gender = patient.Gender,
                Address = patient.Address,
                PhoneNumber = patient.PhoneNumber,
                Email = patient.Email,
                RegistrationDate = patient.RegistrationDate
            };

            return Ok(patientDto);
        }

        // POST: api/Patients
        [HttpPost]
        public async Task<ActionResult<PatientReadDto>> PostPatient(PatientCreateDto patientCreateDto)
        {
            var patient = new Patient
            {
                FirstName = patientCreateDto.FirstName,
                LastName = patientCreateDto.LastName,
                DateOfBirth = patientCreateDto.DateOfBirth,
                Gender = patientCreateDto.Gender,
                Address = patientCreateDto.Address,
                PhoneNumber = patientCreateDto.PhoneNumber,
                Email = patientCreateDto.Email,
                RegistrationDate = DateTime.UtcNow
            };

            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            // RabbitMQ orqali xabar yuborish
            var patientEvent = new PatientRegisteredEvent
            {
                Id = patient.Id,
                FirstName = patient.FirstName,
                LastName = patient.LastName,
                Email = patient.Email,
                RegistrationDate = patient.RegistrationDate
            };
            _publisherService.PublishPatientRegisteredEvent(patientEvent);

            var patientReadDto = new PatientReadDto
            {
                Id = patient.Id,
                FirstName = patient.FirstName,
                LastName = patient.LastName,
                DateOfBirth = patient.DateOfBirth,
                Gender = patient.Gender,
                Address = patient.Address,
                PhoneNumber = patient.PhoneNumber,
                Email = patient.Email,
                RegistrationDate = patient.RegistrationDate
            };

            return CreatedAtAction(nameof(GetPatient), new { id = patient.Id }, patientReadDto);
        }

        // PUT: api/Patients/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatient(Guid id, PatientUpdateDto patientUpdateDto)
        {
            if (id != patientUpdateDto.Id)
            {
                return BadRequest("ID mismatch");
            }

            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            patient.FirstName = patientUpdateDto.FirstName;
            patient.LastName = patientUpdateDto.LastName;
            patient.DateOfBirth = patientUpdateDto.DateOfBirth;
            patient.Gender = patientUpdateDto.Gender;
            patient.Address = patientUpdateDto.Address;
            patient.PhoneNumber = patientUpdateDto.PhoneNumber;
            patient.Email = patientUpdateDto.Email;
            // RegistrationDate o'zgartirilmaydi

            _context.Entry(patient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientExists(id))
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

        // DELETE: api/Patients/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(Guid id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PatientExists(Guid id)
        {
            return _context.Patients.Any(e => e.Id == id);
        }
    }
}