import { Connection, ConnectionEvent } from './connection';

export class HttpConnection extends Connection {
  public connected: boolean = true;

  constructor(private promiseFn: (cmd: string) => Promise<string>) {
    super();
  }

  public sendCommand(command: any): Promise<any> {
    return this.promiseFn(command).then(
      (response) => {
        this.emit(ConnectionEvent.Message, response);
        return response;
      },
      (err) => {
        this.emit(ConnectionEvent.Error, err);
      }
    );
  }

  public dispose(): void {
    // Nothing to dispose
  }
}
