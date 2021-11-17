
import { AbstractTableComponent } from '../abstract-table/abstract-table.component';

export abstract class AbstractCheckboxTableComponent<T
  extends { checked?: boolean, disabled?: boolean }> extends AbstractTableComponent<T> {

  selectedItens: Array<T> = new Array<T>();

  loadDataTable(page?: number) {
    this.offset = page != null ? page : this.offset;
    this._makeRequest();
  }

  reset() {
    if (this.dataSource.content) this.dataSource.content.forEach(item => item.checked = false);
    this.selectedItens = [];
  }

  private _makeRequest() {
    this.requestList(this.offset)
      .subscribe(list => {
        list.content.forEach(item => this._verifyCheckedOrDisabled(item));
        this.dataSource = list;
      });
  }

  private _verifyCheckedOrDisabled(item: T) {
    if (this.itemIsDisabled(item)) {
      item.disabled = item.checked = true;
      this.updateSelectedItens({ row: item, checked: true });
    } else {
      const index = this.findSelectedIndex(item);
      if (index > -1) {
        this.selectedItens[index] = item;
        item.checked = true;
      }
    }
  }

  public updateAllSelectedItens(checked: boolean) {
    this.selectedItens = checked ? Array.from(this.dataSource.content) : [];
  }

  public updateSelectedItens(event: { checked: boolean, row: T }) {
    event.checked ? this.selectedItens.push(event.row) :
      this.selectedItens.splice(this.findSelectedIndex(event.row), 1);
  }

  /**
   * overwrite method when certain @param item  of the list must be selected and disabled
   */
  protected itemIsDisabled(item: T): boolean { return false; }
  protected itemIsChecked(item: T): boolean { return this.findSelectedIndex(item) > -1; }

  private findSelectedIndex(item: T): number {
    return this.selectedItens.findIndex(selected => this.equals(selected, item));
  }
  protected abstract equals(item1: T, item2: T): boolean;
}
