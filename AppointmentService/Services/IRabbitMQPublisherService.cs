namespace AppointmentService.Services
{
    public interface IRabbitMQPublisherService
    {
        void PublishMessage<T>(string routingKey, T message, string exchangeName = "appointment_events");
    }
}