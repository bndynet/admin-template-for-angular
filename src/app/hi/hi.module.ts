import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { HiRoutingModule } from './hi-routing.module';
import { CoreModule } from '../core/core.module';
import { AppUiModule } from '../app-ui.module';



@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    CoreModule,
    AppUiModule,
    HiRoutingModule,
  ]
})
export class HiModule { }
