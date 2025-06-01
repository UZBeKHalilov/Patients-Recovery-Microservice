
using Microsoft.EntityFrameworkCore;
using PatientRecovery.Shared.Models;

namespace PatientRecovery.DoctorService.Data
{
    public class DoctorDbContext : DbContext
    {
        public DoctorDbContext(DbContextOptions<DoctorDbContext> options) : base(options)
        {
        }

        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Doctor configuration
            modelBuilder.Entity<Doctor>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.User)
                      .WithOne()
                      .HasForeignKey<Doctor>(e => e.UserId);
                entity.HasMany(e => e.AssignedPatients)
                      .WithOne(e => e.AssignedDoctor)
                      .HasForeignKey(e => e.AssignedDoctorId);
            });

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
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
