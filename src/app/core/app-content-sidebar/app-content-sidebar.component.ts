import { Component, EventEmitter, Input, ViewChild, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { EventsService } from 'src/app/_services';

@Component({
  selector: 'app-content-sidebar',
  templateUrl: './app-content-sidebar.component.html',
  styleUrls: ['./app-content-sidebar.component.scss']
})
export class AppContentSidebarComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() open: boolean;
  @Input() progressShown: boolean;
  @Output() closed = new EventEmitter();
  @ViewChild('root') rootElement: MatDrawer;

  constructor(
    private events: EventsService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.open) {
      if (changes.open.currentValue) {
        this.events.openContentSidebar();
      } else {
        this.events.closeContentSidebar();
      }
    }
  }

  close(): void {
    this.events.closeContentSidebar();
    this.rootElement.close();
    this.closed.emit();
  }

  showProgress(): void {
    this.progressShown = true;
  }

  closeProgress(): void {
    this.progressShown = false;
  }
}
