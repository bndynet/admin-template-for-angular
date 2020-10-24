import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroRoutingModule } from './hero-routing.module';
import { HeroComponent } from './hero.component';

@NgModule({
  declarations: [HeroComponent, HeroListComponent, HeroDetailComponent],
  imports: [CommonModule, HeroRoutingModule, SharedModule],
})
export class HeroModule {}
