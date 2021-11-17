import { ListResult } from '../../http/model/list-result.model';
import { Observable, Subject } from 'rxjs';
import { Autocomplete } from '../../form/model/autocomplete.model';
// import { FuncionalidadesEnum } from '../../tracker/enum/funcionalidades.enum';
import { TypeCellEnum } from '../enum/type-cell.enum';

class DisplayedColumn<T> {
    field?: string | ((row: T) => string | number);
    header?: string;
    class?: string;
    dynamicClass?: string | ((rowData: T) => string);
    type?: TypeCellEnum | ((row: T) => TypeCellEnum);
    inputConfig?: InputNumberOptions<T>;
    inputTextOptions?: InputTextOptions<T>;
    selectConfig?: SelectOptions<T>;
    autocompleteOptions?: AutocompleteOptions<T>;
    buttonConfig?: ButtonOptions<T>;
    /**
     * funcionalidade referente ao click da coluna
     */
    // functionality?: FuncionalidadesEnum;
    /**
     * descrição curta da ação na funcionalidade referente ao click da coluna
     */
    action?: string;
    onClick?: (rowData: T, index?: number, event?: any) => void;
    /**
     * @deprecated use onClick para passar a função do click
     */
    tdAction?: (rowData: T, index?: number, event?: any) => void;
    disabled?: ((rowData: T) => boolean) | boolean;
    menu?: {
        itens: Array<MenuOptions<T>>;
    };
    inputDateOptions?: InputDateOptions<T>;
}

class InputTextOptions<T> {
    maxLength!: number | ((row: T) => number);
}

class InputDateOptions<T> {
    required?: boolean;
    onBlur?: (value: any, rowData: T, index: number) => void;
    min?: Date;
    max?: Date;
}

class SelectOptions<T> {
    itens?: Array<Autocomplete>;
    compareWith?: (option: any, value: any) => boolean;
    disabled?: (rowData: T) => boolean;
    onSelectionChange?: (rowData: T, index: number) => void;
}

class AutocompleteOptions<T> {
    typeahead?: Subject<string>;
    search?: (pesquisa: string) => Observable<Array<Autocomplete> | ListResult<Autocomplete>>;
    required?: boolean;
    clearable?: boolean;
    showValueOnly?: boolean;
    bindWholeObject?: boolean;
    bindLabel?: string;
    bindValue?: string;
    allowDefaultValue?: boolean;
}

class InputNumberOptions<T> {
    required?: boolean;
    decimals?: number | ((row: T) => number);
    integers?: number | ((row: T) => number);
    onBlur?: (value: any, rowData: T, index: number) => void;
}

class ButtonOptions<T> {
    icon?: string;
    label?: string;
    type?: 'stroked' | 'raised';
    disabled?: (rowData: T) => boolean;
}

class MenuOptions<T> {
    text: string | undefined;
    // functionality?: FuncionalidadesEnum;
    action?: string;
    disabled?: (row: T) => boolean;
    click: ((row?: T, index?: number) => void) | undefined;
}

export { DisplayedColumn };
