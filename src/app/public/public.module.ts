import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SharedModule } from '../shared';


@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
  ]
})
export class PublicModule { }
