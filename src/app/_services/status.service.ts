import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  public event = new EventEmitter<Status>();

  constructor() { }

  requesting(): void {
    this.event.emit(Status.Requesting);
  }

  requested(): void {
    this.event.emit(Status.Requested);
  }
}

export enum Status {
  Requesting,
  Requested,
}
