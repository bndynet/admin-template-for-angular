import { ComponentType } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { getUUID } from 'src/utils';
import { MessageEntity } from '../app-types';
import { DialogService } from './dialog.service';
import { NotificationService } from './notification.service';
import { StatusService } from './status.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  public readonly clientTrackingID: string;

  constructor(
    private http: HttpClient,
    public dialog: DialogService,
    public status: StatusService,
    public notificaiton: NotificationService,
    ) {
      this.clientTrackingID = getUUID();
    }

  getMessages(): Observable<MessageEntity[]> {
    return interval(10000).pipe(mergeMap(() => this.http.get<MessageEntity[]>(`/assets/messages.json`)));
  }

  logout(): Observable<any> {
    const dialog = this.dialog.stop('Log out', 'You are logging out all applications. <br /> This will take 5 seconds. Please wait...');
    setTimeout(() => {
      dialog.close();
      window.location.href = '/';
    }, 5000);
    return of(true);
  }
}
