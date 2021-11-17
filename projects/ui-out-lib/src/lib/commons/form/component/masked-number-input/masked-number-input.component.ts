// import { coerceBooleanProperty } from '@angular/cdk/coercion';
// import { AfterViewInit, Component, EventEmitter, forwardRef, Inject, Injector, LOCALE_ID, OnInit } from '@angular/core';
// import { ControlValueAccessor, FormControl, FormControlName, NG_VALUE_ACCESSOR } from '@angular/forms';
// import * as parseDecimalNumber from 'parse-decimal-number';
// import { MaskHelper } from '../../helper/mask-helper';
// const parseDecimalNumb = parseDecimalNumber;

// const noop = () => {
// };

// const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
//   provide: NG_VALUE_ACCESSOR,
//   // tslint:disable-next-line: no-use-before-declare
//   useExisting: forwardRef(() => MaskedNumberInputComponent),
//   multi: true
// };

// @Component({
//   selector: 'consorcio-masked-number-input',
//   templateUrl: './masked-number-input.component.html',
//   styleUrls: ['./masked-number-input.component.scss'],
//   providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
//   inputs: ['class', 'integers', 'decimals',
//     'allowNegative', 'required', 'placeholder', 'disabled'
//   ],
//   outputs: [
//     'blur', 'valueChanged'
//   ]
// })
// export class MaskedNumberInputComponent implements OnInit, ControlValueAccessor, AfterViewInit {

//   mask = undefined;

//   private innerValue: number = null;
//   private _disabled = false;

//   formControl = new FormControl();

//   onTouchedCallback: () => void = noop;
//   onChangeCallback: (_: any) => void = noop;

//   class = '--f-text-align-right';

//   set integers(integers: number) {
//     if (integers) {
//       this._integers = integers;
//       this._updateMask();
//     }
//   }
//   get integers() {
//     return this._integers;
//   }
//   private _integers = 4;

//   set decimals(decimals: number) {
//     if (decimals) {
//       this._decimals = decimals;
//       this._updateMask();
//     }
//   }
//   get decimals() {
//     return this._decimals;
//   }
//   private _decimals = 0;

//   allowNegative = true;

//   required = false;

//   placeholder = '';

//   get disabled() { return this._disabled; }
//   set disabled(disable: boolean) { this._disabled = coerceBooleanProperty(disable); }

//   blur: EventEmitter<number> = new EventEmitter();
//   valueChanged: EventEmitter<number> = new EventEmitter();

//   get value() {
//     const options = { minimumFractionDigits: this.decimals };
//     return this.innerValue || this.innerValue === 0 ? this.innerValue.toLocaleString(this.locale, options) : null;
//   }

//   set value(value: number | string) {
//     const previous = this.innerValue;
//     let newValue = null;

//     if (typeof value === 'number') newValue = value;
//     else if (value != null && value !== '') newValue = +value.toString().replace(/\./g, '').replace(/\,/, '.');

//     if (previous !== newValue) {
//       this.innerValue = newValue;
//       this.valueChanged.emit(this.innerValue);
//       this.onChangeCallback(this.innerValue);
//     }
//   }

//   constructor(@Inject(LOCALE_ID) public locale: string, private injector: Injector) { }

//   ngOnInit(): void {
//     this._updateMask();
//   }

//   ngAfterViewInit() {
//     this.setFormControl();
//   }

//   private setFormControl() {
//     const ngControl: FormControlName = this.injector.get<FormControlName>(FormControlName, null);
//     this.formControl = ngControl ? ngControl.control : new FormControl();
//   }

//   private _updateMask() {
//     this.mask = MaskHelper.createNumberMask(this.integers, this.decimals, !!this.allowNegative, this.locale);
//   }

//   writeValue(value: number | string) {
//     this.value = value;
//   }

//   registerOnChange(fn: any) {
//     this.onChangeCallback = fn;
//   }

//   registerOnTouched(fn: any) {
//     this.onTouchedCallback = fn;
//   }

//   setDisabledState(isDisabled: boolean): void {
//     this.disabled = isDisabled;
//   }

//   onBlur() {
//     this.blur.emit(this.innerValue);
//     this.valueChanged.emit(this.innerValue);
//     this.onTouchedCallback();
//   }

//   onChange(value: string) {
//     this.value = value;
//   }

//   get showError() {
//     return this.formControl && this.formControl.invalid && this.formControl.touched;
//   }
// }
