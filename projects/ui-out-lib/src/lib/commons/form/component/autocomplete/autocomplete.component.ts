import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, forwardRef, Inject, Injector, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, FormControlName } from '@angular/forms';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { Autocomplete, AutocompletePaginator } from '../../model/autocomplete.model';

const noop = () => { };

@Component({
  selector: 'consorcio-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  inputs: [
    'typeahead', 'placeholder', 'search', 'tapCallback', 'disabled', 'required', 'clearable', 'showValueOnly',
    'bindWholeObject', 'bindLabel', 'bindValue', 'allowDefaultValue'
  ],
  outputs: [
    'blur', 'change'
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AutocompleteComponent),
    }
  ]
})
export class AutocompleteComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  list!: Observable<Autocomplete[] | AutocompletePaginator | any>;
  loading = false;

  bindLabel = 'value';
  bindValue = 'id';

  private formControl: FormControl = new FormControl();
  private innerValue!: string;

  /**
   * se definido como true (por padrão é), permite que o autocomplete sete um valor automaticamente para o campo ao carregar
   * a lista, caso campo seja obrigatório e busca retorne um único elemento na lista
   */
  allowDefaultValue = true;

  /**
   * subject que dispara a pesquisa - passar se precisar da referência
   */
  typeahead = new Subject<string>();

  /**
   * placeholder exibido
   */
  /**
   * placeholder exibido
   */
  placeholder!: string;

  /**
   * callback com a requisição para busca - obrigatório
   */
  /**
   * callback com a requisição para busca - obrigatório
   */
  search!: (pesquisa: string) => Observable<AutocompletePaginator | Array<Autocomplete>>;

  /**
   * função a ser executada após pesquisa
   */
  tapCallback!: (returnQuery: AutocompletePaginator | Array<Autocomplete>) => void;

  set bindWholeObject(bindWholeObject: string) {
    const bindWholeObjectCoerced = coerceBooleanProperty(!!bindWholeObject);
    if (bindWholeObjectCoerced) this._bindWholeObject();
  }

  set disabled(disable) {
    this._disabled = coerceBooleanProperty(disable);
  }
  get disabled() {
    return this._disabled;
  }
  private _disabled = false;

  set required(disable) {
    this._required = coerceBooleanProperty(disable);
  }
  get required() {
    return this._required;
  }
  private _required = false;

  set clearable(disable) {
    this._clearable = coerceBooleanProperty(disable);
  }
  get clearable() {
    return this._clearable;
  }
  private _clearable = true;

  set showValueOnly(disable) {
    this._showValueOnly = coerceBooleanProperty(disable);
  }
  get showValueOnly() {
    return this._showValueOnly;
  }
  private _showValueOnly = false;

  blur: EventEmitter<void> = new EventEmitter();
  change: EventEmitter<any> = new EventEmitter();

  private onChange: (_: any) => void = noop;
  private onTouched: () => void = noop;

  get value() {
    return this.innerValue;
  }
  set value(value) {
    this.innerValue = value;
    this.onChange(value);
  }

  constructor(
    @Inject(forwardRef(() => Injector)) private injector: Injector,
    @Inject(forwardRef(() => ChangeDetectorRef)) private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (!this.search) {
      throw new Error(`autocomplete ${this.placeholder}'s search function is not defined`);
    }
    this.typeahead = this.typeahead || new Subject();
    this.loadList();
  }

  ngAfterViewInit() {
    this.checkIsDisabled();
    this.setFormControl();
    this.typeahead.next();
  }

  private _bindWholeObject() {
    this.bindValue = "";
  }

  private setFormControl() {
    const ngControl = this.injector.get<FormControlName>(FormControlName, undefined);
    this.formControl = ngControl ? ngControl.control : new FormControl();
  }

  private loadList() {
    this.list = concat(
      of([]),
      this.typeahead.pipe(
        debounceTime(500),
        tap(() => this.loading = true),
        switchMap(pesquisa =>
          this.search(pesquisa)
            .pipe(
              map((data: AutocompletePaginator | Array<Autocomplete>) => Array.isArray(data) ? data : data.content),
              catchError(() => of([])),
              tap((returnQuery) => this._updateValueAfterReloadingList(returnQuery))
            ))
      )
    );
    this.cdRef.detectChanges();
  }

  private _updateValueAfterReloadingList(returnQuery: any | any[] | AutocompletePaginator) {
    let newValue;
    this.loading = false;
    if (returnQuery && returnQuery.length === 1 && this.required && this.allowDefaultValue) {
      newValue = this.bindWholeObject ? returnQuery[0] : returnQuery[0].id;
    } else {
      newValue = this.formControl.value;
    }
    this.valueChange(newValue);
    this.formControl.setValue(newValue);
    if (this.tapCallback) {
      this.tapCallback(returnQuery);
    }
  }

  private checkIsDisabled() {
    if (this.disabled) {
      this.formControl.disable();
    }
  }

  onFocusOut() {
    this.blur.emit();
    this.onTouched();
  }

  valueChange(event: any) {
    this.change.emit(event);
  }

  get showRequiredError() {
    return this.formControl.errors && this.formControl.errors.required && this.formControl.touched;
  }

  get showError() {
    return this.formControl.errors;
  }

  get touched() {
    return this.formControl.touched;
  }

  onClear() {
    this.value = null || "";
  }

  // ControlValueAccessor
  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
}
