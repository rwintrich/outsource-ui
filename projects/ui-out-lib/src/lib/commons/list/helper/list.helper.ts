function hasDuplicates(dataSource: Array<object>, idField: any) {
    return dataSource.filter((item: any, index) => dataSource.findIndex(
        (obj: any) => obj[idField] === item[idField]) !== index).length;
}

export { hasDuplicates };
