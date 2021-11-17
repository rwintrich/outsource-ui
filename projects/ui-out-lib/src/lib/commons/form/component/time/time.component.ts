import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

enum TYPE_TIME {
  HOUR = 1,
  MINUTE = 2,
  SECOND = 3
}

enum TIME_FORMAT {
  HH = 'hh',
  HHMM = 'hh:mm',
  HHMMSS = 'hh:mm:ss'
}

@Component({
  selector: 'consorcio-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
  inputs: ['time', 'timeFormat', 'hour', 'minute', 'second', 'disabled', 'onlyIcon', 'append'],
  outputs: ['change'],
  animations: [
    trigger('openClose', [
      state('open', style({ opacity: 1, height: '100%' })),
      state('close', style({ opacity: 0, height: '30%' })),
      transition('open => close', [animate('0.1s')]),
      transition('close => open', [animate('0.1s')])
    ])
  ]
})
export class TimeComponent implements OnInit, OnChanges {

  /**
   * @description
   *
   * Horário informado
   */
  private _time: Date = new Date();
  set time(time: Date) {
    this._time = time || this.defaultTime;

    this.updateCalendar();
    this.updateDatetime();
  }

  _timeFormat!: string;
  set timeFormat(value: string) {
    this._timeFormat = value;
  }

  get timeFormat(): string {
    return this._timeFormat;
  }

  get time(): Date {
    return this._time;
  }

  defaultTime: Date = new Date();
  previousDate: Date = new Date();

  /**
   * @description
   * Hora exibida no componente.
   */
  /**
   * @description
   * Hora exibida no componente.
   */
  hourDisplay!: string;

  /**
   * @description
   * Minuto exibido no componente.
   */
  /**
   * @description
   * Minuto exibido no componente.
   */
  minuteDisplay!: string;

  /**
   * @description
   * Segundo exibido no componente.
   */
  /**
   * @description
   * Segundo exibido no componente.
   */
  secondDisplay!: string;

  /**
   * @description
   * Hora inserida.
   */
  /**
   * @description
   * Hora inserida.
   */
  _hour!: number;
  set hour(value: number) {
    this._hour = value;

    if (typeof value === 'number') {
      this.hourDisplay = value.toString().padStart(2, '0');
    }
  }

  get hour(): number {
    return this._hour;
  }

  defaultHour!: number;

  /**
   * @description
   * Minuto inserido.
   */
  /**
   * @description
   * Minuto inserido.
   */
  _minute!: number;
  set minute(value: number) {
    this._minute = value;

    if (typeof value === 'number') {
      this.minuteDisplay = value.toString().padStart(2, '0');
    }
  }

  get minute(): number {
    return this._minute;
  }

  defaultMinute!: number;

  /**
   * @description
   * Segundo inserido.
   */
  /**
   * @description
   * Segundo inserido.
   */
  _second!: number;
  set second(value: number) {
    this._second = value;

    if (typeof value === 'number') {
      this.secondDisplay = value.toString().padStart(2, '0');
    }
  }

  get second(): number {
    return this._second;
  }

  defaultSecond!: number;

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
   *
   * Tipo de layout
   */
  /**
   * @description
   *
   * Tipo de layout
   */
  _onlyIcon: boolean = false;

  get onlyIcon(): boolean {
    return coerceBooleanProperty(this._onlyIcon);
  }

  set onlyIcon(value: boolean) {
    this._onlyIcon = value;
  }

  /**
   * @description
   * Elemento a qual pode ser passado para o calendário ser vinculado
   */
  append?: ElementRef | HTMLElement;

  /**
   * @description
   * Evento emitido quando a data é selecionada
   */
  change: EventEmitter<Date> = new EventEmitter();

  /**
   * @description
   * Referência do overlay que é criado.
   */
  /**
   * @description
   * Referência do overlay que é criado.
   */
  templatePortal!: TemplatePortal<any>;

  /**
   * @description
   * Referência do overlay que é criado.
   */
  /**
   * @description
   * Referência do overlay que é criado.
   */
  overlayRef!: OverlayRef;

  /**
   * @description
   * Boolean que define se o componente está aberto ou não.
   */
  /**
   * @description
   * Boolean que define se o componente está aberto ou não.
   */
  isTimeOpen!: boolean;

  /**
   * @description
   * Array de números que exibirão as horas no relógio.
   */
  /**
   * @description
   * Array de números que exibirão as horas no relógio.
   */
  clockHours!: number[];

  /**
   * @description
   * Array de números que exibirão os minutos e os segundos no relógio.
   */
  /**
   * @description
   * Array de números que exibirão os minutos e os segundos no relógio.
   */
  clockMinutesSeconds!: number[];

  /**
   * @description
   * Enum com tipos de tempo.
   */
  TypeTime = TYPE_TIME;

  /**
  * @description
  * Enum com formatos de tempo.
  */
  TimeFormat = TIME_FORMAT;

  /**
   * @description
   * Tipo de tempo ativo (hora, minuto ou segundo).
   */
  timeTypeActive = TYPE_TIME.HOUR;

  /**
   * @description
   * Tempo atual de referência.
   */
  now = new Date();

  /**
   * @description
   * Data atualizada com hora que será retornada.
   */
  /**
   * @description
   * Data atualizada com hora que será retornada.
   */
  outputDatetime!: Date;

  constructor(
    private overlay: Overlay,
    private vc: ViewContainerRef,
  ) { }

  ngOnInit() {
    this.updateCalendar();
    this.defineClock();
    this.defineInitialTime();
    this.updateDatetime();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { date } = changes;
    if (date) {
      this.dateChanged(date);
    }
  }

  onOpenSchedule(element: HTMLElement, scheduleTemplate: any) {
    this.createOverlay(element, scheduleTemplate);
    this.subscribeOnBackdropClick();
    this.isTimeOpen = true;
  }

  onDateSelected(date: Date) {
    this._time = date;
    this.updateDatetime();
  }

  /**
   * @description
   *
   * Define o tipo de tempo que está ativo.
   */
  setTimeType(typeTime: TYPE_TIME) {
    this.timeTypeActive = typeTime;
  }

  /**
   * @description
   *
   * Atualiza a hora do componente.
   */
  updateHour(hour: number) {
    this.hour = hour;

    if (this.timeFormat === TIME_FORMAT.HHMMSS || this.timeFormat === TIME_FORMAT.HHMM) {
      this.timeTypeActive = TYPE_TIME.MINUTE;
    }

    this.updateDatetime();
  }

  /**
   * @description
   *
   * Atualiza o minuto do componente.
   */
  updateMinute(minute: number) {
    this.minute = minute;

    if (this.timeFormat === TIME_FORMAT.HHMMSS) {
      this.timeTypeActive = TYPE_TIME.SECOND;
    }

    this.updateDatetime();
  }

  /**
   * @description
   *
   * Atualiza o segundo do componente.
   */
  updateSecond(second: number) {
    this.second = second;

    this.updateDatetime();
  }

  onAnimationDone(event: AnimationEvent) {
    const { fromState, toState } = event;

    if (fromState === 'open' && toState === 'close') {
      this.overlayRef.dispose();
      this.defaultTime = new Date();
      this._time = this.previousDate;
      this.hour = this.previousDate.getHours();
      this.minute = this.previousDate.getMinutes();
      this.second = this.previousDate.getSeconds();

      this.updateCalendar();
    }
  }

  confirm() {
    this.previousDate = this.outputDatetime;
    this.isTimeOpen = false;
    this.change.emit(this.outputDatetime);
  }

  private updateCalendar() {
    if (!this.time) {
      this.defaultTime.setHours(0, 0, 0, 0);
    }
  }

  private defineClock() {
    this.clockHours = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];

    const minutesAndSeconds = Array(45).fill(15).map((fixedNumber, index) => fixedNumber + index);
    this.clockMinutesSeconds = minutesAndSeconds.concat(Array(15).fill(0).map((fixedNumber, index) => fixedNumber + index));
  }

  private defineInitialTime() {
    const date = new Date();
    if (typeof this.hour === 'undefined' || this.hour === null) {
      this.hour = date.getHours();
      this.defaultHour = this.hour;
    }

    if (typeof this.minute === 'undefined' || this.minute === null) {
      this.minute = date.getMinutes();
      this.defaultMinute = this.minute;
    }

    if (typeof this.second === 'undefined' || this.second === null) {
      this.second = date.getSeconds();
      this.defaultSecond = this.second;
    }
  }

  /**
   * @description
   *
   * Atualiza horário que será emitido pelo componente.
   */
  private updateDatetime() {
    if (typeof this.time !== 'string') {
      this.outputDatetime = new Date(this.time);
    } else {
      this.outputDatetime = new Date(1, 1, 1900, this.hour, this.minute, this.second);
    }

    this.outputDatetime.setHours(this.hour, this.minute, this.second);

  }

  private createOverlay(element: HTMLElement, scheduleTemplate: TemplateRef<any>) {
    if (!this.templatePortal) this.templatePortal = new TemplatePortal(scheduleTemplate, this.vc);
    const htmlElement = this.append ? this.append : element;

    this.overlayRef = this.overlay.create({
      panelClass: 'consorcio-datetime-overlay',
      hasBackdrop: true,
      backdropClass: 'consorcio-datetime-backdrop',
      positionStrategy: this.getPositionStrategy(htmlElement),
    });

    this.overlayRef.attach(this.templatePortal);
  }

  private getPositionStrategy(element: ElementRef | HTMLElement) {
    return this.overlay.position()
      .flexibleConnectedTo(element)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top'
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom'
        }
      ]);
  }

  private subscribeOnBackdropClick() {
    this.overlayRef.backdropClick().subscribe(() => {
      this.isTimeOpen = false;
    });
  }

  private dateChanged(date: SimpleChange) {
    if (date.currentValue && date.currentValue !== date.previousValue) {
      this.hour = date.currentValue.getHours();
      this.minute = date.currentValue.getMinutes();
      this.second = date.currentValue.getSeconds();

      this.updateCalendar();
      this.updateDatetime();
      return;
    }
    if (!date.currentValue && date.currentValue !== date.previousValue) {
      this.hour = this.defaultHour;
      this.minute = this.defaultMinute;
      this.second = this.defaultSecond;

      this.updateCalendar();
      this.updateDatetime();
      return;
    }
  }
}
