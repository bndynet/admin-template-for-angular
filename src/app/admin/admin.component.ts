import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { delay } from 'rxjs/operators';
import { slideInAnimation } from '../animations';
import { MenuEntity } from '../app-types';
import {
  AppService,
  EventsService,
  NotificationOptions,
  NotificationService,
  Status,
  StatusService,
} from '../_services';
import { menus } from './menus';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [slideInAnimation],
})
export class AdminComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebar') sidebarRef: MatSidenav;

  sidebarHasBackdrop = false;
  sidebarMode = 'side';
  sidebarOpened = true;
  contentSidebarOpened = false;
  showProgressbar = false;
  menus: MenuEntity[];
  subMenus: MenuEntity[];

  constructor(
    private app: AppService,
    private events: EventsService,
    private router: Router,
    private status: StatusService,
    private snackBar: MatSnackBar,
    private notification: NotificationService
  ) {
    this.menus = menus;
    this.subMenus = menus[0].children;
  }

  ngOnInit(): void {
    this.events.contentSidebarToggleEvent
      .pipe(delay(100))
      .subscribe((opened: boolean) => {
        this.contentSidebarOpened = opened;
      });

    this.events.sidebarToggleEvent.subscribe(() => {
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

  clickNavMenu(menu: MenuEntity): void {
    this.subMenus = menu.children;
    if (menu.children.length > 0 && menu.children[0].link) {
      this.router.navigate([menu.children[0].link]);
    }
  }

  search(keywords: string): void {
    // TODO:
    this.app.notificaiton.info(`TODO: search ${keywords}`);
  }

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
