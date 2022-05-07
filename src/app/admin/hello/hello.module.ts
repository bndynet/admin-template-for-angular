import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppUiModule } from 'src/app/app-ui.module';
import { SharedModule } from 'src/app/shared';
import { FormModule } from 'src/libs/form';
import { HelloRoutingModule } from './hello-routing.module';
import { HelloComponent } from './hello.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [HelloComponent, WelcomeComponent],
  imports: [
    CommonModule,
    AppUiModule,
    SharedModule,
    FormModule,
    HelloRoutingModule,
  ],
})
export class HelloModule {}
