import { SortOrderEnum } from '../enum/sort-order.enum';

class ListResult<T> {
    content: Array<T>;
    firstPage?: boolean;
    lastPage?: boolean;
    limit?: number;
    numberOfElements?: number;
    offset?: number;
    totalElements?: number;
    totalPages?: number;
    constructor(content?: Array<T> | any) {
        this.content = content;
    }
}

class ListResultFilters {
    sortBy?: string;
    sortDirection?: number | SortOrderEnum;
    limit?: number;
    offset?: number;

    // padrão novo - passar esses dois ou limit/offset/sortDirection
    page?: number;
    size?: number;
}

export { ListResult, ListResultFilters };
