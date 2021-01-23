import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { stringUtils } from '@bndynet/utils';
import { interval, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { themes } from 'src/config';
import { getLocalUrl } from 'src/utils';
import { MenuEntity, MessageEntity, ThemeEntity } from '../app-types';
import { AuthService } from './auth.service';
import { DialogService } from './dialog.service';
import { NotificationService } from './notification.service';
import { StatusService } from './status.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private rootTitle: string;
  private keyTheme = 'app_theme';
  public readonly clientTrackingID: string;
  public navMenuChanged = new EventEmitter<MenuEntity>();

  constructor(
    private router: Router,
    private http: HttpClient,
    private titleService: Title,
    public auth: AuthService,
    public dialog: DialogService,
    public status: StatusService,
    public notificaiton: NotificationService
  ) {
    this.clientTrackingID = stringUtils.getRandomId();
    this.rootTitle = this.titleService.getTitle();

    const theme = localStorage.getItem(this.keyTheme);
    if (theme) {
      this.setTheme(theme);
    }
  }

  setTheme(themeKey: string): Observable<ThemeEntity> {
    const darkClassName = 'is-dark';

    document.body.classList.remove(darkClassName);
    themes.forEach((theme: ThemeEntity) => {
      document.body.classList.remove(theme.key);
    });

    const theme = themes.find((t) => t.key === themeKey);
    if (theme) {
      document.body.classList.add(theme.key);
      localStorage.setItem(this.keyTheme, theme.key);
      if (theme.isDark) {
        document.body.classList.add(darkClassName);
      }
    }
    return of(theme);
  }

  getThemeColor(themeKey: string, colorKey: string): string {
    return getComputedStyle(document.querySelector(':root')).getPropertyValue(
      `--${themeKey}--${colorKey}`
    );
  }

  getActiveThemeColor(colorKey: string): string {
    return document.body.classList.value
      .split(' ')
      .map((className) => {
        return this.getThemeColor(className, colorKey);
      })
      .find((color) => !!color);
  }

  setTitle(title: string, overwriteOrigin?: boolean): void {
    if (overwriteOrigin) {
      this.rootTitle = title;
    } else {
      title = this.rootTitle ? `${title} - ${this.rootTitle}` : title;
    }
    this.titleService.setTitle(title);
  }

  resetTitle(): void {
    this.titleService.setTitle(this.rootTitle);
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
      'You are logging out all applications. <br /> This will take some seconds. Please wait...'
    );
    setTimeout(() => {
      dialog.close();
      this.router.navigate(['/logout']);
      this.auth.logout();
    }, 3000);
  }
}
