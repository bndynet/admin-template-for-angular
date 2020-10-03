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
import { DialogComponent, DialogConfig } from '../common/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private dialog: MatDialog) {}

  openDialog<TDialog, TDialogConfig>(
    dialogComponent: ComponentType<TDialog>,
    config: TDialogConfig,
    closeCallback: any,
    matConfig?: MatDialogConfig,
  ): MatDialogRef<TDialog> {
    const finalConfig = merge({ disableClose: true, data: config }, matConfig);
    const dialogRef = this.dialog.open<TDialog, TDialogConfig>(
      dialogComponent,
      finalConfig
    );

    if (closeCallback) {
      dialogRef.afterClosed().subscribe((result) => {
        closeCallback(result);
      });
    }

    return dialogRef;
  }

  stop(title: string, content: string): MatDialogRef<DialogComponent, DialogConfig> {
    return this.alert(title, content, null, {
      noActions: true,
    });
  }

  alert(
    title: string,
    content?: string,
    callback?: any,
    config?: DialogConfig,
    matConfig?: MatDialogConfig,
  ): MatDialogRef<DialogComponent> {
    return this.openDialog<DialogComponent, DialogConfig>(
      DialogComponent,
      merge({
        title,
        content,
        contentAlign: 'center',
        actionsAlign: 'center',
        cancelHidden: true,
      }, config),
      callback,
      merge({
        minWidth: '400px',
        disableClose: true,
        role: 'alertdialog' as DialogRole,
      }, matConfig),
    );
  }

  confirm(
    title: string,
    content: string,
    callback: any,
    config?: DialogConfig,
  ): MatDialogRef<DialogComponent> {
    return this.openDialog<DialogComponent, DialogConfig>(
      DialogComponent,
      merge({
        title,
        content,
        contentAlign: 'center',
        actionsAlign: 'end',
      }, config),
      result => {
        if (result && callback) {
          callback();
        }
      },
      merge({
        minWidth: '400px',
        disableClose: true,
        role: 'alertdialog' as DialogRole,
      }),
    );
  }

  deleteConfirm(callback: any): MatDialogRef<DialogComponent> {
    return this.confirm(
      'Delete',
      'Are you sure you want to delete item(s)?',
      callback,
      {
        okColor: 'accent',
      }
    );
  }

  logout(): Observable<any> {
    const dialog = this.stop('Log out', 'You are logging out all applications. <br /> This will take 5 seconds. Please wait...');
    setTimeout(() => {
      dialog.close();
      window.location.href = '/';
    }, 5000);
    return of(true);
  }
}
