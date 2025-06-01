using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;
using NotificationService.Events; // Add this
using Microsoft.Extensions.Options; // If RabbitMQSettings is used
using Microsoft.Extensions.Hosting; // For IHostedService
using Microsoft.Extensions.Logging; // For ILogger

namespace NotificationService.Services
{
    public class RabbitMQConsumerService : BackgroundService // Implement IHostedService or BackgroundService
    {
        private readonly ILogger<RabbitMQConsumerService> _logger;
        private readonly RabbitMQSettings _rabbitMQSettings;
        private IConnection _connection;
        private IModel _channel;
        private const string AlertCreatedQueueName = "alert_created_queue"; // Define queue name

        // Assuming you have RabbitMQSettings configured similarly to other services
        public RabbitMQConsumerService(IOptions<RabbitMQSettings> rabbitMQSettings, ILogger<RabbitMQConsumerService> logger)
        {
            _logger = logger;
            _rabbitMQSettings = rabbitMQSettings.Value;
            InitRabbitMQ();
        }

        private void InitRabbitMQ()
        {
            var factory = new ConnectionFactory()
            {
                HostName = _rabbitMQSettings.HostName, // Tuzatish: Hostname -> HostName
                UserName = _rabbitMQSettings.UserName, // Tuzatish: Username -> UserName
                Password = _rabbitMQSettings.Password
            };
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();

            // Declare all queues this service will listen to
            _channel.QueueDeclare(queue: AlertCreatedQueueName, durable: false, exclusive: false, autoDelete: false, arguments: null);
            // Add other queue declarations here if needed (e.g., for appointment, doctor, patient events)
             _channel.QueueDeclare(queue: "appointment_scheduled_queue", durable: false, exclusive: false, autoDelete: false, arguments: null);
             _channel.QueueDeclare(queue: "appointment_updated_queue", durable: false, exclusive: false, autoDelete: false, arguments: null);
             _channel.QueueDeclare(queue: "appointment_cancelled_queue", durable: false, exclusive: false, autoDelete: false, arguments: null);
             _channel.QueueDeclare(queue: "doctor_registered_queue", durable: false, exclusive: false, autoDelete: false, arguments: null);
             _channel.QueueDeclare(queue: "patient_registered_queue", durable: false, exclusive: false, autoDelete: false, arguments: null);
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            var alertConsumer = new EventingBasicConsumer(_channel);
            alertConsumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                var alertEvent = JsonSerializer.Deserialize<AlertCreatedEvent>(message);
                _logger.LogInformation($"Received AlertCreatedEvent: PatientId {{alertEvent.PatientId}}, Message '{{alertEvent.Message}}'");
                // TODO: Implement actual notification logic (e.g., send email, SMS)
                _channel.BasicAck(ea.DeliveryTag, false); // Acknowledge message
            };
            _channel.BasicConsume(queue: AlertCreatedQueueName, autoAck: false, consumer: alertConsumer);
            
            // IMPORTANT: You'll need to replicate the consumer setup for other event types
            // (AppointmentScheduledEvent, DoctorRegisteredEvent, etc.) if they are not already handled.
            // For brevity, I'm only showing the new AlertCreatedEvent consumer.
            // Ensure your existing consumers for other queues are still active.

            // Example for AppointmentScheduledEvent (ensure this logic is present and correct for other events)
            var appointmentScheduledConsumer = new EventingBasicConsumer(_channel);
            appointmentScheduledConsumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                var appointmentEvent = JsonSerializer.Deserialize<AppointmentScheduledEvent>(message);
                 _logger.LogInformation($"Received AppointmentScheduledEvent for Appointment ID: {{appointmentEvent.AppointmentId}}");
                // Handle event
                _channel.BasicAck(ea.DeliveryTag, false);
            };
            _channel.BasicConsume(queue: "appointment_scheduled_queue", autoAck: false, consumer: appointmentScheduledConsumer);

            // ... Repeat for AppointmentUpdatedEvent, AppointmentCancelledEvent, DoctorRegisteredEvent, PatientRegisteredEvent ...

            return Task.CompletedTask;
        }

        public override void Dispose()
        {
            _channel?.Close();
            _connection?.Close();
            base.Dispose();
        }
    }
}