import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppUiModule } from 'src/app/app-ui.module';
import { SharedModule } from 'src/app/shared';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, AppUiModule, SharedModule],
})
export class HelloModule {}
