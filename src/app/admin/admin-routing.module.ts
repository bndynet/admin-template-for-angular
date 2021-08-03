import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageErrorComponent } from '../shared';
import { AuthGuardWithForceLogin } from '../_services/auth-guard.service';
import { AdminComponent } from './admin.component';
import { WelcomeComponent } from './hello/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'error', component: PageErrorComponent },
      { path: '404', redirectTo: 'error?code=404' },
      {
        path: 'dev',
        loadChildren: () => import('./dev/dev.module').then((m) => m.DevModule),
      },
      { path: 'hello', component: WelcomeComponent },
      { path: '', redirectTo: 'dev/get-started', pathMatch: 'full' },
    ],
    canActivate: [AuthGuardWithForceLogin], // redirect to login, if you donot require this, pls use AuthGuard
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
