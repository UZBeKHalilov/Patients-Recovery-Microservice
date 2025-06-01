using Microsoft.EntityFrameworkCore;
using MonitoringService.Models;

namespace MonitoringService.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<PatientObservation> PatientObservations { get; set; }
        public DbSet<Alert> Alerts { get; set; } // Yangi DbSet

        // Agar kerak bo'lsa, OnModelCreating metodini qo'shishingiz mumkin
        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     base.OnModelCreating(modelBuilder);
        //     // Model konfiguratsiyalari
        // }
    }
}