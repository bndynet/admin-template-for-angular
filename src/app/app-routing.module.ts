import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PageErrorComponent } from './shared';

const routes: Routes = [
  // { path: 'error', component: PageErrorComponent},
  { path: '401', redirectTo: '/error?code=401' },
  { path: '403', redirectTo: '/error?code=403' },
  { path: '404', redirectTo: '/error?code=404' },
  { path: '500', redirectTo: '/error?code=500' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'admin',  component: AdminComponent },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule', // () => import('./admin/admin.module').then( m => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
