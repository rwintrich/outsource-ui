import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AutocompleteComponent],
  exports: [AutocompleteComponent],
  imports: [
    NgSelectModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class AutocompleteModule { }
