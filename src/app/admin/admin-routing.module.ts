import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageErrorComponent } from '../shared';
import { AdminComponent } from './admin.component';
import { WelcomeComponent } from './hello/welcome/welcome.component';
import { HeroListComponent } from './hero/hero-list/hero-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'hi', pathMatch: 'full'},
      { path: 'hi', component: WelcomeComponent },
      { path: 'error', component: PageErrorComponent },
      { path: '404', redirectTo: 'error?code=404' },
      { path: 'heroes', loadChildren: () => import('./hero/hero.module').then(m => m.HeroModule )},
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
