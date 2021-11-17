import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'concat'
})
export class ConcatPipe implements PipeTransform {

  constructor(private _translateService: TranslateService) { }

  transform(value: any, ...params: any[]) {

    const translate = params[0] === 'translate';

    return translate
      ? this.translateAndConcat(value, params)
      : this.onlyConcat(value, params);
  }

  onlyConcat(value: string, params: string[]) {

    for (let i = 0; i < params.length; i++) {
      const param = params[i];
      value = value.replace(`{${i}}`, param);
    }

    return value;
  }

  translateAndConcat(value: string, params: string[]) {
    const keys = params.slice(1, params.length);
    const translations = this._translateService.instant(params);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      value = value.replace(`{${i}}`, translations[key]);
    }

    return value;
  }
}
