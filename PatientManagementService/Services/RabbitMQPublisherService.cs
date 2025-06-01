using RabbitMQ.Client;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;
using PatientManagementService.Events; // RabbitMQSettings uchun

namespace PatientManagementService.Services
{
    public class RabbitMQPublisherService
    {
        private readonly RabbitMQSettings _rabbitMQSettings;
        private IConnection _connection;
        private IModel _channel;

        public RabbitMQPublisherService(IOptions<RabbitMQSettings> rabbitMQSettings)
        {
            _rabbitMQSettings = rabbitMQSettings.Value;
            CreateConnection();
            CreateModel();
        }

        private void CreateConnection()
        {
            var factory = new ConnectionFactory()
            {
                HostName = _rabbitMQSettings.HostName,
                UserName = _rabbitMQSettings.UserName,
                Password = _rabbitMQSettings.Password,
                Port = _rabbitMQSettings.Port
            };
            _connection = factory.CreateConnection();
        }

        private void CreateModel()
        {
            _channel = _connection.CreateModel();
        }

        public void PublishPatientRegisteredEvent(PatientRegisteredEvent patientEvent)
        {
            _channel.ExchangeDeclare(exchange: "patient_events", type: ExchangeType.Fanout);

            var message = JsonSerializer.Serialize(patientEvent);
            var body = Encoding.UTF8.GetBytes(message);

            _channel.BasicPublish(exchange: "patient_events",
                                 routingKey: "",
                                 basicProperties: null,
                                 body: body);
            Console.WriteLine($"--> Patient Registered Event Published: {message}");
        }

        public void Dispose()
        {
            _channel?.Close();
            _connection?.Close();
        }
    }
}