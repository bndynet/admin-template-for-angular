import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppUiModule } from '../app-ui.module';
import { AppRoutingModule } from '../app-routing.module';
import { AppSideBarComponent } from './app-sidebar/app-sidebar.component';
import { AppContentSidebarComponent } from './app-content-sidebar/app-content-sidebar.component';
import { AppPageHeaderComponent } from './app-page-header/app-page-header.component';
import { AppPageLoadingComponent } from './app-page-loading/app-page-loading.component';


@NgModule({
  declarations: [AppNavbarComponent, AppSideBarComponent, AppContentSidebarComponent, AppPageHeaderComponent, AppPageLoadingComponent],
  imports: [
    CommonModule,
    AppUiModule,
    AppRoutingModule,
  ],
  exports: [
    AppNavbarComponent,
    AppSideBarComponent,
    AppContentSidebarComponent,
    AppPageHeaderComponent,
    AppPageLoadingComponent,
  ]
})
export class CoreModule { }
