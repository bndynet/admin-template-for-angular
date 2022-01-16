import moment from 'moment';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

export enum LogType {
  Info = 'INFO',
  Warning = 'WARN',
  Error = 'ERROR',
}

interface LogEntry {
  type: LogType;
  message: string;
  data: any;
}

export interface LogFields {
  environment: string;
  isProduction: boolean;
  appName: string;
  appVersion: string;
  userId: string;
  currentUrl: string;
}

export interface RequestLogFields extends LogFields {
  elapsedTime?: number;
  requestUrl?: string;
  requestMethod?: string;
  responseCode?: number;
}

enum LoggerEvents {
  Flush = 1,
}

export class Logger {
  private buffer: LogEntry[] = [];
  private flush = new Subject<LoggerEvents>();

  constructor(private logEndpoint: string) {
    this.flush
      .pipe(
        debounceTime(5000),
        filter((event) => event === LoggerEvents.Flush)
      )
      .subscribe(() => this.flushBuffer());
  }

  public log(type: LogType, message: string, data: LogFields) {
    this.buffer.push({
      type,
      message,
      data: { currentUrl: location.href, ...data },
    });
    this.flush.next(LoggerEvents.Flush);
  }

  private flushBuffer() {
    const data = this.buffer.splice(0);
    if (data.length === 0) {
      return;
    }

    const body = data
      .map((entry) => this.buildLogString(entry))
      .reduce((sum, entry) => (sum += entry), '');

    // TODO: you can use environment.production to enable logging only in production
    if (this.logEndpoint) {
      const xobj = new XMLHttpRequest();
      xobj.onerror = (err) => console.error(err);
      xobj.open('POST', this.logEndpoint, true);
      xobj.setRequestHeader('content-type', 'application/json');
      xobj.send(body);
    }
  }

  private buildLogString(entry: LogEntry): string {
    const index = this.buildIndexChunk();
    const body = this.buildBodyChunk(entry);

    return body; // `${index}\n${body}\n`;
  }

  private buildIndexChunk() {
    const now = new Date();
    const index = {
      _index: `logstash-${now.getUTCFullYear()}.${
        now.getUTCMonth() + 1
      }.${now.getUTCDate()}`,
      _type: 'logevent',
    };

    return JSON.stringify(index);
  }

  private buildBodyChunk(entry: LogEntry) {
    const { type, message, data } = entry;
    const level = type;
    const date = moment();
    const body = {
      '@timestamp': `${date.toISOString()}`,
      level,
      message,
      fields: data,
    };

    return JSON.stringify(body);
  }
}
