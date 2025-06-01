using RabbitMQ.Client;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;

namespace AppointmentService.Services
{
    public class RabbitMQPublisherService : IRabbitMQPublisherService
    {
        private readonly IConnection? _connection; // Made nullable
        private readonly IModel? _channel;      // Made nullable
        private readonly RabbitMQSettings _rabbitMQSettings;

        public RabbitMQPublisherService(IOptions<RabbitMQSettings> rabbitMQSettingsOptions)
        {
            _rabbitMQSettings = rabbitMQSettingsOptions.Value;
            var factory = new ConnectionFactory()
            {
                HostName = _rabbitMQSettings.HostName,
                UserName = _rabbitMQSettings.UserName,
                Password = _rabbitMQSettings.Password,
                Port = _rabbitMQSettings.Port
            };
            try
            {
                _connection = factory.CreateConnection();
                _channel = _connection.CreateModel();
                _channel.ExchangeDeclare(exchange: "appointment_events", type: ExchangeType.Topic, durable: true);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Could not connect to RabbitMQ: {ex.Message}");
                // _connection and _channel will remain null if connection fails
            }
        }

        public void PublishMessage<T>(string routingKey, T message, string exchangeName = "appointment_events")
        {
            if (_channel == null || !_channel.IsOpen) // Check if _channel is null or not open
            {
                Console.WriteLine("RabbitMQ channel is not open or not initialized. Message not published.");
                return;
            }

            var jsonMessage = JsonSerializer.Serialize(message);
            var body = Encoding.UTF8.GetBytes(jsonMessage);

            _channel.BasicPublish(exchange: exchangeName,
                                 routingKey: routingKey, // e.g., "appointment.scheduled", "appointment.updated"
                                 basicProperties: null,
                                 body: body);
            Console.WriteLine($"Sent '{jsonMessage}' with routing key '{routingKey}' to exchange '{exchangeName}'");
        }

        // Implement IDisposable if you need to close the connection/channel gracefully
        // public void Dispose()
        // {
        //     _channel?.Close();
        //     _connection?.Close();
        // }
    }
}