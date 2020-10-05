import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { AppUiModule } from 'src/app/app-ui.module';
import { SharedModule } from 'src/app/shared';



@NgModule({
  declarations: [WelcomeComponent, DialogFormComponent],
  imports: [
    CommonModule,
    AppUiModule,
    SharedModule,
  ]
})
export class HelloModule { }
