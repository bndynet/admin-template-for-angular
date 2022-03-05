import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppUiModule } from 'src/app/app-ui.module';
import { FormModule } from 'src/libs/form';
import { SharedModule } from '../../shared';
import { DevRoutingModule } from './dev-routing.module';
import { DevComponent } from './dev.component';
import { ButtonComponent } from './examples/button/button.component';
import { CardComponent } from './examples/card/card.component';
import { DialogFormComponent } from './examples/dialog-form/dialog-form.component';
import { DynamicFormComponent } from './examples/dynamic-form/dynamic-form.component';
import { LayoutComponent } from './examples/layout/layout.component';
import { TableDetailComponent } from './examples/table-detail/table-detail.component';
import { TableComponent } from './examples/table/table.component';
import { TerminalComponent } from './examples/terminal/terminal.component';
import { GetStartedComponent } from './get-started/get-started.component';

@NgModule({
  declarations: [
    DevComponent,
    CardComponent,
    ButtonComponent,
    DialogFormComponent,
    DynamicFormComponent,
    TableComponent,
    TableDetailComponent,
    GetStartedComponent,
    LayoutComponent,
    TerminalComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    DevRoutingModule,
    FormModule,
    AppUiModule,
    SharedModule,
  ],
})
export class DevModule {}
