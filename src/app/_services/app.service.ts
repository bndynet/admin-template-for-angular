import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { stringUtils } from '@bndynet/utils';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { app } from 'src/config';
import { getLocalUrl } from 'src/utils';
import { Menu, MessageEntity } from '../app-types';
import { AuthService } from './auth.service';
import { DialogService } from './dialog.service';
import { HighlightService } from './highlight.service';
import { MenuService } from './menu.service';
import { NotificationService } from './notification.service';
import { StatusService } from './status.service';
import { KEY_THEME, ThemeService } from './theme.service';
import { TitleService } from './title.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public readonly clientTrackingID: string;
  public readonly baseUrl: string;
  public menusActive$ = new BehaviorSubject<Menu[]>([]);

  constructor(
    private router: Router,
    private http: HttpClient,
    private injector: Injector,
    private menuService: MenuService,
    private titleService: TitleService,
    public auth: AuthService,
    public theme: ThemeService,
    public dialog: DialogService,
    public status: StatusService,
    public notification: NotificationService
  ) {
    this.clientTrackingID = stringUtils.getRandomId();
    this.titleService.setTitle(app.title);

    const themeName = localStorage.getItem(KEY_THEME);
    if (theme) {
      this.theme.changeTheme(themeName);
    }

    // init the base url from html tags
    const baseElements = document.getElementsByTagName('base');
    if (baseElements && baseElements.length > 0) {
      this.baseUrl = baseElements[0].href;
    }
  }

  init(): void {
    this.auth.init();
  }

  getHighlightService(): HighlightService {
    return this.injector.get<HighlightService>(HighlightService);
  }

  setTitle(title: string, overwrite?: boolean): void {
    this.titleService.setTitle(title, overwrite);
  }

  resetTitle(): void {
    this.titleService.setTitle(app.title);
  }

  activeMenu(menu: Menu): void {
    const getDefaultMenuWithLink$ = (menu: Menu): Observable<Menu | null> => {
      if (menu.link) {
        return of(menu);
      }
      return this.auth.getSubMenus(menu).pipe(
        switchMap((submenus) => {
          if (submenus.length > 0) {
            return getDefaultMenuWithLink$(submenus[0]);
          }
          return of(menu);
        })
      );
    };

    getDefaultMenuWithLink$(menu).subscribe((menu) => {
      if (menu) {
        const menus = [...this.menuService.getParentMenus(menu), menu];
        this.menusActive$.next(menus);
        if (menu.link) {
          this.router.navigate([menu.link]);
        }
      }
    });
  }

  getMessages(): Observable<MessageEntity[]> {
    return interval(10000).pipe(
      mergeMap(() =>
        this.http.get<MessageEntity[]>(getLocalUrl(`assets/messages.json`))
      )
    );
  }

  logout(): void {
    const dialog = this.dialog.remain(
      3,
      'Log out',
      'You are logging out this applications. <br /> This will take some seconds. Please wait...'
    );
    setTimeout(() => {
      this.auth.logout();
      setTimeout(() => {
        dialog.close();
      }, 500);
    }, 3000);
  }
}
