import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListComponent } from './hero-list/hero-list.component';

const routes: Routes = [
  {
    path: 'heroes',
    component: HeroListComponent,
    data: { animation: 'heroes' },
    children: [{ path: ':id', component: HeroDetailComponent }],
  },
  {
    path: 'hero/:id',
    component: HeroDetailComponent,
    data: { animation: 'hero' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
