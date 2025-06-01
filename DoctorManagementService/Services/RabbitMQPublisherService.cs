using RabbitMQ.Client;
using System.Text;
using System.Text.Json;

namespace DoctorManagementService.Services
{
    public class RabbitMQPublisherService : IRabbitMQPublisherService
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;

        public RabbitMQPublisherService()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();

            _channel.ExchangeDeclare(exchange: "doctor_exchange", type: ExchangeType.Topic);
        }

        public void PublishEvent<T>(T @event, string routingKey)
        {
            var message = JsonSerializer.Serialize(@event);
            var body = Encoding.UTF8.GetBytes(message);

            _channel.BasicPublish(exchange: "doctor_exchange",
                                  routingKey: routingKey,
                                  basicProperties: null,
                                  body: body);
        }
    }
}
