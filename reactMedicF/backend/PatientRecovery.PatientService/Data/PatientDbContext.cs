
using Microsoft.EntityFrameworkCore;
using PatientRecovery.Shared.Models;

namespace PatientRecovery.PatientService.Data
{
    public class PatientDbContext : DbContext
    {
        public PatientDbContext(DbContextOptions<PatientDbContext> options) : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<VitalSign> VitalSigns { get; set; }
        public DbSet<MedicalAnalysis> MedicalAnalyses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Patient configuration
            modelBuilder.Entity<Patient>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.PatientCode).IsUnique();
                entity.HasOne(e => e.User)
                      .WithOne()
                      .HasForeignKey<Patient>(e => e.UserId);
                entity.HasOne(e => e.AssignedDoctor)
                      .WithMany(e => e.AssignedPatients)
                      .HasForeignKey(e => e.AssignedDoctorId);
                entity.HasMany(e => e.VitalSigns)
                      .WithOne(e => e.Patient)
                      .HasForeignKey(e => e.PatientId);
                entity.HasMany(e => e.MedicalAnalyses)
                      .WithOne(e => e.Patient)
                      .HasForeignKey(e => e.PatientId);
            });

            // VitalSign configuration
            modelBuilder.Entity<VitalSign>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Temperature).HasPrecision(4, 2);
                entity.Property(e => e.BloodPressure).HasMaxLength(10);
            });

            // MedicalAnalysis configuration
            modelBuilder.Entity<MedicalAnalysis>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Results).IsRequired();
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
