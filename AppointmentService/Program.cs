using AppointmentService;
using AppointmentService.Data;
using AppointmentService.Services;
using Microsoft.EntityFrameworkCore;
// Agar RabbitMQ ishlatilsa, quyidagilarni qo'shing:
// using AppointmentService.Services; 
// using AppointmentService.Configuration; // Yoki RabbitMQSettings joylashgan namespace

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Configure RabbitMQ settings
builder.Services.Configure<RabbitMQSettings>(builder.Configuration.GetSection("RabbitMQ"));
builder.Services.AddSingleton<IRabbitMQPublisherService, RabbitMQPublisherService>();

// Entity Framework Core DbContext ni ro'yxatdan o'tkazish
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Agar RabbitMQ ishlatilsa:
// builder.Services.Configure<RabbitMQSettings>(builder.Configuration.GetSection("RabbitMQSettings"));
// builder.Services.AddSingleton<IRabbitMQPublisherService, RabbitMQPublisherService>();

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

app.Run();