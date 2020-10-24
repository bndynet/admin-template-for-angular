import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private contentSidebarOpenedSource = new Subject<boolean>();
  private contentSidebarOpened$ = this.contentSidebarOpenedSource.asObservable();
  contentSidebarToggleEvent = new EventEmitter<boolean>();
  sidebarToggleEvent = new EventEmitter();

  constructor() {}

  openContentSidebar(): void {
    this.contentSidebarToggleEvent.emit(true);
  }

  closeContentSidebar(): void {
    this.contentSidebarToggleEvent.emit(false);
  }

  toggleSidebar(): void {
    this.sidebarToggleEvent.emit();
  }
}
