import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StatusService } from 'src/app/_services';
import { AppService } from 'src/app/_services/app.service';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {

  name: string;
  pending: boolean;

  constructor(
    private app: AppService,
    private dialog: MatDialogRef<DialogFormComponent>,
  ) { }

  ngOnInit(): void {
  }

  save(): void {
    this.pending = true;
    this.app.status.requesting();
    setTimeout(() => {
      this.pending = false;
      this.dialog.close();
      this.app.status.requested();
      this.app.notificaiton.info(`Saving ${name} ...`);
    }, 3000);
  }
}
