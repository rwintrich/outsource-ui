import { HttpHeaders, HttpParams } from '@angular/common/http';

class HttpOptions {
    pathParams?: Array<string | number | any> = [];
    queryParams?: Map<string, string> | object;
    headers?: HttpHeaders;
    showErrorMessage?= true;
}
class DeleteOptions extends HttpOptions {
    body?: object;
}

class ParsedHttpOptions {
    header: HttpHeaders = new HttpHeaders;
    params?: HttpParams;
    body?: object;
}

export { HttpOptions, DeleteOptions, ParsedHttpOptions };
