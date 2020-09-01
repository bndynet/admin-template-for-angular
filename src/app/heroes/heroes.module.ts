import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { CoreModule } from '../core/core.module';
import { AppUiModule } from '../app-ui.module';


@NgModule({
  declarations: [HeroDetailComponent, HeroListComponent],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    CoreModule,
    AppUiModule,
  ]
})
export class HeroesModule { }
