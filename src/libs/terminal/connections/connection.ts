export enum ConnectionEvent {
  Open,
  Close,
  Error,
  Message,
}

export abstract class Connection {
  private events: { [key: string]: Function[] } = {};
  public abstract connected: boolean;

  constructor() {}

  public on(event, listener) {
    if (typeof this.events[event] !== 'object') {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  public emit(name, args) {
    if (!this.events.hasOwnProperty(name)) {
      // throw `No event ${name} found.`;
      return;
    }

    const eventFunctions = this.events[name];
    for (let i = 0; i < eventFunctions.length; i++) {
      eventFunctions[i].call(this, args);
    }
  }

  public abstract sendCommand(command: any): Promise<any>;

  public abstract dispose(): void;
}
