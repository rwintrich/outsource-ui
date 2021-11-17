import { CommonModule } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { of } from 'rxjs/internal/observable/of';
import { FormModule } from '../../form.module';
import { AutocompleteComponent } from './autocomplete.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

describe('AutocompleteComponent', () => {

  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        NgSelectModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        CommonModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    component.search = (pesquisa) =>  of({content: [{id: '1', value: 'um'}, {id: '2', value: 'dois'}]});
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve exibir placeholder informado', () => {
    fixture.detectChanges();
    const nativeElement = fixture.debugElement;
    component.placeholder = 'Placeholder de teste';
    fixture.detectChanges();
    const label = nativeElement.query(By.css('.ng-placeholder'));
    expect(label.nativeElement.textContent.trim()).toEqual('Placeholder de teste');
  });

});
