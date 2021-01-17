import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppUiModule } from '../app-ui.module';
import { ClickOutsideDirective } from '../_directives/click-outside.directive';
import { LoadingDirective } from '../_directives/loading.directive';
import { AvatarComponent } from './avatar/avatar.component';
import { ContentSidebarComponent } from './content-sidebar/content-sidebar.component';
import { DialogComponent } from './dialog/dialog.component';
import { IconCardComponent } from './icon-card/icon-card.component';
import { LangMenuComponent } from './lang-menu/lang-menu.component';
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageErrorComponent } from './page-error/page-error.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { ThemeImgComponent } from './theme-img/theme-img.component';

@NgModule({
  declarations: [
    ClickOutsideDirective,
    LoadingDirective,
    DialogComponent,
    NavbarComponent,
    SideBarComponent,
    ContentSidebarComponent,
    PageHeaderComponent,
    PageLoadingComponent,
    PageErrorComponent,
    IconCardComponent,
    ThemeImgComponent,
    MenuComponent,
    AvatarComponent,
    LangMenuComponent,
  ],
  imports: [CommonModule, RouterModule, AppUiModule, TranslateModule],
  exports: [
    AppUiModule,
    TranslateModule,

    ClickOutsideDirective,
    LoadingDirective,

    DialogComponent,
    NavbarComponent,
    SideBarComponent,
    ContentSidebarComponent,
    PageHeaderComponent,
    PageLoadingComponent,
    PageErrorComponent,
    IconCardComponent,
    ThemeImgComponent,
    AvatarComponent,
    LangMenuComponent,
  ],
})
export class SharedModule {}
