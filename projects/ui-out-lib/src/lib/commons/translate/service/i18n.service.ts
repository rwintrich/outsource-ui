import { Injectable, Inject } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class I18nService {

  defaultLanguage: string;

  constructor(private translateService: TranslateService, @Inject('config') config?: any) {
    if (!config || !config.defaultLanguage) {
      throw new Error('config must me passed as a provider in core module, with defaultLanguage property');
    }
    this.defaultLanguage = config.defaultLanguage;
    translateService.setDefaultLang(this.defaultLanguage);
  }

  init() {
    const defaultLanguage = this.defaultLanguage;
    this.language = defaultLanguage;

    this.translateService.onLangChange
      .subscribe((event: LangChangeEvent) => { localStorage.setItem(defaultLanguage, event.lang); });
  }

  set language(language: string) {
    this.translateService.use(language);
  }

  translate(value: string): Observable<any> {
    return this.translateService.get(value);
  }
}
