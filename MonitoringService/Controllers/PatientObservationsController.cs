using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonitoringService.Data;
using MonitoringService.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonitoringService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientObservationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PatientObservationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/PatientObservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientObservation>>> GetPatientObservations()
        {
            return await _context.PatientObservations.ToListAsync();
        }

        // GET: api/PatientObservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PatientObservation>> GetPatientObservation(int id)
        {
            var patientObservation = await _context.PatientObservations.FindAsync(id);

            if (patientObservation == null)
            {
                return NotFound();
            }

            return patientObservation;
        }

        // GET: api/PatientObservations/patient/123
        [HttpGet("patient/{patientId}")]
        public async Task<ActionResult<IEnumerable<PatientObservation>>> GetObservationsByPatientId(int patientId) // Changed string patientId to int patientId
        {
            return await _context.PatientObservations
                                 .Where(po => po.PatientId == patientId)
                                 .OrderByDescending(po => po.ObservationTimestamp)
                                 .ToListAsync();
        }

        // POST: api/PatientObservations
        [HttpPost]
        public async Task<ActionResult<PatientObservation>> PostPatientObservation(PatientObservation patientObservation)
        {
            // Kelajakda: Validatsiya va boshqa biznes logikalarini qo'shish mumkin
            // Masalan, PatientId mavjudligini PatientManagementService orqali tekshirish

            _context.PatientObservations.Add(patientObservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPatientObservation), new { id = patientObservation.Id }, patientObservation);
        }

        // Kelajakda PUT va DELETE metodlarini qo'shish mumkin
        // PUT: api/PatientObservations/5
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutPatientObservation(int id, PatientObservation patientObservation)
        // {
        //     if (id != patientObservation.Id)
        //     {
        //         return BadRequest();
        //     }

        //     _context.Entry(patientObservation).State = EntityState.Modified;

        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!_context.PatientObservations.Any(e => e.Id == id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }

        //     return NoContent();
        // }

        // DELETE: api/PatientObservations/5
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeletePatientObservation(int id)
        // {
        //     var patientObservation = await _context.PatientObservations.FindAsync(id);
        //     if (patientObservation == null)
        //     {
        //         return NotFound();
        //     }

        //     _context.PatientObservations.Remove(patientObservation);
        //     await _context.SaveChangesAsync();

        //     return NoContent();
        // }
    }
}