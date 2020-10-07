import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppUiModule } from '../app-ui.module';
import { DialogComponent } from './dialog/dialog.component';

import { NavbarComponent } from './navbar/navbar.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { ContentSidebarComponent } from './content-sidebar/content-sidebar.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { PageErrorComponent } from './page-error/page-error.component';
import { RouterModule } from '@angular/router';
import { IconCardComponent } from './icon-card/icon-card.component';



@NgModule({
  declarations: [
    DialogComponent,
    NavbarComponent,
    SideBarComponent,
    ContentSidebarComponent,
    PageHeaderComponent,
    PageLoadingComponent,
    PageErrorComponent,
    IconCardComponent,
   ],
  imports: [
    CommonModule,
    RouterModule,
    AppUiModule,
  ],
  exports: [
    AppUiModule,

    DialogComponent,
    NavbarComponent,
    SideBarComponent,
    ContentSidebarComponent,
    PageHeaderComponent,
    PageLoadingComponent,
    PageErrorComponent,
    IconCardComponent,
  ],
})
export class SharedModule { }
