import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { delay } from 'rxjs/operators';
import { slideInAnimation } from './animations';
import { NotificationService, NotificationOptions, EventsService, StatusService, Status } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('sidebar') sidebarRef: MatSidenav;

  sidebarHasBackdrop = false;
  sidebarMode = 'side';
  sidebarOpened = true;
  contentSidebarOpened = false;
  showProgressbar = false;

  constructor(
    private events: EventsService,
    private router: Router,
    private status: StatusService,
    private snackBar: MatSnackBar,
    private notification: NotificationService,
  ) {}

  ngOnInit(): void {
    this.events
      .contentSidebarToggleEvent
      .pipe(delay(100))
      .subscribe((opened: boolean) => {
        this.contentSidebarOpened = opened;
      });

    this.events
      .sidebarToggleEvent
      .subscribe(() => {
        this.toggleSidebar();
      });

    this.notification.event.subscribe((options: NotificationOptions) => {
      this.snackBar.open(options.message, 'Close', {
        duration: options.duration,
        panelClass: 'notification-' + options.type || 'info',
      });
    });

    this.status.event.subscribe((status: Status) => {
      switch (status) {
        case Status.Requesting:
          this.showProgressbar = true;
          break;

        case Status.Requested:
          this.showProgressbar = false;
          break;
      }
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.contentSidebarOpened = false;
      }
    });
  }

  ngAfterViewInit(): void {}

  getAnimationData(outlet: RouterOutlet): any {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }

  toggleSidebar(): void {
    this.sidebarOpened = !this.sidebarOpened;
    this.sidebarRef.toggle();
  }
}
