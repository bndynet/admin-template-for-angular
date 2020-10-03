import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import {
  DialogRole,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { merge } from 'lodash';
import { Observable, of } from 'rxjs';
import { DialogComponent, DialogConfig } from '../shared/dialog/dialog.component';
import { DialogService } from './dialog.service';
import { NotificationService } from './notification.service';
import { StatusService } from './status.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    public dialog: DialogService,
    public status: StatusService,
    public notificaiton: NotificationService,
    ) {

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
