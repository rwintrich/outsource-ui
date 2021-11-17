export class KeyValuePair {
    key?: string | number;
    value?: string | number;
    constructor(key: string | number, value: string | number) {
        if (key) this.key = key;
        if (value) this.value = value;
    }
}
