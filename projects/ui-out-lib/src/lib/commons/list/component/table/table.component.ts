// import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { LazyLoadEvent } from 'primeng/api';
import { setProperty } from '../../../form/helper/object.helper';
import { SortOrderEnum } from '../../../http/enum/sort-order.enum';

import { DEFAULT_PAGE } from '../../config/table.config';
import { LightColorsEnum } from '../../enum/light-colors.enum';
import { TypeCellEnum } from '../../enum/type-cell.enum';
import { PtableFunctions } from '../../helper/p-table-complements';
import { DisplayedColumn } from '../../model/displayed-columns.model';

@Component({
  selector: 'consorcio-table',
  templateUrl: './table.component.html',
  // declare inputs here for aot build
  inputs: [
    'scrollable', 'lazyLoadInit', 'differentRowClasses', 'rowColors', 'compareRows', 'compareWithProperty', 'dataSource',
    'defaultPage', 'displayedColumns', 'length', 'paginator', 'actions', 'onlyRowAction', 'filtersIcon', 'buttonsActions',
    'filters', 'haveSortField', 'scrollHeight', 'isTotalizer', 'totalizer', 'sortFieldInput', 'checkBox', 'sortDirection', 'listSelect',
    'extraClassesTr', 'formGroup', 'downloadButton', 'viewButton', 'archiveTable', 'indexSelected', 'trackerPagesFunctionality',
    'trackerPagesAction', 'disableRows'
  ],
  // declare outputs here for aot build
  outputs: [
    'dataSourceChange', 'clickCheckBox', 'clickRow', 'clickViewButton',
    'clickDownloadButton', 'clickEdit', 'clickDelete', 'pageChange', 'changeSelect'
  ],

  styleUrls: ['./table.component.css'],
})
export class TableComponent {

  scrollable = true;
  lazyLoadInit = true;
  /**
   * true se as linhas da tabela tiverem classes diferentes conforme valor da linha
   */
  set differentRowClasses(value) {
    this._differentRowClasses = (!!value);
  }
  get differentRowClasses(): any {
    return this._differentRowClasses;
  }
  private _differentRowClasses = false;

  disableRows!: (row: any) => boolean;

  /**
   * cores a serem alternadas na tabela, por default (se differentRowClasses), azul e verde - usar cores dos toasts
   */
  rowColors: Array<LightColorsEnum | any[]> | any = [LightColorsEnum.BLUE, LightColorsEnum.GREEN, LightColorsEnum.ORANGE] || null;
  /**
   * função para comparar duas linhas
   */
  /**
   * função para comparar duas linhas
   */
  compareRows!: (row1: any, row2: any) => boolean;

  //dataSourceChange: EventEmitter<any> = new EventEmitter();

  // get dataSource(): Array<any> | any { return this._dataSource; }
  // set dataSource(val: Array<any> | any) {
  //   this._dataSource = val;
  //   if (val && val.length && this.differentRowClasses) {
  //     this.setRowColors(val);
  //   }
  //   this.indexSelected = null || 0;
  // }
  // _dataSource = [];

  dataSourceChange: EventEmitter<any> = new EventEmitter();

  get dataSource(): Array<any> { return this._dataSource; }
  set dataSource(val: Array<any> | any) {
    this._dataSource = val;
    if (val && val.length) {
      this.setRowColors(val);
    }
    this.indexSelected = null || 0;
  }
  _dataSource = [];

  /**
   * @deprecated passar lista de quaisquer selects na tabela pelo displayedColumns
   */
  listSelect = [];

  /**
   * @deprecated usar campo field na displayedColumn desse select
   * @param compareWithProperty String com nome do campo a ser comparado do objeto
   */
  /**
   * @deprecated usar campo field na displayedColumn desse select
   * @param compareWithProperty String com nome do campo a ser comparado do objeto
   */
  compareWithProperty!: string | any;

  defaultPage: number = DEFAULT_PAGE;
  displayedColumns!: Array<DisplayedColumn<any | number>>;

  /**
   * @param length tamanho total da lista
   */
  /**
   * @param length tamanho total da lista
   */
  length!: number | null;
  set paginator(value) {
    this._paginator = (!!value);
  }
  get paginator() {
    return this._paginator;
  }
  private _paginator = false;
  /**
   * @param actions esconder ou não os botões edit/delete
   *  também habilita a classe --click na linha
   * @deprecated use as displayed columns para adicionar botões
   */
  set actions(value) {
    this._actions = (!!value);
  }
  get actions() {
    return this._actions;
  }
  private _actions = false;
  /**
   * @param onlyRowAction habilita a classe --click na linha caso actions = false
   */
  set onlyRowAction(value) {
    this._onlyRowAction = (!!value);
  }
  get onlyRowAction() {
    return this._onlyRowAction;
  }
  private _onlyRowAction = false;
  /**
   * @param filtersIcon esconder ou não os icones de ordenação
   */
  filtersIcon = true;

  /**
   * @deprecated use the displayedColumns to set the buttons instead
   * @param buttonsAction pode ser passado os valores 'both', 'edit', 'delete'
   */
  buttonsActions = 'both';

  /**
   * @deprecated use the displayedColumns to set the buttons instead
   * @param archiveTable nome do icone download
   */
  set archiveTable(value) {
    this._archiveTable = (!!value);
  }
  get archiveTable() {
    return this._archiveTable;
  }
  private _archiveTable = false;

  /**
   * @deprecated use the displayedColumns to set the buttons instead
   * @param downloadButton nome do icone download
   */
  set downloadButton(value) {
    this._downloadButton = (!!value);
  }
  get downloadButton() {
    return this._downloadButton;
  }
  private _downloadButton = false;

  /**
   * @deprecated use the displayedColumns to set the buttons instead
   * @param viewButton nome do icone download
   */
  set viewButton(value) {
    this._viewButton = (!!value);
  }
  get viewButton() {
    return this._viewButton;
  }
  private _viewButton = false;
  /**
   * @param filters passar um array com os filtros a serem utilizados onde:
   * --field: campo que retorna do header da tabela
   * --return: valor a ser enviado para o back
   *  fields = [{ field: string, return: string }]
   */
  filters = [];

  haveSortField = true;

  scrollHeight: any;

  set isTotalizer(value) {
    this._isTotalizer = (!!value);
  }
  get isTotalizer() {
    return this._isTotalizer;
  }
  private _isTotalizer = false;

  _totalizer = [];

  get totalizer() { return this._totalizer; }
  set totalizer(value: any) {
    this._totalizer = value;
  }

  formGroup!: FormGroup;
  /**
   * @param sortFieldInput nome do campo que será feito a ordenação inicial
   */
  set sortFieldInput(value: string) {
    this._sortFieldInput = value;
    this.sortBy = this.getSortByColumn(value);
  }
  get sortFieldInput() {
    return this._sortFieldInput;
  }
  private _sortFieldInput!: string;

  private colCheck!: DisplayedColumn<any> | null;
  set checkBox(value: string) {
    this.checkBoxAll = false;
    this._checkBox = value;
    if (value) {
      if (this.colCheck) {
        this.displayedColumns.unshift(this.colCheck);
      }
    } else {
      if (this.colCheck == null) {
        this.colCheck = this.displayedColumns.filter((item: DisplayedColumn<object>) => item.type === TypeCellEnum.CHECKBOX)[0];
      }
      this.displayedColumns = this.displayedColumns.filter((item: DisplayedColumn<object>) => item.type !== TypeCellEnum.CHECKBOX);
    }
  }
  get checkBox() {
    return this._checkBox;
  }
  private _checkBox!: string;

  /**
   * @param clickCheckBox emite um evento com objeto do check clicado
   */
  clickCheckBox: EventEmitter<any> = new EventEmitter<any>();

  /**
   * @param clickCheckAll emite um evento quando checkAll foi clicado
   */
  clickCheckAll: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * @param clickRow emite um evento com objeto da linha clicada
   */
  clickRow: EventEmitter<any> = new EventEmitter<any>();
  /**
   * @deprecated use the displayedColumns to set the buttons instead
   * @param clickDownloadButton emite um evento com objeto da linha quando apertar no icone Download
   */
  clickDownloadButton: EventEmitter<any> = new EventEmitter<any>();
  /**
   * @deprecated use the displayedColumns to set the buttons instead
   * @param clickViewButton emite um evento com objeto da linha quando apertar no icone View
   */
  clickViewButton: EventEmitter<any> = new EventEmitter<any>();
  /**
   * @deprecated use the displayedColumns to set the buttons instead
   * @param clickEdit emite um evento com objeto da linha quando apertar no icone edit
   */
  clickEdit: EventEmitter<any> = new EventEmitter<any>();
  /**
   * @deprecated use the displayedColumns to set the buttons instead
   * @param clickDelete emite um evento com objeto da linha quando apertar no icone delete
   */
  clickDelete: EventEmitter<any> = new EventEmitter<any>();
  /**
   * @param pageChange emite um evento passando um objeto com o sortBy, sortDirection e page
   * quando for selecionado a ordenação ou alterado a página
   */
  pageChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * @deprecated usar displayedColumn para configurar o select (onSelectionChange para este evento)
   */
  changeSelect: EventEmitter<any> = new EventEmitter<any>();

  _tableFunctions = PtableFunctions;

  sortBy = '';
  sortDirection: SortOrderEnum = SortOrderEnum.ASC;

  indexSelected!: number;
  indexesSelected = new Array<number>();
  checkBoxAll!: boolean;
  typeCellEnum = TypeCellEnum;

  /**
   * Funcionalidade atrelada ao (re)carregamento da lista
   */
  // trackerPagesFunctionality: FuncionalidadesEnum;

  /**
   * Ação atrelada ao (re)carregamento da lista, 'Trocando página da lista' por padrão,
   *  passar específica caso funcionalidade tenha mais de uma tabela
   */
  trackerPagesAction = 'Trocando página da lista';

  /**
   * lambda function to determine if a personalized class is to be added in specific rows
   */
  extraClassesTr: (rowData: object | null) => { [key: string]: boolean } = (_) => ({});

  get numberOfColumns() {
    return this.displayedColumns && this.displayedColumns.length + (this.actions ? 2 : 0);
  }

  constructor() { }

  private setRowColors(dataSource: Array<any>) {
    let contador = 0;
    dataSource[0].rowColor = contador;

    for (let i = 1; i < dataSource.length; i++) {
      const changeColor = this.compareRows ? !this.compareRows(dataSource[i - 1], dataSource[i]) : true;
      dataSource[i].rowColor = changeColor ? ++contador : contador;
    }
  }

  /**
   * adiciona classe --click nas linhas clicáveis e aplica classe de cor quando rowData tiver o campo rowColor
   */
  classesLinha(rowData: object | any, index: number | any) {
    const retorno = [{
      ...this.extraClassesTr(rowData),
      '--click': this.onlyRowAction || (this.actions && (this.buttonsActions === 'both' || this.buttonsActions === 'edit'))
        || typeof this.clickRow === 'function' || null,
      // tslint:disable-next-line: max-line-length
      '--row-selected': this.onlyRowAction && !this.differentRowClasses ? index === this.indexSelected : rowData && rowData.checked,
      '--b-xs': this.checkBox ? rowData && rowData.checked : index === this.indexSelected && this.differentRowClasses && this.onlyRowAction,
      '--disabled': this._disableRow(rowData)
    }];
    // var dado = retorno[this.rowColors[rowData.rowColor % this.rowColors.length]];

    retorno[this.rowColors[rowData.rowColor % this.rowColors.length]] = this.differentRowClasses;


    return retorno;
  }

  private _disableRow(rowData: any): boolean | any {
    return typeof this.disableRows === 'function' ? this.disableRows(rowData) : false || null;
  }

  onClickRow(row: any, index: number, event: { stopPropagation: () => void; }) {
    event.stopPropagation();

    if ((this.onlyRowAction || this.buttonsActions === 'both' || this.buttonsActions === 'edit') && !this._disableRow(row)) {
      this.indexSelected = index;

      this.clickRow.emit(row);
    }

  }

  onClickButton(col: DisplayedColumn<object> | any, rowData: object | any, index: number | undefined | any, event: { stopPropagation: () => void; } | any) {
    event.stopPropagation();
    col.onClick ? col.onClick(rowData, index, event) : col.tdAction(rowData, index, event);

  }

  onClickTd(col: DisplayedColumn<object>, row: object, index: number, event: { stopPropagation: () => void; }) {
    event.stopPropagation();
    if (typeof col.onClick === 'function') {
      col.onClick(row, index, event);
    } else if (typeof col.tdAction === 'function') {
      col.tdAction(row);
    }
  }

  onClickDownloadButton(row: any, index: number, event: { stopPropagation: () => void; }) {
    event.stopPropagation();

    row.index = index;

    this.clickDownloadButton.emit(row);
  }

  onClickViewButton(row: any, index: number, event: { stopPropagation: () => void; }) {
    event.stopPropagation();

    row.index = index;

    this.clickViewButton.emit(row);
  }

  onClickEdit(row: any, index: number, event: { stopPropagation: () => void; }) {
    event.stopPropagation();

    row.index = index;

    this.clickEdit.emit(row);
  }

  onClickDelete(row: any, index: number, event: { stopPropagation: () => void; }) {
    event.stopPropagation();

    row.index = index;

    this.clickDelete.emit(row);
  }

  onLazyLoad(event: LazyLoadEvent | any) {
    this.sortBy = this.getSortByColumn(event.sortField);
    this.sortDirection = (event.sortOrder) ? event.sortOrder : SortOrderEnum.ASC;
    this.onPageChange(0);
  }

  trackAndChangePage(page: number) {
    // if (this.trackerPagesFunctionality) {
    //   const additionalInfo = {
    //     page,
    //     sortBy: this.sortBy,
    //     sortDirection: this.sortDirection
    //   };
    //   const action = this.trackerPagesAction;
    //   this._trackerService.saveTrackerLog(this.trackerPagesFunctionality, { action, additionalInfo }).subscribe();
    // }
    this.onPageChange(page);
  }

  onPageChange(aPage: number) {
    const body = {
      page: aPage,
      sortBy: this.sortBy || '',
      sortDirection: this.sortDirection
    };
    this.pageChange.emit(body);
  }

  getSortByColumn(sortField: string | any): string {
    const sortFilter = this.filters && this.filters.find((filter: any) => {
      if (sortField && sortField.toString().includes(filter.field)) {
        return filter.return;
      }
    }) || '';
    return sortFilter;
  }

  checkAll(event: MatCheckboxChange, field = 'checked') {
    this.dataSource.forEach((row: any, index: any) => {
      // tslint:disable-next-line: triple-equals
      if (row.checked != event.checked && !row.disabled) { this.clickCheckbox(event, row, field, index, false); }
    });
    this.clickCheckAll.emit(event.checked);
  }

  clickCheckbox(event: MatCheckboxChange, row: object | any, field: string, index: number, verifyCheckAll = true) {
    row[field || 'checked'] = event.checked;
    this.indexSelected = index;
    this.clickCheckBox.emit({ row, index, checked: event.checked });
    if (verifyCheckAll) this.checkBoxAll = this.dataSource.every((item: any) => item.checked);
  }

  display() {
    return this._totalizer.length > 0 ? 'inherit' : 'none';
  }

  getClass(dynamicClass: any, colClass: string, rowData: any) {
    if (!dynamicClass) {
      return colClass;
    } else if (typeof dynamicClass === 'string') {
      return `${dynamicClass} ${colClass}`;
    } else {
      return `${dynamicClass(rowData)} ${colClass}`;
    }
  }

  onInputBlur(value: number | any, col: DisplayedColumn<object> | any, rowData: object | any, index: number | any) {
    if (col.functionality) {
      // this._trackerService.saveTrackerLog(col.functionality, { action: col.action, additionalInfo: rowData }).subscribe();
    }
    if (col.inputConfig && typeof col.inputConfig.onBlur === 'function') {
      col.inputConfig.onBlur(value, rowData, index);
    }
  }

  getDecimals<T>(col: DisplayedColumn<T>, row: T) {
    if (!col.inputConfig) return undefined;
    if (typeof col.inputConfig.decimals === 'function') return col.inputConfig.decimals(row);
    return col.inputConfig.decimals;
  }

  getIntegers<T>(col: DisplayedColumn<T>, row: T) {
    if (!col.inputConfig) return undefined;
    if (typeof col.inputConfig.integers === 'function') return col.inputConfig.integers(row);
    return col.inputConfig.integers;
  }

  getMaxLength<T>(col: DisplayedColumn<T>, row: T): any {
    if (!col.inputTextOptions) return undefined;
    if (typeof col.inputTextOptions.maxLength === 'function') return col.inputTextOptions.maxLength(row);
    return col.inputTextOptions.maxLength;
  }

  setSelect(row: object | any, value: any, col: DisplayedColumn<object> | any, index: number) {
    if (col.selectConfig && col.selectConfig.itens) return this._setSelect(row, value, col, index);
    console.warn('evitar input listSelect, usar displayedColumns para configurar o mat-select');
    // if (col.functionality) {
    //   this._trackerService.saveTrackerLog(col.functionality, { action: col.action, additionalInfo: { row, item: value } }).subscribe();
    // }
    row[this.compareWithProperty] = value;
    if (col.selectConfig && typeof col.selectConfig.onSelectionChange === 'function') col.selectConfig.onSelectionChange(row, index);
    this.changeSelect.emit(row);
    this.dataSourceChange.emit(this.dataSource);
  }

  private _setSelect<T>(row: T, value: any, col: DisplayedColumn<T>, index: number) {
    // if (col.functionality) {
    //   this._trackerService.saveTrackerLog(col.functionality, { action: col.action, additionalInfo: { row, item: value } }).subscribe();
    // }
    if (typeof (col.field) === 'string') setProperty(row, col.field, value);
    if (col.selectConfig && typeof col.selectConfig.onSelectionChange === 'function') col.selectConfig.onSelectionChange(row, index);
  }

  compareWith = (o1: any, o2: any) => {
    return o2 === undefined ? true : o1 === o2[this.compareWithProperty];
  }

  getType(col: DisplayedColumn<any>, row: any) {
    return typeof (col.type) === 'function' ? col.type(row) : (col.type || TypeCellEnum.TEXT);
  }

  isDisabled(col: DisplayedColumn<any>, row: any): undefined | boolean | any {
    return (typeof col.disabled === 'function') ? col.disabled(row) : col.disabled || !!col.disabled;
  }

  columnHasCheckbox(col: DisplayedColumn<any> | any) {
    return col.type === TypeCellEnum.CHECKBOX
      || (this.dataSource && this.dataSource.some((row: any) => this.getType(col, row) === TypeCellEnum.CHECKBOX));
  }
}

