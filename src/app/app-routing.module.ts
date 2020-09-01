import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [

  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'error', component: PageNotFoundComponent },
  { path: '401', redirectTo: '/error?code=401' },
  { path: '403', redirectTo: '/error?code=403' },
  { path: '404', redirectTo: '/error?code=404' },
  { path: '500', redirectTo: '/error?code=500' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
