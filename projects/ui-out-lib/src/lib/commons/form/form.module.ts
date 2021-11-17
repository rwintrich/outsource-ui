import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TranslateModule } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
// import { TextMaskModule } from 'angular2-text-mask';
import { AutocompleteModule } from './component/autocomplete/autocomplete.module';
// import { DatetimeComponent } from './component/datetime/datetime.component';
// import { DatetimepickerComponent } from './component/datetimepicker/datetimepicker.component';
import { ExpansionPanelComponent } from './component/expansion-panel/expansion-panel.component';
// import { MaskedNumberInputComponent } from './component/masked-number-input/masked-number-input.component';
// import { TimeComponent } from './component/time/time.component';
// import { TimepickerComponent } from './component/timepicker/timepicker.component';

@NgModule({
  declarations: [
    // MaskedNumberInputComponent,
    // DatetimepickerComponent,
    // DatetimeComponent,
    ExpansionPanelComponent,
    // TimeComponent,
    // TimepickerComponent
  ],
  exports: [
    AutocompleteModule,
    // MaskedNumberInputComponent,
    // DatetimepickerComponent,
    // DatetimeComponent,
    // TimepickerComponent,
    // TimeComponent,
    ExpansionPanelComponent
  ],
  imports: [
    AutocompleteModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    // TextMaskModule,
    MatFormFieldModule
  ]
})
export class FormModule { }
