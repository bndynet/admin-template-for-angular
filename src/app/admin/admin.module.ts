import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HelloModule } from './hello/hello.module';
import { HeroModule } from './hero/hero.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HelloModule,
    HeroModule,
  ],
  bootstrap: [],
})
export class AdminModule {}
