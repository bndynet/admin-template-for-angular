import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';

@NgModule({
  declarations: [FormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FormComponent],
})
export class FormModule {}
