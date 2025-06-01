
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace PatientRecovery.Shared.Messaging
{
    public class RabbitMQService : IRabbitMQService, IDisposable
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly ILogger<RabbitMQService> _logger;

        public RabbitMQService(IConfiguration configuration, ILogger<RabbitMQService> logger)
        {
            _logger = logger;
            
            var factory = new ConnectionFactory()
            {
                HostName = configuration["RabbitMQ:HostName"] ?? "localhost",
                Port = int.Parse(configuration["RabbitMQ:Port"] ?? "5672"),
                UserName = configuration["RabbitMQ:UserName"] ?? "guest",
                Password = configuration["RabbitMQ:Password"] ?? "guest"
            };

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
        }

        public void PublishMessage<T>(string queueName, T message)
        {
            try
            {
                CreateQueue(queueName);
                
                var messageBody = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message));
                
                _channel.BasicPublish(
                    exchange: "",
                    routingKey: queueName,
                    basicProperties: null,
                    body: messageBody);
                
                _logger.LogInformation($"Message published to queue {queueName}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error publishing message to queue {queueName}");
                throw;
            }
        }

        public void SubscribeToQueue<T>(string queueName, Action<T> onMessage)
        {
            try
            {
                CreateQueue(queueName);
                
                var consumer = new EventingBasicConsumer(_channel);
                consumer.Received += (model, ea) =>
                {
                    try
                    {
                        var body = ea.Body.ToArray();
                        var messageJson = Encoding.UTF8.GetString(body);
                        var message = JsonSerializer.Deserialize<T>(messageJson);
                        
                        if (message != null)
                        {
                            onMessage(message);
                        }
                        
                        _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, $"Error processing message from queue {queueName}");
                        _channel.BasicNack(deliveryTag: ea.DeliveryTag, multiple: false, requeue: false);
                    }
                };
                
                _channel.BasicConsume(queue: queueName, autoAck: false, consumer: consumer);
                _logger.LogInformation($"Subscribed to queue {queueName}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error subscribing to queue {queueName}");
                throw;
            }
        }

        public void CreateQueue(string queueName)
        {
            _channel.QueueDeclare(
                queue: queueName,
                durable: true,
                exclusive: false,
                autoDelete: false,
                arguments: null);
        }

        public void CreateExchange(string exchangeName, string exchangeType = "direct")
        {
            _channel.ExchangeDeclare(
                exchange: exchangeName,
                type: exchangeType,
                durable: true,
                autoDelete: false,
                arguments: null);
        }

        public void BindQueueToExchange(string queueName, string exchangeName, string routingKey)
        {
            _channel.QueueBind(
                queue: queueName,
                exchange: exchangeName,
                routingKey: routingKey);
        }

        public void Dispose()
        {
            _channel?.Close();
            _channel?.Dispose();
            _connection?.Close();
            _connection?.Dispose();
        }
    }
}
