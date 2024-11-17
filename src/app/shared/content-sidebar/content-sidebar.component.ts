import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { EventsService } from 'src/app/_services';

@Component({
  selector: 'el-content-sidebar',
  templateUrl: './content-sidebar.component.html',
  styleUrls: ['./content-sidebar.component.scss'],
})
export class ContentSidebarComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() open: boolean;
  @Input() elementsToOpen: string;
  @Input() progressShown: boolean;
  @Output() closed = new EventEmitter();
  @ViewChild('root') rootElement: MatDrawer;

  constructor(
    private events: EventsService,
    private element: ElementRef,
  ) {}

  ngOnInit(): void {}

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

  @HostListener('document: click', ['$event'])
  closeClickOutside(event: Event): void {
    const clickInside = this.element.nativeElement.contains(event.target);
    let isOpenedByElement = false;
    if (this.elementsToOpen) {
      const fromElements =
        this.element.nativeElement.parentElement.querySelectorAll(
          this.elementsToOpen,
        );
      for (let index = 0; index < fromElements.length; index++) {
        if (fromElements[index].contains(event.target)) {
          isOpenedByElement = true;
          break;
        }
      }
    }
    if (!clickInside && !isOpenedByElement) {
      this.close();
    }
  }
}
