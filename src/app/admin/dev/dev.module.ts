import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppUiModule } from 'src/app/app-ui.module';
import { SharedModule } from '../../shared';
import { DevRoutingModule } from './dev-routing.module';
import { DevComponent } from './dev.component';
import { ButtonComponent } from './examples/button/button.component';
import { CardComponent } from './examples/card/card.component';
import { DialogFormComponent } from './examples/dialog-form/dialog-form.component';
import { TableDetailComponent } from './examples/table-detail/table-detail.component';
import { TableComponent } from './examples/table/table.component';
import { GetStartedComponent } from './get-started/get-started.component';

@NgModule({
  declarations: [
    DevComponent,
    CardComponent,
    ButtonComponent,
    DialogFormComponent,
    TableComponent,
    TableDetailComponent,
    GetStartedComponent,
  ],
  imports: [CommonModule, DevRoutingModule, AppUiModule, SharedModule],
})
export class DevModule {}
