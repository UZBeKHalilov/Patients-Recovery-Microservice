using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RehabilitationService.Data;
using RehabilitationService.Dtos;
using RehabilitationService.Events;
using RehabilitationService.Models;
using RehabilitationService.Services;

namespace RehabilitationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RehabilitationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IRabbitMQPublisherService _rabbitMQPublisherService;

        public RehabilitationController(ApplicationDbContext context, IRabbitMQPublisherService rabbitMQPublisherService)
        {
            _context = context;
            _rabbitMQPublisherService = rabbitMQPublisherService;
        }

        // GET: api/Rehabilitation/plans
        [HttpGet("plans")]
        public async Task<ActionResult<IEnumerable<RehabilitationPlanReadDto>>> GetRehabilitationPlans([FromQuery] Guid? patientId, [FromQuery] Guid? doctorId)
        {
            var query = _context.RehabilitationPlans
                                .Include(rp => rp.Exercises)
                                .Include(rp => rp.ProgressRecords)
                                .AsQueryable();

            if (patientId.HasValue)
            {
                query = query.Where(rp => rp.PatientId == patientId.Value);
            }

            if (doctorId.HasValue)
            {
                query = query.Where(rp => rp.DoctorId == doctorId.Value);
            }

            var plans = await query.ToListAsync();

            var planDtos = plans.Select(p => new RehabilitationPlanReadDto
            {
                Id = p.Id,
                PatientId = p.PatientId,
                DoctorId = p.DoctorId,
                PlanName = p.PlanName,
                Description = p.Description,
                StartDate = p.StartDate,
                EndDate = p.EndDate,
                IsActive = p.IsActive,
                CreatedAt = p.CreatedAt,
                UpdatedAt = p.UpdatedAt,
                Exercises = p.Exercises.Select(e => new ExerciseDto
                {
                    Id = e.Id,
                    Name = e.Name,
                    Description = e.Description,
                    Sets = e.Sets,
                    Repetitions = e.Repetitions,
                    Duration = e.Duration,
                    Frequency = e.Frequency
                }).ToList(),
                ProgressRecords = p.ProgressRecords.Select(pr => new RehabilitationProgressReadDto
                {
                    Id = pr.Id,
                    RehabilitationPlanId = pr.RehabilitationPlanId,
                    RecordDate = pr.RecordDate,
                    ProgressNotes = pr.ProgressNotes,
                    PainLevel = pr.PainLevel,
                    FunctionalAbilityScore = pr.FunctionalAbilityScore,
                    CreatedAt = pr.CreatedAt
                }).ToList()
            }).ToList();

            return Ok(planDtos);
        }

        // GET: api/Rehabilitation/plans/{id}
        [HttpGet("plans/{id}")]
        public async Task<ActionResult<RehabilitationPlanReadDto>> GetRehabilitationPlan(Guid id)
        {
            var plan = await _context.RehabilitationPlans
                                     .Include(rp => rp.Exercises)
                                     .Include(rp => rp.ProgressRecords)
                                     .FirstOrDefaultAsync(rp => rp.Id == id);

            if (plan == null)
            {
                return NotFound();
            }

            var planDto = new RehabilitationPlanReadDto
            {
                Id = plan.Id,
                PatientId = plan.PatientId,
                DoctorId = plan.DoctorId,
                PlanName = plan.PlanName,
                Description = plan.Description,
                StartDate = plan.StartDate,
                EndDate = plan.EndDate,
                IsActive = plan.IsActive,
                CreatedAt = plan.CreatedAt,
                UpdatedAt = plan.UpdatedAt,
                Exercises = plan.Exercises.Select(e => new ExerciseDto
                {
                    Id = e.Id,
                    Name = e.Name,
                    Description = e.Description,
                    Sets = e.Sets,
                    Repetitions = e.Repetitions,
                    Duration = e.Duration,
                    Frequency = e.Frequency
                }).ToList(),
                ProgressRecords = plan.ProgressRecords.Select(pr => new RehabilitationProgressReadDto
                {
                    Id = pr.Id,
                    RehabilitationPlanId = pr.RehabilitationPlanId,
                    RecordDate = pr.RecordDate,
                    ProgressNotes = pr.ProgressNotes,
                    PainLevel = pr.PainLevel,
                    FunctionalAbilityScore = pr.FunctionalAbilityScore,
                    CreatedAt = pr.CreatedAt
                }).ToList()
            };

            return Ok(planDto);
        }

        // POST: api/Rehabilitation/plans
        [HttpPost("plans")]
        public async Task<ActionResult<RehabilitationPlanReadDto>> CreateRehabilitationPlan(RehabilitationPlanCreateDto createDto)
        {
            var plan = new RehabilitationPlan
            {
                Id = Guid.NewGuid(),
                PatientId = createDto.PatientId,
                DoctorId = createDto.DoctorId,
                PlanName = createDto.PlanName,
                Description = createDto.Description,
                StartDate = createDto.StartDate,
                EndDate = createDto.EndDate,
                IsActive = true, // Default to active
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Exercises = createDto.Exercises.Select(e => new Exercise
                {
                    Id = Guid.NewGuid(),
                    Name = e.Name,
                    Description = e.Description,
                    Sets = e.Sets,
                    Repetitions = e.Repetitions,
                    Duration = e.Duration,
                    Frequency = e.Frequency,
                    CreatedAt = DateTime.UtcNow
                }).ToList()
            };

            _context.RehabilitationPlans.Add(plan);
            await _context.SaveChangesAsync();

            // Publish event
            var planCreatedEvent = new RehabilitationPlanCreatedEvent
            {
                Id = plan.Id,
                PatientId = plan.PatientId,
                DoctorId = plan.DoctorId,
                PlanName = plan.PlanName,
                StartDate = plan.StartDate,
                EndDate = plan.EndDate,
                CreatedAt = plan.CreatedAt
            };
            _rabbitMQPublisherService.PublishMessage(planCreatedEvent, "rehabilitation.plan.created");

            var planDto = new RehabilitationPlanReadDto
            {
                Id = plan.Id,
                PatientId = plan.PatientId,
                DoctorId = plan.DoctorId,
                PlanName = plan.PlanName,
                Description = plan.Description,
                StartDate = plan.StartDate,
                EndDate = plan.EndDate,
                IsActive = plan.IsActive,
                CreatedAt = plan.CreatedAt,
                UpdatedAt = plan.UpdatedAt,
                Exercises = plan.Exercises.Select(e => new ExerciseDto
                {
                    Id = e.Id,
                    Name = e.Name,
                    Description = e.Description,
                    Sets = e.Sets,
                    Repetitions = e.Repetitions,
                    Duration = e.Duration,
                    Frequency = e.Frequency
                }).ToList()
            };

            return CreatedAtAction(nameof(GetRehabilitationPlan), new { id = plan.Id }, planDto);
        }

        // PUT: api/Rehabilitation/plans/{id}
        [HttpPut("plans/{id}")]
        public async Task<IActionResult> UpdateRehabilitationPlan(Guid id, RehabilitationPlanUpdateDto updateDto)
        {
            var plan = await _context.RehabilitationPlans.Include(p => p.Exercises).FirstOrDefaultAsync(p => p.Id == id);

            if (plan == null)
            {
                return NotFound();
            }

            if (updateDto.PatientId.HasValue) plan.PatientId = updateDto.PatientId.Value;
            if (updateDto.DoctorId.HasValue) plan.DoctorId = updateDto.DoctorId.Value;
            if (!string.IsNullOrEmpty(updateDto.PlanName)) plan.PlanName = updateDto.PlanName;
            if (updateDto.Description != null) plan.Description = updateDto.Description;
            if (updateDto.StartDate.HasValue) plan.StartDate = updateDto.StartDate.Value;
            if (updateDto.EndDate.HasValue) plan.EndDate = updateDto.EndDate.Value;
            if (updateDto.IsActive.HasValue) plan.IsActive = updateDto.IsActive.Value;
            plan.UpdatedAt = DateTime.UtcNow;

            if (updateDto.Exercises != null)
            {
                // Simple update: remove old and add new. For more complex scenarios, consider tracking changes.
                _context.Exercises.RemoveRange(plan.Exercises);
                plan.Exercises = updateDto.Exercises.Select(e => new Exercise
                {
                    Id = e.Id ?? Guid.NewGuid(), // Use existing Id if provided, else new Guid
                    RehabilitationPlanId = plan.Id,
                    Name = e.Name,
                    Description = e.Description,
                    Sets = e.Sets,
                    Repetitions = e.Repetitions,
                    Duration = e.Duration,
                    Frequency = e.Frequency,
                    CreatedAt = DateTime.UtcNow // Or keep original if updating existing
                }).ToList();
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RehabilitationPlanExists(id))
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

        // DELETE: api/Rehabilitation/plans/{id}
        [HttpDelete("plans/{id}")]
        public async Task<IActionResult> DeleteRehabilitationPlan(Guid id)
        {
            var plan = await _context.RehabilitationPlans.FindAsync(id);
            if (plan == null)
            {
                return NotFound();
            }

            _context.RehabilitationPlans.Remove(plan);
            await _context.SaveChangesAsync();

            // Optionally, publish an event for plan deletion
            // _rabbitMQPublisherService.PublishMessage(new { PlanId = id, DeletedAt = DateTime.UtcNow }, "rehabilitation.plan.deleted");

            return NoContent();
        }

        // POST: api/Rehabilitation/progress
        [HttpPost("progress")]
        public async Task<ActionResult<RehabilitationProgressReadDto>> AddRehabilitationProgress(RehabilitationProgressCreateDto createDto)
        {
            var plan = await _context.RehabilitationPlans.FindAsync(createDto.RehabilitationPlanId);
            if (plan == null)
            {
                return BadRequest("Rehabilitation plan not found.");
            }

            var progress = new RehabilitationProgress
            {
                Id = Guid.NewGuid(),
                RehabilitationPlanId = createDto.RehabilitationPlanId,
                RecordDate = DateTime.UtcNow,
                ProgressNotes = createDto.ProgressNotes,
                PainLevel = createDto.PainLevel,
                FunctionalAbilityScore = createDto.FunctionalAbilityScore,
                CreatedAt = DateTime.UtcNow
            };

            _context.RehabilitationProgresses.Add(progress);
            await _context.SaveChangesAsync();

            // Publish event
            var progressUpdatedEvent = new RehabilitationProgressUpdatedEvent
            {
                ProgressId = progress.Id,
                RehabilitationPlanId = progress.RehabilitationPlanId,
                PatientId = plan.PatientId, // Assuming you want to include PatientId in the event
                RecordDate = progress.RecordDate,
                ProgressNotes = progress.ProgressNotes,
                PainLevel = progress.PainLevel,
                FunctionalAbilityScore = progress.FunctionalAbilityScore,
                UpdatedAt = progress.CreatedAt // Using CreatedAt as UpdatedAt for new record
            };
            _rabbitMQPublisherService.PublishMessage(progressUpdatedEvent, "rehabilitation.progress.updated");

            var progressDto = new RehabilitationProgressReadDto
            {
                Id = progress.Id,
                RehabilitationPlanId = progress.RehabilitationPlanId,
                RecordDate = progress.RecordDate,
                ProgressNotes = progress.ProgressNotes,
                PainLevel = progress.PainLevel,
                FunctionalAbilityScore = progress.FunctionalAbilityScore,
                CreatedAt = progress.CreatedAt
            };

            return CreatedAtAction(nameof(GetRehabilitationProgress), new { planId = progress.RehabilitationPlanId, progressId = progress.Id }, progressDto);
        }

        // GET: api/Rehabilitation/progress/{planId}
        [HttpGet("progress/{planId}")]
        public async Task<ActionResult<IEnumerable<RehabilitationProgressReadDto>>> GetRehabilitationProgressForPlan(Guid planId)
        {
            var progressRecords = await _context.RehabilitationProgresses
                                              .Where(p => p.RehabilitationPlanId == planId)
                                              .OrderByDescending(p => p.RecordDate)
                                              .ToListAsync();

            if (!progressRecords.Any())
            {
                // Check if plan exists to differentiate between no progress and no plan
                if (!await _context.RehabilitationPlans.AnyAsync(rp => rp.Id == planId))
                    return NotFound("Rehabilitation plan not found.");
                return Ok(new List<RehabilitationProgressReadDto>()); // Plan exists, but no progress yet
            }

            var progressDtos = progressRecords.Select(p => new RehabilitationProgressReadDto
            {
                Id = p.Id,
                RehabilitationPlanId = p.RehabilitationPlanId,
                RecordDate = p.RecordDate,
                ProgressNotes = p.ProgressNotes,
                PainLevel = p.PainLevel,
                FunctionalAbilityScore = p.FunctionalAbilityScore,
                CreatedAt = p.CreatedAt
            }).ToList();

            return Ok(progressDtos);
        }

        // GET: api/Rehabilitation/progress/{planId}/{progressId} - Specific endpoint to make CreatedAtAction work
        [HttpGet("progress/{planId}/{progressId}")]
        public async Task<ActionResult<RehabilitationProgressReadDto>> GetRehabilitationProgress(Guid planId, Guid progressId)
        {
            var progress = await _context.RehabilitationProgresses
                                         .FirstOrDefaultAsync(p => p.RehabilitationPlanId == planId && p.Id == progressId);

            if (progress == null)
            {
                return NotFound();
            }

            var progressDto = new RehabilitationProgressReadDto
            {
                Id = progress.Id,
                RehabilitationPlanId = progress.RehabilitationPlanId,
                RecordDate = progress.RecordDate,
                ProgressNotes = progress.ProgressNotes,
                PainLevel = progress.PainLevel,
                FunctionalAbilityScore = progress.FunctionalAbilityScore,
                CreatedAt = progress.CreatedAt
            };

            return Ok(progressDto);
        }


        private bool RehabilitationPlanExists(Guid id)
        {
            return _context.RehabilitationPlans.Any(e => e.Id == id);
        }
    }
}