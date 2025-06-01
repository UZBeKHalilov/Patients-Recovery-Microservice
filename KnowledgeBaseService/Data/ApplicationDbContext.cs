using Microsoft.EntityFrameworkCore;
using KnowledgeBaseService.Models;

namespace KnowledgeBaseService.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<KnowledgeArticle> KnowledgeArticles { get; set; }
        public DbSet<DecisionRule> DecisionRules { get; set; }
        public DbSet<TreatmentProtocol> TreatmentProtocols { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Agar kerak bo'lsa, model konfiguratsiyalari shu yerga qo'shiladi
            modelBuilder.Entity<KnowledgeArticle>()
                .Property(e => e.Tags)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());
        }
    }
}