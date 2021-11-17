import { FormControl, FormGroup } from '@angular/forms';
import { compare, isSameDay } from '../../dates/helper/date.helper';

// @dynamic
export abstract class CustomValidators {

  /**
   * sets @param control as invalid if it's empty or contains only spaces
   */
  public static notEmpty(control: FormControl) {
    const empty = control.value == null || !control.value.trim();
    return empty ? { empty: true } : null;
  }

  public static dateRangeValidator(startControlName: string, endControlName: string) {
    return (fg: FormGroup) => {
      const start = fg.get(startControlName)?.value;
      const end = fg.get(endControlName)?.value;
      if (!start || !end) {
        return null;
      }
      return compare(start, end) || isSameDay(start, end) ? null : { outOfRangeDate: true };
    };
  }

  public static minDate(date: Date) {
    return (control: FormControl) => {
      return compare(control.value, date) ? { minDate: true } : null;
    };
  }

  public static maxDate(date: Date) {
    return (control: FormControl) => {
      return compare(date, control.value) ? { maxDate: true } : null;
    };
  }

  public static range(startControlName: string, endControlName: string, errorName = 'outOfRange') {
    return (fg: FormGroup) => {
      const inicial = fg?.get(startControlName)?.value;
      const final = fg?.get(endControlName)?.value;
      return inicial > final ? { [errorName]: true } : null;
    };
  }

  public static stringRange(startControlName: string, endControlName: string, errorName = 'outOfRange') {
    return (fg: FormGroup) => {
      const inicial = fg.get(startControlName)?.value && fg.get(startControlName)?.value.toLowerCase();
      const final = fg.get(endControlName)?.value && fg.get(endControlName)?.value.toLowerCase();
      return inicial > final ? { [errorName]: true } : null;
    };
  }
}
