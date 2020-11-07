import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { stringUtils } from '@bndynet/utils';
import { interval, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { getLocalUrl } from 'src/utils';
import { MenuEntity, MessageEntity } from '../app-types';
import { AuthService } from './auth.service';
import { DialogService } from './dialog.service';
import { NotificationService } from './notification.service';
import { StatusService } from './status.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public readonly clientTrackingID: string;

  public navMenuChanged = new EventEmitter<MenuEntity>();

  constructor(
    private router: Router,
    private http: HttpClient,
    public auth: AuthService,
    public dialog: DialogService,
    public status: StatusService,
    public notificaiton: NotificationService
  ) {
    this.clientTrackingID = stringUtils.getRandomId();
  }

  getMessages(): Observable<MessageEntity[]> {
    return interval(10000).pipe(
      mergeMap(() =>
        this.http.get<MessageEntity[]>(getLocalUrl(`assets/messages.json`))
      )
    );
  }

  logout(): void {
    const dialog = this.dialog.stop(
      'Log out',
      'You are logging out all applications. <br /> This will take 3 seconds. Please wait...'
    );
    setTimeout(() => {
      this.auth.logout();
      dialog.close();
      this.router.navigate(['/logout']);
    }, 3000);
  }
}
