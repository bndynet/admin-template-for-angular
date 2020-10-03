import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { HiRoutingModule } from './hi-routing.module';
import { CoreModule } from '../core/core.module';
import { AppUiModule } from '../app-ui.module';
import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [WelcomeComponent, DialogFormComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    HiRoutingModule,
  ]
})
export class HiModule { }
