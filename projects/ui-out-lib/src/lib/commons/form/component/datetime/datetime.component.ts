// import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
// import { coerceBooleanProperty } from '@angular/cdk/coercion';
// import { Overlay, OverlayRef } from '@angular/cdk/overlay';
// import { TemplatePortal } from '@angular/cdk/portal';
// import { DatePipe } from '@angular/common';
// import {
//   Component,
//   ElementRef,
//   EventEmitter,
//   OnChanges,
//   OnInit,
//   SimpleChange,
//   SimpleChanges,
//   TemplateRef,
//   ViewContainerRef
// } from '@angular/core';
// import {
//   addMonths,
//   compare,
//   eachDayOfInterval,
//   endOfMonth,
//   endOfWeek,
//   startOfMonth,
//   startOfWeek,
//   subMonths, weekDay
// } from '../../../dates/helper/date.helper';


// enum TYPE_TIME {
//   HOUR = 1,
//   MINUTE = 2,
//   SECOND = 3
// }

// @Component({
//   selector: 'consorcio-datetime',
//   templateUrl: './datetime.component.html',
//   styleUrls: ['./datetime.scss'],
//   providers: [DatePipe],
//   inputs: ['date', 'hour', 'minute', 'second', 'disabled', 'onlyIcon', 'append', 'min', 'max'],
//   outputs: ['change'],
//   animations: [
//     trigger('openClose', [
//       state('open', style({ opacity: 1, height: '100%' })),
//       state('close', style({ opacity: 0, height: '30%' })),
//       transition('open => close', [animate('0.1s')]),
//       transition('close => open', [animate('0.1s')])
//     ])
//   ]
// })
// export class DatetimeComponent implements OnInit, OnChanges {

//   /**
//    * @description
//    * data mínima permitida (inclusa)
//    */
//   set min(min: Date) {
//     if (min && compare(this.date, min)) this.date = new Date(min);
//     this._min = min;
//   }
//   get min() { return this._min; }
//   private _min!: Date;

//   /**
//    * @description
//    * data máxima permitida (inclusa)
//    */
//   set max(max: Date) {
//     if (max && compare(max, this.date)) this.date = new Date(max);
//     this._max = max;
//   }
//   get max() { return this._max; }
//   private _max!: Date;


//   /**
//    * @description
//    *
//    * Data inserida
//    */
//   private _date: Date = new Date();
//   set date(date: Date) {
//     this._date = date || this.defaultDate;
//     if (this.min && compare(this._date, this.min)) this._date = new Date(this.min);
//     if (this.max && compare(this.max, this._date)) this._date = new Date(this.max);
//     this.previousDate = date || this.defaultDate;
//     this.updateCalendar();
//     this.updateDatetime();
//   }

//   get date(): Date {
//     return this._date;
//   }

//   defaultDate: Date = new Date();
//   previousDate: Date = new Date();

//   /**
//    * @description
//    * Hora exibida no componente.
//    */
//   /**
//    * @description
//    * Hora exibida no componente.
//    */
//   hourDisplay!: string;

//   /**
//    * @description
//    * Minuto exibido no componente.
//    */
//   minuteDisplay!: string;

//   /**
//    * @description
//    * Segundo exibido no componente.
//    */
//   secondDisplay!: string;

//   /**
//    * @description
//    * Hora inserida.
//    */
//   _hour!: number;
//   set hour(value: number) {
//     this._hour = value;

//     if (typeof value === 'number') {
//       this.hourDisplay = value.toString().padStart(2, '0');
//     }
//   }

//   get hour(): number {
//     return this._hour;
//   }

//   defaultHour!: number;

//   /**
//    * @description
//    * Minuto inserido.
//    */
//   _minute!: number;
//   set minute(value: number) {
//     this._minute = value;

//     if (typeof value === 'number') {
//       this.minuteDisplay = value.toString().padStart(2, '0');
//     }
//   }

//   get minute(): number {
//     return this._minute;
//   }

//   defaultMinute!: number;

//   /**
//    * @description
//    * Segundo inserido.
//    */
//   _second!: number;
//   set second(value: number) {
//     this._second = value;

//     if (typeof value === 'number') {
//       this.secondDisplay = value.toString().padStart(2, '0');
//     }
//   }

//   get second(): number {
//     return this._second;
//   }

//   defaultSecond!: number;

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
//    *
//    * Tipo de layout
//    */
//   /**
//    * @description
//    *
//    * Tipo de layout
//    */
//   _onlyIcon: boolean = false;

//   get onlyIcon(): boolean {
//     return coerceBooleanProperty(this._onlyIcon);
//   }

//   set onlyIcon(value: boolean) {
//     this._onlyIcon = value;
//   }

//   /**
//    * @description
//    * Elemento a qual pode ser passado para o calendário ser vinculado
//    */
//   append?: ElementRef | HTMLElement;

//   /**
//    * @description
//    * Evento emitido quando a data é selecionada
//    */
//   change: EventEmitter<Date> = new EventEmitter();

//   /**
//    * @description
//    * Referência à data corrente.
//    */
//   today = new Date();

//   /**
//    * @description
//    * Array com os dias da semana corrente.
//    */
//   weekDays: Date[] = [];

//   /**
//    * @description
//    * Array com os dias do mês corrente.
//    */
//   schedule: Date[] = [];

//   /**
//    * @description
//    * Referência do overlay que é criado.
//    */
//   /**
//    * @description
//    * Referência do overlay que é criado.
//    */
//   templatePortal!: TemplatePortal<any>;

//   /**
//    * @description
//    * Referência do overlay que é criado.
//    */
//   /**
//    * @description
//    * Referência do overlay que é criado.
//    */
//   overlayRef!: OverlayRef;

//   /**
//    * @description
//    * Boolean que define se o componente está aberto ou não.
//    */
//   /**
//    * @description
//    * Boolean que define se o componente está aberto ou não.
//    */
//   isDatetimeOpen!: boolean;

//   /**
//    * @description
//    * Array de números que exibirão as horas no relógio.
//    */
//   /**
//    * @description
//    * Array de números que exibirão as horas no relógio.
//    */
//   clockHours!: number[];

//   /**
//    * @description
//    * Array de números que exibirão os minutos e os segundos no relógio.
//    */
//   /**
//    * @description
//    * Array de números que exibirão os minutos e os segundos no relógio.
//    */
//   clockMinutesSeconds!: number[];

//   /**
//    * @description
//    * Enum com tipos de tempo.
//    */
//   TypeTime = TYPE_TIME;

//   /**
//    * @description
//    * Tipo de tempo ativo (hora, minuto ou segundo).
//    */
//   timeTypeActive = TYPE_TIME.HOUR;

//   /**
//    * @description
//    * Tempo atual de referência.
//    */
//   now = new Date();

//   /**
//    * @description
//    * Data atualizada com hora que será retornada.
//    */
//   /**
//    * @description
//    * Data atualizada com hora que será retornada.
//    */
//   outputDatetime!: Date;

//   compare = compare;

//   constructor(
//     private overlay: Overlay,
//     private vc: ViewContainerRef,
//     private datePipe: DatePipe
//   ) { }

//   ngOnInit() {
//     this.updateCalendar();
//     this.defineClock();
//     this.defineInitialTime();
//     this.updateDatetime();
//   }

//   ngOnChanges(changes: SimpleChanges) {
//     const { date } = changes;
//     if (date) {
//       this.dateChanged(date);
//     }
//   }

//   get month() {
//     return this.datePipe.transform(this.date || this.defaultDate, 'MMMM');
//   }

//   formatWeek(date: Date) {
//     return weekDay(date);
//   }

//   onOpenSchedule(element: HTMLElement, scheduleTemplate: any) {
//     this.createOverlay(element, scheduleTemplate);
//     this.subscribeOnBackdropClick();
//     this.isDatetimeOpen = true;
//   }

//   get disablePreviousMonth() {
//     return compare(startOfMonth(this.date), this.min);
//   }

//   get disableNextMonth() {
//     return compare(this.max, endOfMonth(this.date));
//   }

//   onNextMonth() {
//     if (this.date) {
//       this._date = addMonths(this.date, 1);
//     } else {
//       this.defaultDate = addMonths(this.defaultDate, 1);
//     }
//     this.updateCalendar();
//     this.updateDatetime();
//   }

//   onPrevMonth() {
//     if (this.date) {
//       this._date = subMonths(this.date, 1);
//     } else {
//       this.defaultDate = subMonths(this.defaultDate, 1);
//     }
//     this.updateCalendar();
//     this.updateDatetime();
//   }

//   onDateSelected(date: Date) {
//     this._date = date;
//     this.updateDatetime();
//   }

//   /**
//    * @description
//    *
//    * Define o tipo de tempo que está ativo.
//    */
//   setTimeType(typeTime: TYPE_TIME) {
//     this.timeTypeActive = typeTime;
//   }

//   /**
//    * @description
//    *
//    * Atualiza a hora do componente.
//    */
//   updateHour(hour: number) {
//     this.hour = hour;

//     this.timeTypeActive = TYPE_TIME.MINUTE;

//     this.updateDatetime();
//   }

//   /**
//    * @description
//    *
//    * Atualiza o minuto do componente.
//    */
//   updateMinute(minute: number) {
//     this.minute = minute;

//     this.timeTypeActive = TYPE_TIME.SECOND;

//     this.updateDatetime();
//   }

//   /**
//    * @description
//    *
//    * Atualiza o segundo do componente.
//    */
//   updateSecond(second: number) {
//     this.second = second;

//     this.updateDatetime();
//   }

//   onAnimationDone(event: AnimationEvent) {
//     const { fromState, toState } = event;

//     if (fromState === 'open' && toState === 'close') {
//       this.overlayRef.dispose();
//       this.defaultDate = new Date();
//       this._date = this.previousDate;
//       this.hour = this.previousDate.getHours();
//       this.minute = this.previousDate.getMinutes();
//       this.second = this.previousDate.getSeconds();

//       this.updateCalendar();
//     }
//   }

//   confirm() {
//     this.previousDate = this.outputDatetime;
//     this.isDatetimeOpen = false;
//     this.change.emit(this.outputDatetime);
//   }

//   private updateCalendar() {
//     if (!this.date) {
//       this.defaultDate.setHours(0, 0, 0, 0);
//     }
//     this.today.setHours(0, 0, 0, 0);

//     this.weekDays = this.getWeek();
//     this.schedule = this.updateSchedule();
//   }

//   private getWeek(): Date[] {
//     return eachDayOfInterval({
//       start: startOfWeek(this.date ? this.date : this.defaultDate),
//       end: endOfWeek(this.date ? this.date : this.defaultDate)
//     });
//   }

//   private updateSchedule() {
//     const startMonth = startOfMonth(this.date ? this.date : this.defaultDate);
//     const endMonth = endOfMonth(this.date ? this.date : this.defaultDate);
//     const startDate = startOfWeek(startMonth);
//     const endDate = endOfWeek(endMonth);

//     return eachDayOfInterval({
//       start: startDate,
//       end: endDate,
//     });
//   }

//   private defineClock() {
//     this.clockHours = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];

//     const minutesAndSeconds = Array(45).fill(15).map((fixedNumber, index) => fixedNumber + index);
//     this.clockMinutesSeconds = minutesAndSeconds.concat(Array(15).fill(0).map((fixedNumber, index) => fixedNumber + index));
//   }

//   private defineInitialTime() {
//     const date = new Date();
//     if (typeof this.hour === 'undefined' || this.hour === null) {
//       this.hour = date.getHours();
//       this.defaultHour = this.hour;
//     }

//     if (typeof this.minute === 'undefined' || this.minute === null) {
//       this.minute = date.getMinutes();
//       this.defaultMinute = this.minute;
//     }

//     if (typeof this.second === 'undefined' || this.second === null) {
//       this.second = date.getSeconds();
//       this.defaultSecond = this.second;
//     }
//   }

//   /**
//    * @description
//    *
//    * Atualiza data que será emitida pelo componente.
//    */
//   private updateDatetime() {
//     this.outputDatetime = new Date(this.date);
//     this.outputDatetime.setHours(this.hour, this.minute, this.second);
//   }

//   private createOverlay(element: HTMLElement, scheduleTemplate: TemplateRef<any>) {
//     if (!this.templatePortal) this.templatePortal = new TemplatePortal(scheduleTemplate, this.vc);
//     const htmlElement = this.append ? this.append : element;

//     this.overlayRef = this.overlay.create({
//       panelClass: 'consorcio-datetime-overlay',
//       hasBackdrop: true,
//       backdropClass: 'consorcio-datetime-backdrop',
//       positionStrategy: this.getPositionStrategy(htmlElement),
//     });

//     this.overlayRef.attach(this.templatePortal);
//   }

//   private getPositionStrategy(element: ElementRef | HTMLElement) {
//     return this.overlay.position()
//       .flexibleConnectedTo(element)
//       .withPositions([
//         {
//           originX: 'start',
//           originY: 'bottom',
//           overlayX: 'start',
//           overlayY: 'top'
//         },
//         {
//           originX: 'start',
//           originY: 'top',
//           overlayX: 'start',
//           overlayY: 'bottom'
//         },
//         {
//           originX: 'end',
//           originY: 'bottom',
//           overlayX: 'end',
//           overlayY: 'top'
//         },
//         {
//           originX: 'end',
//           originY: 'top',
//           overlayX: 'end',
//           overlayY: 'bottom'
//         }
//       ]);
//   }

//   private subscribeOnBackdropClick() {
//     this.overlayRef.backdropClick().subscribe(() => {
//       this.isDatetimeOpen = false;
//     });
//   }

//   private dateChanged(date: SimpleChange) {
//     if (date.currentValue && date.currentValue !== date.previousValue) {
//       this.hour = date.currentValue.getHours();
//       this.minute = date.currentValue.getMinutes();
//       this.second = date.currentValue.getSeconds();

//       this.updateCalendar();
//       this.updateDatetime();
//       return;
//     }
//     if (!date.currentValue && date.currentValue !== date.previousValue) {
//       this.hour = this.defaultHour;
//       this.minute = this.defaultMinute;
//       this.second = this.defaultSecond;

//       this.updateCalendar();
//       this.updateDatetime();
//       return;
//     }
//   }
// }
