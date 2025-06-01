using Microsoft.EntityFrameworkCore;
using RehabilitationService.Models;

namespace RehabilitationService.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<RehabilitationPlan> RehabilitationPlans { get; set; }
        public DbSet<RehabilitationProgress> RehabilitationProgresses { get; set; }
        public DbSet<Exercise> Exercises { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<RehabilitationPlan>()
                .HasMany(rp => rp.ProgressRecords)
                .WithOne(p => p.RehabilitationPlan)
                .HasForeignKey(p => p.RehabilitationPlanId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RehabilitationPlan>()
                .HasMany(rp => rp.Exercises)
                .WithOne(e => e.RehabilitationPlan)
                .HasForeignKey(e => e.RehabilitationPlanId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}