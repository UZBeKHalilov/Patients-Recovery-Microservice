using RabbitMQ.Client;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;

namespace RehabilitationService.Services
{
    public class RabbitMQPublisherService : IRabbitMQPublisherService, IDisposable
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly RabbitMQSettings _rabbitMQSettings;

        public RabbitMQPublisherService(IOptions<RabbitMQSettings> rabbitMQSettingsOptions)
        {
            _rabbitMQSettings = rabbitMQSettingsOptions.Value;
            var factory = new ConnectionFactory()
            {
                HostName = _rabbitMQSettings.HostName,
                UserName = _rabbitMQSettings.UserName,
                Password = _rabbitMQSettings.Password
            };
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.ExchangeDeclare(exchange: _rabbitMQSettings.ExchangeName, type: ExchangeType.Topic, durable: true);
        }

        public void PublishMessage<T>(T message, string routingKey)
        {
            var jsonMessage = JsonSerializer.Serialize(message);
            var body = Encoding.UTF8.GetBytes(jsonMessage);

            _channel.BasicPublish(exchange: _rabbitMQSettings.ExchangeName,
                                 routingKey: routingKey,
                                 basicProperties: null,
                                 body: body);
            Console.WriteLine($"--> Published Message to {_rabbitMQSettings.ExchangeName} with routing key {routingKey}: {jsonMessage}");
        }

        public void Dispose()
        {
            _channel?.Close();
            _connection?.Close();
            GC.SuppressFinalize(this);
        }
    }
}