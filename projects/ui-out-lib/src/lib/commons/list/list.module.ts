import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TableComponent } from './component/table/table.component';
import { GridListComponent } from './component/grid-list/grid-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormModule } from '../form/form.module';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { MatGridListModule } from '@angular/material/grid-list';
// import { NgSelectModule } from '@ng-select/ng-select';
import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
  declarations: [
    TableComponent,
    GridListComponent,
    OrderByPipe
  ],
  exports: [
    TableComponent,
    GridListComponent,
    OrderByPipe
  ],
  imports: [
    // FrameworkModule.forFeature(),
    PaginatorModule,
    // NgSelectModule,
    // TrackerModule,
    FormModule,
    ReactiveFormsModule,
    TableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    TranslateModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    CommonModule
  ],
  providers: [OrderByPipe]
})
export class ListModule { }
