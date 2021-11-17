import { Component, EventEmitter } from '@angular/core';
import { SortOrderEnum } from '../../../http/enum/sort-order.enum';
import { PageChange } from '../../model/page-change.model';

@Component({
    selector: 'consorcio-grid-list',
    templateUrl: './grid-list.component.html',
    styleUrls: ['./grid-list.component.scss'],
    inputs: [
        'title', 'dataSource', 'cols', 'totalRecords', 'rows', 'label', 'paginator'
    ],
    outputs: [
        'selectedItem', 'pageChange', 'sortDirection'
    ]
})

export class GridListComponent {

    paginator = false;
    title!: string;
    cols = 3;
    dataSource = [];
    label!: string;
    direction = 1;

    page = 0;
    totalRecords!: number;
    rows!: number;

    selectedItem: EventEmitter<any> = new EventEmitter();
    pageChange: EventEmitter<PageChange> = new EventEmitter();
    sortDirection: EventEmitter<SortOrderEnum> = new EventEmitter();

    onSortDirection() {
        if (this.direction === 1) {
            this.direction = -1;
        } else {
            this.direction = 1;
        }
        if (this.dataSource.length > 0) {
            this.sortDirection.emit(this.direction);
        }
        else {
            alert('erro');
        }
    }

    onPageChange(value: PageChange | any) {
        this.page = value.page ? value.page : 0;
        if (this.dataSource.length > 0) {
            this.pageChange.emit(value);
        }
    }

    getTile(item: any) {
        this.selectedItem.emit(item);
    }

    getTileLabel(item: { [x: string]: any; }) {
        const label = this.label;
        return item[label];
    }
}
