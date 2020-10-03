import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppService } from './app.service';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public event = new EventEmitter<NotificationOptions>();

  constructor(
    private app: AppService,
    private events: EventsService,
    private dialog: MatDialog
  ) {}

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
