import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { HiRoutingModule } from './hi-routing.module';
import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [WelcomeComponent, DialogFormComponent],
  imports: [
    SharedModule,
    HiRoutingModule,
  ]
})
export class HiModule { }
