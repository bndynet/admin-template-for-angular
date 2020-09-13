import { Component, EventEmitter, HostListener, Input, ViewChild, OnChanges, OnInit, Output, SimpleChanges, ElementRef } from '@angular/core';
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
  @Input() elementsToOpen: string;
  @Input() progressShown: boolean;
  @Output() closed = new EventEmitter();
  @ViewChild('root') rootElement: MatDrawer;

  constructor(
    private events: EventsService,
    private element: ElementRef,
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

  @HostListener('document: click', ['$event'])
  closeClickOutside(event: Event): void {
    if (this.elementsToOpen && !this.element.nativeElement.contains(event.target)) {
      let fromElementOpen = false;
      const elements = document.querySelectorAll(this.elementsToOpen);
      for (let index = 0; index < elements.length; index++) {
        if (!fromElementOpen) {
          fromElementOpen = this.inElement(event.target as Node, elements.item(index));
        }
      }
      if (!fromElementOpen) {
        this.close();
      }
    }
  }

  private inElement(source: Node, target: Node): boolean {
    if (source === target) {
      return true;
    }

    for (let index = 0; index < target.childNodes.length; index++) {
      if (source === target.childNodes.item(index)) {
        console.debug(target.childNodes.item(index));
        return true;
      } else {
        return this.inElement(source, target.childNodes.item(index));
      }
    }
  }
}
