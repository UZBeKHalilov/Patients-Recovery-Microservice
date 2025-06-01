
namespace PatientRecovery.Shared.Messaging
{
    public interface IRabbitMQService
    {
        void PublishMessage<T>(string queueName, T message);
        void SubscribeToQueue<T>(string queueName, Action<T> onMessage);
        void CreateQueue(string queueName);
        void CreateExchange(string exchangeName, string exchangeType = "direct");
        void BindQueueToExchange(string queueName, string exchangeName, string routingKey);
    }
}
