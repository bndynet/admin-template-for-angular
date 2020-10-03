import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public event = new EventEmitter<NotificationOptions>();

  constructor() {}

  success(msg: string): void {
    this.event.emit({
      message: msg,
      type: 'success',
      duration: 5000,
    });
  }

  info(msg: string): void {
    this.event.emit({
      message: msg,
      type: 'info',
      duration: 5000,
    });
  }

  warn(msg: string): void {
    this.event.emit({
      message: msg,
      type: 'warn',
      duration: 5000,
    });
  }

  error(msg: string): void {
    this.event.emit({
      message: msg,
      type: 'error',
    });
  }
}

export interface NotificationOptions {
  message: string;
  type?: 'info' | 'success' | 'warn' | 'error';
  duration?: number;
}
