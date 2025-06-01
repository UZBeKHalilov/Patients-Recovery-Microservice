using Microsoft.EntityFrameworkCore;
using KnowledgeBaseService.Data;
// using KnowledgeBaseService.Services; // Agar RabbitMQ ishlatilsa

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.  Configuration.GetConnectionString("DefaultConnection")));

// Configure RabbitMQ settings (agar kerak bo'lsa)
// builder.Services.Configure<RabbitMQSettings>(builder.Configuration.GetSection("RabbitMQSettings"));
// builder.Services.AddSingleton<IRabbitMQPublisherService, RabbitMQPublisherService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Apply migrations at startup (optional, for development)
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate(); 
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
