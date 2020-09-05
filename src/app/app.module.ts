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
import { HiModule } from './hi/hi.module';
import { PageErrorComponent  } from './page-error/page-error.component';

@NgModule({
  declarations: [
    AppComponent,
    PageErrorComponent,
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
