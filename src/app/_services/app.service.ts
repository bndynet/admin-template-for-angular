import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { getLocalUrl, getUUID } from 'src/utils';
import { MessageEntity } from '../app-types';
import { AuthService } from './auth.service';
import { DialogService } from './dialog.service';
import { NotificationService } from './notification.service';
import { StatusService } from './status.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public readonly clientTrackingID: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    public auth: AuthService,
    public dialog: DialogService,
    public status: StatusService,
    public notificaiton: NotificationService
  ) {
    this.clientTrackingID = getUUID();
  }

  getMessages(): Observable<MessageEntity[]> {
    return interval(10000).pipe(
      mergeMap(() =>
        this.http.get<MessageEntity[]>(getLocalUrl(`assets/messages.json`))
      )
    );
  }

  login(username: string, password: string): Observable<any> {
    return this.auth.login(username, password);
  }

  logout(): void {
    const dialog = this.dialog.stop(
      'Log out',
      'You are logging out all applications. <br /> This will take 5 seconds. Please wait...'
    );
    this.auth.logout().subscribe(() => {
      dialog.close();
      this.router.navigate(['/logout']);
    });
  }
}
