import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { AuthComponent } from './auth/auth.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    ErrorComponent,
    AuthComponent,
  ],
  imports: [CommonModule, PublicRoutingModule, SharedModule],
})
export class PublicModule {}
