import { animate, state, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, forwardRef, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'consorcio-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  inputs: ['value', 'placeholder', 'disabled', 'required', 'timeFormat'],
  outputs: ['changeValue'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimepickerComponent),
    multi: true
  }],
  host: {
    class: 'consorcio-timepicker',
  },
  animations: [
    trigger('openClose', [
      state('open', style({ opacity: 1, height: '100%' })),
      state('close', style({ opacity: 0, height: '30%' })),
      transition('open => close', [animate('0.1s')]),
      transition('close => open', [animate('0.1s')])
    ])
  ]
})
export class TimepickerComponent implements OnChanges, ControlValueAccessor {
  /**
   * @description
   *  Horário informado
   */
  /**
   * @description
   *  Horário informado
   */
  time!: Date;

  _timeFormat!: string;
  set timeFormat(value: string) {
    this._timeFormat = value;
  }

  get timeFormat(): string {
    return this._timeFormat;
  }

  /**
   * @description
   *  Valor de texto do input
   */
  textValue = '';

  /**
   * @description
   *  Máscara do input
   */
  /**
   * @description
   *  Máscara do input
   */
  mask!: (string | RegExp)[];

  /**
   * @description
   *  Horário de entrada
   */
  value: string = '';

  /**
   * @description
   *  Placeholder do input
   */
  placeholder = '';

  /**
   * @description
   *  Disabled do input
   */
  /**
   * @description
   *  Disabled do input
   */
  _disabled!: boolean;
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  get disabled(): boolean {
    return this._disabled;
  }

  /**
   * @description
   *  required do input
   */
  /**
   * @description
   *  required do input
   */
  _required!: boolean;
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }

  get required(): boolean {
    return this._required;
  }

  /**
   * @description
   *
   *  Emite valor do datepicker
   */
  changeValue = new EventEmitter<string>();

  ngOnChanges() {
    this.updateDatetime(this.value);
    this.setMask();
  }

  onDateChange(time: any) {
    time = time.toTimeString().split(' ')[0];
    switch (this.timeFormat) {
      case 'hh': time = time.split(':')[0]; break;
      case 'hh:mm': time = time.split(':')[0] + ':' + time.split(':')[1]; break;
      case 'hh:mm:ss': time = time.split(':')[0] + ':' + time.split(':')[1] + ':' + time.split(':')[2];; break;
    }

    this.time = time;
    this.changeValue.emit(time);
    this.textValue = time;
    this.onChangeControlValueAccessor(time);
    return;
  }

  onInputChange(value: string) {
    const time = value;

    this.time = new Date(time);
    this.changeValue.emit(time);
    this.textValue = value;
    this.onChangeControlValueAccessor(time);
    return;
  }

  focusOut() {
    this.onTouchControlValueAccessor();
  }

  /* Métodos do Control Value Accessor */
  writeValue(value: string) {
    this.updateDatetime(value);
  }

  // override
  registerOnChange(fn: (rating: string) => void) {
    this.onChangeControlValueAccessor = fn;
  }

  // override
  registerOnTouched(fn: () => void) {
    this.onTouchControlValueAccessor = fn;
  }

  // override
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  // override
  onTouchControlValueAccessor = () => { };

  // override
  onChangeControlValueAccessor = (value: string) => { };

  private updateDatetime(value: any) {
    if (value instanceof Date) {
      this.time = new Date(value.toTimeString().split(' ')[0].toString());
      this.textValue = this.time.toString();
      return;
    } else if (typeof value === 'string') {
      this.time = new Date(value);
      this.textValue = this.time.getDate().toString();
      return;
    }

    this.time = new Date || "";
    this.textValue = '';
  }

  setMask() {
    if (this.timeFormat == 'hh:mm:ss') {
      this.mask = [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/];
    } else if (this.timeFormat == 'hh:mm') {
      this.mask = [/\d/, /\d/, ':', /\d/, /\d/];
    } else {
      this.mask = [/\d/, /\d/];
    }
  }
}
