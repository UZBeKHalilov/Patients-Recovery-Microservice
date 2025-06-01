using Microsoft.EntityFrameworkCore;
using PatientManagementService.Models; // Patient modelini ishlatish uchun

namespace PatientManagementService.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Bu yerda Patient entity uchun qo'shimcha konfiguratsiyalar kiritilishi mumkin
            // Masalan, indekslar, cheklovlar va hokazo.
            modelBuilder.Entity<Patient>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.DateOfBirth).IsRequired();
                // Boshqa xususiyatlar uchun ham shunga o'xshash sozlamalar qo'shishingiz mumkin
            });
        }
    }
}