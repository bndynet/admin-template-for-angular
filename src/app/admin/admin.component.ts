import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { delay } from 'rxjs/operators';
import { slideInAnimation } from '../animations';
import { Menu } from '../app-types';
import {
  AppService,
  AuthService,
  EventsService,
  MenuService,
  NotificationOptions,
  NotificationService,
  Status,
  StatusService,
} from '../_services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [slideInAnimation],
})
export class AdminComponent implements OnInit {
  @ViewChild('sidebar') sidebarRef: MatSidenav;

  sidebarHasBackdrop = false;
  sidebarMode = 'side';
  sidebarOpened = true;
  contentSidebarOpened = false;
  showProgressbar = false;
  menus: Menu[];
  activeRootMenu?: Menu;
  subMenus: Menu[];
  menuLoading = false;

  constructor(
    private app: AppService,
    private auth: AuthService,
    private events: EventsService,
    private router: Router,
    private status: StatusService,
    private snackBar: MatSnackBar,
    private notification: NotificationService,
    private menuService: MenuService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.menuLoading = true;

    this.app.auth.getRootMenus().subscribe((userMenus: Menu[]) => {
      this.menus = userMenus;

      let rootMenu = this.menus[0];

      const activeMenu = this.menuService.getCurrentMenuByUrl(this.app.baseUrl);
      if (activeMenu) {
        const parentMenus = this.menuService.getParentMenus(activeMenu);
        if (parentMenus.length > 0) {
          rootMenu = parentMenus[0];
        }
        this.app.activeMenu(activeMenu);
      }
      this.app.auth.getSubMenus(rootMenu).subscribe((submenus) => {
        this.subMenus = submenus;
      });

      this.activeRootMenu = rootMenu;
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

  clickNavMenu(menu: Menu): void {
    if (this.activeRootMenu !== menu) {
      this.menuLoading = true;
      this.activeRootMenu = menu;
      this.subMenus = [];
      this.auth.getSubMenus(menu).subscribe((menus) => {
        this.subMenus = menus;
        this.menuLoading = false;
      });
    }
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
