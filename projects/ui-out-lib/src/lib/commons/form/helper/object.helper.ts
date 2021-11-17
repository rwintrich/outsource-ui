
/**
 * returns true if @param object has any property null or undefined
 */
function hasEmptyProperty(object: any) {
    for (const key in object) {
        if (object.hasOwnProperty(key) && object[key] == null) {
            return true;
        }
    }
    return !object;
}

/**
 * returns true if all @param object properties are null or undefined
 */
function isEmpty(object: any) {
    for (const key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
            return false;
        }
    }
    return true;
}

function accessProperty(obj: any, prop: string): any {
    if (!obj || !prop) return null;
    const splitted = prop.split('.');
    if (splitted.length === 1) return obj[prop];
    return accessProperty(obj[splitted[0]], splitted[1]);
}

function setProperty(obj: any, prop: string, value: any): void | any {
    if (!obj || !prop) return null;
    const splitted = prop.split('.');
    if (splitted.length === 1) { obj[prop] = value; return; }
    if (!obj[splitted[0]]) obj[splitted[0]] = {};
    setProperty(obj[splitted[0]], splitted[1], value);
}

export { hasEmptyProperty, isEmpty, accessProperty, setProperty };
