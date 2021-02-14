import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import {
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ifUndefined } from 'src/utils';

@Component({
  selector: 'el-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  @Input() title: string;
  @Input() showCloseIcon = false;
  @Input() showLoadingIcon = false;
  @Input() actionsAlign = 'end';
  @Input() contentAlign = 'start';
  @Input() noActions = false;
  @Input() okLabel: string;
  @Input() cancelLabel: string;
  @Input() loading: boolean;
  @Input() remainSeconds: number;
  @Output() closed = new EventEmitter();

  constructor(
    private dialogRef: MatDialogRef<DialogConfig>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogConfig
  ) {
    this.title = dialogData.title;
    this.noActions = ifUndefined(dialogData.noActions, this.noActions);
    this.showCloseIcon = ifUndefined(
      dialogData.showCloseIcon,
      this.showCloseIcon
    );
    this.actionsAlign = ifUndefined(dialogData.actionsAlign, this.actionsAlign);
    this.contentAlign = ifUndefined(dialogData.contentAlign, this.contentAlign);
    this.okLabel = ifUndefined(dialogData.okLabel, this.okLabel);
    this.cancelLabel = ifUndefined(dialogData.cancelLabel, this.cancelLabel);

    this.showLoadingIcon = ifUndefined(
      dialogData.showLoadingIcon,
      this.showLoadingIcon
    );
    this.remainSeconds = ifUndefined(
      dialogData.remainSeconds,
      this.remainSeconds
    );
    if (this.remainSeconds > 0) {
      const interval = setInterval(() => {
        this.remainSeconds--;
        if (this.remainSeconds < 0) {
          clearInterval(interval);
        }
      }, 1000);
    }
  }

  onClose(): void {
    this.dialogRef.close();
    this.closed.emit();
  }
}

export interface DialogConfig extends MatDialogConfig {
  title?: string;
  content?: string;
  actionsAlign?: LineAlignSetting;
  contentAlign?: LineAlignSetting;
  noActions?: boolean;
  showCloseIcon?: boolean;

  showLoadingIcon?: boolean;
  remainSeconds?: number;

  cancelLabel?: string;
  okLabel?: string;
  okColor?: string;
  closeCallback?: any;
}
