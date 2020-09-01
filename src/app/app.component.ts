import { animation } from '@angular/animations';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { pipe } from 'rxjs';
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

  title = 'Angular Starter';
  showFiller = false;
  sidebarHasBackdrop = false;
  sidebarMode = 'side';
  sidebarOpened = true;

  openedContentSidebar = false;

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
      .getContentSidebarToggleEvent()
      .pipe(delay(100))
      .subscribe((opened: boolean) => {
        this.openedContentSidebar = opened;
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
        this.openedContentSidebar = false;
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
