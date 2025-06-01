namespace DoctorManagementService.Services
{
    public interface IRabbitMQPublisherService
    {
        void PublishEvent<T>(T @event, string routingKey);
    }
}
