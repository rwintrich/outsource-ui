import { Table } from 'primeng/table';
import { ObjectUtils } from 'primeng/utils/objectutils';
// import { isNullOrUndefined } from 'util';

// @dynamic
export class PtableFunctions {
  // DataTableExtensions

  private static isFunction = (obj: any) => !!(obj && obj.constructor && obj.call && obj.apply);

  // public static dtWrap(table: Table): Table {

  //   ObjectUtils.resolveFieldData = PtableFunctions.resolveFieldData;
  //   // table.resolveFieldData = PtableFunctions.resolveFieldData;
  //   table.fi = ObjectUtils.resolveFieldData;

  //   return table;
  // }

  public static getValue(col: any, data: any): string {
    const value = this.resolveFieldData(data, col.field);
    return (value === null || value === undefined ? '' : value.toString());
  }

  public static resolveFieldData(data: any, field: any): any {
    if (data && field) {
      if (PtableFunctions.isFunction(field)) {
        return field(data);
      } else if (field.indexOf('.') === -1) {
        return data[field];
      } else {
        const fields = field.split('.');
        let value = data;
        for (let i = 0, len = fields.length; i < len; ++i) {
          if (value == null) {
            return null;
          }
          value = value[fields[i]];
        }
        return value;
      }
    } else {
      return null;
    }
  }
}
