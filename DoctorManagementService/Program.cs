using DoctorManagementService.Data;
using Microsoft.EntityFrameworkCore;
using DoctorManagementService.Services; // Buni qo'shing
using DoctorManagementService; // RabbitMQSettings uchun

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Entity Framework Core DbContext ni ro'yxatdan o'tkazish
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// RabbitMQ Sozlamalarini o'qish
builder.Services.Configure<RabbitMQSettings>(builder.Configuration.GetSection("RabbitMQSettings"));

// RabbitMQ Publisher Xizmatini ro'yxatdan o'tkazish
builder.Services.AddSingleton<IRabbitMQPublisherService, RabbitMQPublisherService>();

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

app.Run();