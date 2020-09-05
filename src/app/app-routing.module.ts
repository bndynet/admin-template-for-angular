import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageErrorComponent } from './page-error/page-error.component';

const routes: Routes = [

  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'error', component: PageErrorComponent},
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
