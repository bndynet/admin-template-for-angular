import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppUiModule } from '../app-ui.module';
import { DialogComponent } from './dialog/dialog.component';



@NgModule({
  declarations: [ DialogComponent ],
  imports: [
    CommonModule,
    AppUiModule,
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    AppUiModule,
    DialogComponent,
  ],
})
export class SharedModule { }
