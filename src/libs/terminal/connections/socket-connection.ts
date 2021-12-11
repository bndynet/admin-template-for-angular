import { Connection, ConnectionEvent } from './connection';

export class SocketConnection extends Connection {
  private socket: WebSocket;

  public connected = false;

  constructor(private url) {
    super();
    this.connectServer();
  }

  public sendCommand(command): Promise<any> {
    if (!this.connected) {
      this.connectServer();
    }

    return new Promise((resolve) =>
      setTimeout(() => {
        if (this.connected) {
          this.socket.send(command);
          resolve('');
        }
      }, 100)
    );
  }

  public dispose(): void {
    this.socket.close();
  }

  private connectServer(): void {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.connected = true;
      console.log('opened');
      this.emit(ConnectionEvent.Open, this.connected);
    };

    this.socket.onclose = () => {
      console.log('onclose');
      console.log(arguments);

      this.connected = false;
      this.emit(ConnectionEvent.Close, !this.connected);
    };

    this.socket.onerror = (error: ErrorEvent) => {
      console.log('onerror');
      console.log(error);
      let err: ErrorEvent | string = error;
      if (!this.connected) {
        err = 'Not connected.';
      }
      this.emit(ConnectionEvent.Error, err);
    };

    this.socket.onmessage = (responseMessage: MessageEvent) => {
      console.log('onmessage');
      console.log(responseMessage);
      this.emit(ConnectionEvent.Message, responseMessage);
    };
  }
}
