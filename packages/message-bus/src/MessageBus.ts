// Message bus library
class MessageBus {
  private publishedEventRegistry = {};

  publishEvent(eventName, data) {
    const registeredEvent = this.publishedEventRegistry[eventName];

    this.publishedEventRegistry = {
      ...this.publishedEventRegistry,
      [eventName]: {
        ...registeredEvent,
        name: eventName,
        data: data
      }
    };
    this.publishedEventRegistry[eventName]?.handlers?.forEach(handler => {
      handler(this.publishedEventRegistry[eventName].data);
    });
  }

  subscribeEvent(eventName, handler) {
    const registeredEvent = this.publishedEventRegistry[eventName];

    this.publishedEventRegistry = {
      ...this.publishedEventRegistry,
      [eventName]: {
        ...registeredEvent,
        name: eventName,
        handlers: registeredEvent?.handlers?[...registeredEvent.handlers, handler]:[handler]
      }
    };
  }

  unsubscribe(eventName) {
    this.publishedEventRegistry = {
      ...this.publishedEventRegistry,
      [eventName]: undefined
    }
  }
}

export default MessageBus;