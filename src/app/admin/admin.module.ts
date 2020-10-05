import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared';
import { HeroModule } from './hero/hero.module';
import { HelloModule } from './hello/hello.module';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HelloModule,
    HeroModule,
  ],
  bootstrap: []
})
export class AdminModule { }
