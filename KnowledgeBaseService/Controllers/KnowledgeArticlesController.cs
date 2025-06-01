using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KnowledgeBaseService.Data;
using KnowledgeBaseService.Dtos;
using KnowledgeBaseService.Models;
// using KnowledgeBaseService.Services; // Agar RabbitMQ ishlatilsa

namespace KnowledgeBaseService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KnowledgeArticlesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        // private readonly IRabbitMQPublisherService _rabbitMQPublisherService; // Agar RabbitMQ ishlatilsa

        public KnowledgeArticlesController(ApplicationDbContext context /*, IRabbitMQPublisherService rabbitMQPublisherService*/)
        {
            _context = context;
            // _rabbitMQPublisherService = rabbitMQPublisherService;
        }

        // GET: api/KnowledgeArticles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<KnowledgeArticleReadDto>>> GetKnowledgeArticles([FromQuery] string? category, [FromQuery] string? tag)
        {
            var query = _context.KnowledgeArticles.AsQueryable();

            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(a => a.Category == category);
            }

            if (!string.IsNullOrEmpty(tag))
            {
                query = query.Where(a => a.Tags.Contains(tag));
            }

            var articles = await query.Where(a => a.IsPublished).OrderByDescending(a => a.UpdatedAt).ToListAsync();
            
            return articles.Select(a => new KnowledgeArticleReadDto
            {
                Id = a.Id,
                Title = a.Title,
                Content = a.Content.Substring(0, Math.Min(a.Content.Length, 200)) + (a.Content.Length > 200 ? "..." : ""), // Qisqacha kontent
                Category = a.Category,
                Tags = a.Tags,
                AuthorId = a.AuthorId,
                CreatedAt = a.CreatedAt,
                UpdatedAt = a.UpdatedAt,
                IsPublished = a.IsPublished
            }).ToList();
        }

        // GET: api/KnowledgeArticles/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<KnowledgeArticleReadDto>> GetKnowledgeArticle(Guid id)
        {
            var article = await _context.KnowledgeArticles.FindAsync(id);

            if (article == null || !article.IsPublished)
            {
                return NotFound();
            }

            return new KnowledgeArticleReadDto
            {
                Id = article.Id,
                Title = article.Title,
                Content = article.Content,
                Category = article.Category,
                Tags = article.Tags,
                AuthorId = article.AuthorId,
                CreatedAt = article.CreatedAt,
                UpdatedAt = article.UpdatedAt,
                IsPublished = article.IsPublished
            };
        }

        // POST: api/KnowledgeArticles
        [HttpPost] // Bu endpoint odatda admin yoki maxsus huquqli foydalanuvchilar uchun bo'ladi
        public async Task<ActionResult<KnowledgeArticleReadDto>> CreateKnowledgeArticle(KnowledgeArticleCreateDto createArticleDto)
        {
            var article = new KnowledgeArticle
            {
                Id = Guid.NewGuid(),
                Title = createArticleDto.Title,
                Content = createArticleDto.Content,
                Category = createArticleDto.Category,
                Tags = createArticleDto.Tags,
                AuthorId = createArticleDto.AuthorId, // Bu autentifikatsiyadan olinishi kerak
                IsPublished = createArticleDto.IsPublished,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.KnowledgeArticles.Add(article);
            await _context.SaveChangesAsync();
            
            // Agar RabbitMQ ishlatilsa, hodisa yuborish mumkin
            // if (article.IsPublished) { _rabbitMQPublisherService.PublishMessage(new ArticlePublishedEvent { ... }, "knowledge.article.published"); }

            return CreatedAtAction(nameof(GetKnowledgeArticle), new { id = article.Id }, new KnowledgeArticleReadDto 
            {
                 Id = article.Id,
                Title = article.Title,
                Content = article.Content,
                Category = article.Category,
                Tags = article.Tags,
                AuthorId = article.AuthorId,
                CreatedAt = article.CreatedAt,
                UpdatedAt = article.UpdatedAt,
                IsPublished = article.IsPublished
            });
        }
        
        // Boshqa CRUD operatsiyalari (PUT, DELETE) ham qo'shilishi mumkin
    }
}