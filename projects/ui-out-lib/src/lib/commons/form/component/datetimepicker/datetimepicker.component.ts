// import { animate, state, style, transition, trigger } from '@angular/animations';
// import { coerceBooleanProperty } from '@angular/cdk/coercion';
// import { Component, EventEmitter, forwardRef, OnChanges } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { formatDateHourTimestamp } from '../../../dates/helper/date.helper';
// import { Datetimepicker } from '../../model/datetimepicker.model';

// @Component({
//   selector: 'consorcio-datetimepicker',
//   templateUrl: './datetimepicker.component.html',
//   styleUrls: ['./datetimepicker.scss'],
//   inputs: ['value', 'placeholder', 'disabled', 'required', 'min', 'max'],
//   outputs: ['changeValue'],
//   providers: [{
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => DatetimepickerComponent),
//     multi: true
//   }],
//   host: {
//     class: 'consorcio-datetimepicker',
//   },
//   animations: [
//     trigger('openClose', [
//       state('open', style({ opacity: 1, height: '100%' })),
//       state('close', style({ opacity: 0, height: '30%' })),
//       transition('open => close', [animate('0.1s')]),
//       transition('close => open', [animate('0.1s')])
//     ])
//   ]
// })
// export class DatetimepickerComponent implements OnChanges, ControlValueAccessor {

//   /**
//    * @description
//    * data mínima permitida (inclusa)
//    */
//   /**
//    * @description
//    * data mínima permitida (inclusa)
//    */
//   min!: Date;

//   /**
//    * @description
//    * data máxima permitida (inclusa)
//    */
//   /**
//    * @description
//    * data máxima permitida (inclusa)
//    */
//   max!: Date;

//   /**
//    * @description
//    *  Valor da data do calendar
//    */
//   date = new Date();

//   /**
//    * @description
//    *  Valor de texto do input
//    */
//   textValue = '';

//   /**
//    * @description
//    *  Máscara do input
//    */
//   mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/];

//   /**
//    * @description
//    *  Data de entrada, pode ser uma instancia de Date ou uma data no padrão ISO 8601
//    */
//   value: string | Date = '';

//   /**
//    * @description
//    *  Placeholder do input
//    */
//   placeholder = '';

//   /**
//    * @description
//    *  Disabled do input
//    */
//   /**
//    * @description
//    *  Disabled do input
//    */
//   _disabled!: boolean;
//   set disabled(value: boolean) {
//     this._disabled = coerceBooleanProperty(value);
//   }

//   get disabled(): boolean {
//     return this._disabled;
//   }

//   /**
//    * @description
//    *  required do input
//    */
//   /**
//    * @description
//    *  required do input
//    */
//   _required!: boolean;
//   set required(value: boolean) {
//     this._required = coerceBooleanProperty(value);
//   }

//   get required(): boolean {
//     return this._required;
//   }

//   /**
//    * @description
//    *
//    *  Emite valor do datepicker
//    */
//   changeValue = new EventEmitter<Datetimepicker>();

//   /**
//    * @description
//    *
//    *  Tamanho da string formatada. Por exemplo '20/02/2020 12:50:30' possui tamanho igual a 19
//    */
//   private formattedStringLength = 19;

//   isCalendarOpen!: boolean;

//   ngOnChanges() {
//     this.updateDatetime(this.value);
//   }

//   onDateChange(date: Date) {
//     this.updateDatetime(date);
//     const result: Datetimepicker = this.convertToDatepickerValue(date);

//     this.onTouchControlValueAccessor();
//     this.onChangeControlValueAccessor(result.string);
//     this.changeValue.emit(result);
//   }

//   onInputChange(value: string) {
//     if (value && value.length === this.formattedStringLength) {
//       const date = this.parseISO(value);

//       if (this.isValidISO(date)) {
//         this.date = new Date(`${date}`) || null;
//         const result = this.convertToDatepickerValue(this.date);
//         this.changeValue.emit(result);
//         this.textValue = value;
//         this.onChangeControlValueAccessor(result.string);
//         return;
//       }
//     }

//     if (value && value.length > 0 && value.length < this.formattedStringLength) {
//       this.textValue = value;
//       return;
//     }
//   }

//   focusOut() {
//     this.onTouchControlValueAccessor();
//   }

//   /* Métodos do Control Value Accessor */
//   writeValue(value: string) {
//     this.updateDatetime(value);
//   }

//   // override
//   registerOnChange(fn: (rating: string | Date) => void) {
//     this.onChangeControlValueAccessor = fn;
//   }

//   // override
//   registerOnTouched(fn: () => void) {
//     this.onTouchControlValueAccessor = fn;
//   }

//   // override
//   setDisabledState(isDisabled: boolean) {
//     this.disabled = isDisabled;
//   }

//   // override
//   onTouchControlValueAccessor = () => { };

//   // override
//   onChangeControlValueAccessor = (value: string | Date) => { };

//   private formatDatetimeToString(date: Date | string): string {
//     if (date instanceof Date) {
//       return formatDateHourTimestamp(date, false) || "";
//     }
//     return formatDateHourTimestamp(new Date(date), false) || "";
//   }

//   private isValidISO(value: any) {
//     return /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])) ((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/g.test(value);
//   }

//   private parseISO(value: string) {
//     const [day, month, yearHourComplete] = value.split('/');

//     if (yearHourComplete) {
//       const [year, hourComplete] = yearHourComplete.split(' ');

//       if (hourComplete) {
//         const [hour, minute, second] = hourComplete.split(':');

//         return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
//       }
//     }
//     return '';
//   }

//   private convertToDatepickerValue(datetime: Date): Datetimepicker {
//     return { datetime, string: formatDateHourTimestamp(datetime, true) || "" };
//   }

//   private updateDatetime(value: Date | string) {
//     if (value instanceof Date) {
//       this.date = value;
//       this.textValue = this.formatDatetimeToString(value);
//       return;
//     }

//     if (this.isValidISO(value)) {
//       this.date = new Date(`${value}`);
//       this.textValue = this.formatDatetimeToString(this.date);
//       return;
//     }

//     this.date = new Date;
//     this.textValue = '';
//   }
// }
