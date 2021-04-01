import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AppService,
  NotificationService,
  StatusService,
} from 'src/app/_services';
import { mockErrorResponse } from 'src/utils';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';

@Component({
  selector: 'app-examples-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  public buttonLoading = false;

  private requesting = false;

  constructor(
    private http: HttpClient,
    private app: AppService,
    private status: StatusService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {}

  toggleRequesting(): void {
    this.requesting = !this.requesting;
    if (this.requesting) {
      this.status.requesting();
    } else {
      this.status.requested();
    }
  }

  showInfo(msg: string): void {
    this.notification.info(msg);
  }
  showSuccess(msg: string): void {
    this.notification.success(msg);
  }
  showWarning(msg: string): void {
    this.notification.warn(msg);
  }
  showError(msg: string): void {
    this.notification.error(msg);
  }

  alert(): void {
    this.app.dialog.alert('Alert Dialog', 'This is an alert dialog.', () => {
      this.notification.info('Done');
    });
  }
  confirm(): void {
    this.app.dialog.confirm(
      'Confirm Dialog',
      'This is a confirm dialog.',
      () => {
        this.notification.info('Done');
      }
    );
  }
  delete(): void {
    this.app.dialog.deleteConfirm(() => {
      this.notification.info('Done');
    });
  }
  formDialog(): void {
    this.app.dialog.open(DialogFormComponent, {}, () => {});
  }

  requestError(): void {
    mockErrorResponse(this.http).subscribe();
  }
}
