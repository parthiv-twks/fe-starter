// Message bus library

interface MessageEvent<T>{
  name?:string;
  data?:T;
  handlers?: Function[];
}
interface EventRegistry<T>{
  [key: string]: MessageEvent<T>
}
class MessageBus<T> {
  private publishedEventRegistry:EventRegistry<T>= {};

  publishEvent<T>(eventName:string, data: T) {
    const registeredEvent = this.publishedEventRegistry[eventName];

    this.publishedEventRegistry ={
      ...this.publishedEventRegistry,
      [eventName]: {
        ...registeredEvent,
        name: eventName,
        data: data
      }
    };
    this.publishedEventRegistry[eventName]?.handlers?.forEach((handler:Function) => {
      handler(this.publishedEventRegistry[eventName].data);
    });
  }

  subscribeEvent(eventName:string, handler:Function) {
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

  unsubscribe(eventName:string) {
    this.publishedEventRegistry = {
      ...this.publishedEventRegistry,
      [eventName]: undefined
    }
  }
}

export default MessageBus;