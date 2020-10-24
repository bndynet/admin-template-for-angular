import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [CommonModule, PublicRoutingModule, SharedModule],
})
export class PublicModule {}
