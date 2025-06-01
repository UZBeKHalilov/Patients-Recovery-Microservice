using Microsoft.EntityFrameworkCore;
using PatientManagementService.Data;
using PatientManagementService.Services; // RabbitMQPublisherService uchun
using PatientManagementService.Events; // RabbitMQSettings uchun (agar alohida klassda bo'lsa)

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Entity Framework Core DbContext ni ro'yxatdan o'tkazish
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// RabbitMQ sozlamalarini IOptions orqali bog'lash
// Agar RabbitMQSettings klassini alohida yaratgan bo'lsangiz (masalan, Events papkasida)
// builder.Services.Configure<RabbitMQSettings>(builder.Configuration.GetSection("RabbitMQ"));
// Aks holda, RabbitMQPublisherService ichida to'g'ridan-to'g'ri Configuration dan o'qilishi mumkin
// Yoki soddaroq yondashuv sifatida, RabbitMQPublisherService konstruktorida IConfiguration qabul qilish mumkin.
// Keling, RabbitMQSettings klassini yaratamiz.

builder.Services.Configure<RabbitMQSettings>(builder.Configuration.GetSection("RabbitMQSettings"));
builder.Services.AddSingleton<RabbitMQPublisherService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Ma'lumotlar bazasi migratsiyalarini avtomatik qo'llash (ixtiyoriy)
// using (var scope = app.Services.CreateScope())
// {
//     var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
//     dbContext.Database.Migrate();
// }

app.Run();

// RabbitMQ sozlamalari uchun klass (Program.cs oxirida yoki Events papkasida yaratilishi mumkin)
// Agar Events papkasida yaratilsa, using PatientManagementService.Events; qo'shiladi.
public class RabbitMQSettings
{
    public string? HostName { get; set; }
    public string? UserName { get; set; }
    public string? Password { get; set; }
    public int Port { get; set; } = 5672;
}