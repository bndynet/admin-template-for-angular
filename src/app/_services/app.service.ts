import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Injector } from '@angular/core';
import { stringUtils } from '@bndynet/utils';
import { interval, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { app } from 'src/config';
import { getLocalUrl } from 'src/utils';
import { MenuEntity, MessageEntity } from '../app-types';
import { AuthService } from './auth.service';
import { DialogService } from './dialog.service';
import { HighlightService } from './highlight.service';
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
  public navMenuChanged = new EventEmitter<MenuEntity>();

  constructor(
    private injector: Injector,
    private http: HttpClient,
    private titleService: TitleService,
    public auth: AuthService,
    public theme: ThemeService,
    public dialog: DialogService,
    public status: StatusService,
    public notificaiton: NotificationService
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
