namespace RehabilitationService.Services
{
    public interface IRabbitMQPublisherService
    {
        void PublishMessage<T>(T message, string routingKey);
    }
}