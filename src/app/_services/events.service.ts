import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private contentSidebarOpenedSource = new Subject<boolean>();
  private contentSidebarOpened$ = this.contentSidebarOpenedSource.asObservable();
  private contentSidebarToggle = new EventEmitter<boolean>();



  constructor() { }

  openContentSidebar(): void {
    this.contentSidebarToggle.emit(true);
  }

  closeContentSidebar(): void {
    this.contentSidebarToggle.emit(false);
  }

  getContentSidebarToggleEvent(): EventEmitter<boolean> {
    return this.contentSidebarToggle;
  }
}
