
using Microsoft.EntityFrameworkCore;
using PatientRecovery.Shared.Models;

namespace PatientRecovery.AuthService.Data
{
    public class AuthDbContext : DbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(50);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(50);
            });

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
