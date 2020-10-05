import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroRoutingModule } from './hero-routing.module';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { SharedModule } from 'src/app/shared';
import { HeroComponent } from './hero.component';


@NgModule({
  declarations: [HeroComponent, HeroListComponent, HeroDetailComponent],
  imports: [
    CommonModule,
    HeroRoutingModule,
    SharedModule,
  ]
})
export class HeroModule { }
