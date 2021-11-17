
import { Observable } from 'rxjs';
import { ListResult } from '../../../http/model/list-result.model';
import { DisplayedColumn } from '../../model/displayed-columns.model';

export abstract class AbstractTableComponent<T> {

    protected offset = 0;

    dataSource: ListResult<T> = new ListResult<T>();

    abstract sortBy: string;
    abstract displayedColumns: Array<DisplayedColumn<T>>;

    abstract get requestList(): (page: number) => Observable<ListResult<T>>;

    public loadDataTable(page: number) {
        this.offset = page != null ? page : this.offset;
        this.requestList(page)
            .subscribe(list => this.dataSource = list);
    }
}
