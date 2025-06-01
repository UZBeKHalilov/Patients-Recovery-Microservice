namespace MonitoringService.Services
{
    public interface IRabbitMQPublisherService
    {
        void PublishMessage<T>(T message, string queueName);
    }
}