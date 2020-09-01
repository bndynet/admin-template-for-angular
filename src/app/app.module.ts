import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './_interceptors';
import { AppUiModule } from './app-ui.module';
import { CoreModule } from './core/core.module';
import { HeroesModule } from './heroes/heroes.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HiModule } from './hi/hi.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppUiModule,
    CoreModule,
    HeroesModule,
    HiModule,
  ],
  providers: [
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
