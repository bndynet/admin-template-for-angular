import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  menuLoading = false;

  constructor(
    private app: AppService,
    private events: EventsService,
    private router: Router,
    private status: StatusService,
    private snackBar: MatSnackBar,
    private notification: NotificationService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const currentUrl = location.href;
    this.menuLoading = true;

    this.app.auth.getMenu(menus).subscribe((userMenu: MenuEntity[]) => {
      const flattedMenus = this.app.flatMenus(userMenu);
      const matchedMenu = flattedMenus.find(
        (fm) =>
          fm.link &&
          currentUrl.startsWith(
            this.removeDuplicatedSlashesForUrl(`${this.app.baseUrl}${fm.link}`)
          )
      );

      this.menus = userMenu;
      if (matchedMenu) {
        let rootOfMatchedMenu = matchedMenu;
        while (rootOfMatchedMenu._parent) {
          rootOfMatchedMenu = rootOfMatchedMenu._parent;
        }
        this.subMenus = rootOfMatchedMenu.children;
        this.app.activeMenu(matchedMenu);
      } else {
        this.subMenus = this.menus[0].children;
      }

      this.menuLoading = false;
    });

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

    this.changeDetectorRef.detectChanges();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.contentSidebarOpened = false;
      }
    });
  }

  ngAfterViewInit(): void {}

  clickNavMenu(menu: MenuEntity): void {
    this.subMenus = menu.children;
  }

  search(keywords: string): void {
    // TODO:
    this.app.notification.info(`TODO: search ${keywords}`);
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

  private removeDuplicatedSlashesForUrl(url: string): string {
    return url.replace(/(?<!:)\/{2,}/g, '/');
  }
}
