import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { formatDate } from '../../dates/helper/date.helper';
import { SortOrderEnum } from '../enum/sort-order.enum';
import { makeRequestCheckingErrors } from '../helper/mensagens-erro.helper';
import { DeleteOptions, HttpOptions, ParsedHttpOptions } from '../model/base-service.model';

export class BaseService<UrlsEnum> {

  private apiURl: string;

  // TODO: tipar MessageService quando frame estiver modularizado ou quando for inevitável como dependência dessa lib
  constructor(private http: HttpClient, @Inject('apiUrl') apiUrl: string, @Inject('messageService') private messageService: any) {
    this.apiURl = apiUrl;
  }

  get<T>(url: UrlsEnum, httpOptions = new HttpOptions()) {
    const parsedUrl = this._buildUrl(httpOptions.pathParams, url);
    const options = this._buildOptions(httpOptions);

    return this._makeRequest<T>(this.http.get(parsedUrl, options) as Observable<T>, httpOptions.showErrorMessage);
  }

  post<T>(url: UrlsEnum, body: object, httpOptions = new HttpOptions()) {
    const parsedUrl = this._buildUrl(httpOptions.pathParams, url);
    const options = this._buildOptions(httpOptions);

    return this._makeRequest<T>(this.http.post(parsedUrl, body, options) as Observable<T>, httpOptions.showErrorMessage);
  }

  put<T>(url: UrlsEnum, body: object, httpOptions = new HttpOptions()) {
    const parsedUrl = this._buildUrl(httpOptions.pathParams, url);
    const options = this._buildOptions(httpOptions);

    return this._makeRequest<T>(this.http.put(parsedUrl, body, options) as Observable<T>, httpOptions.showErrorMessage);
  }

  delete<T>(url: UrlsEnum, httpOptions = new DeleteOptions()) {
    const parsedUrl = this._buildUrl(httpOptions.pathParams, url);
    const options = this._buildOptions(httpOptions);

    return this._makeRequest<T>(this.http.delete(parsedUrl, options) as Observable<T>, httpOptions.showErrorMessage);
  }

  getPdf(url: UrlsEnum, httpOptions = new HttpOptions()): Observable<HttpResponse<Blob>> {
    const parsedUrl = this._buildUrl(httpOptions.pathParams, url);
    const options = this._buildOptionsPdf(httpOptions.queryParams as Map<string, string>);
    const req = this.http.get(parsedUrl, options) as Observable<HttpResponse<Blob>>;

    return this._makeRequest<HttpResponse<Blob>>(req, httpOptions.showErrorMessage);
  }

  postPdf(url: UrlsEnum, body: object, httpOptions = new HttpOptions()): Observable<HttpResponse<Blob>> {
    const parsedUrl = this._buildUrl(httpOptions.pathParams, url);
    const options = this._buildOptionsPdf(httpOptions.queryParams as Map<string, string>);
    const req = this.http.post(parsedUrl, body, options) as Observable<HttpResponse<Blob>>;

    return this._makeRequest<HttpResponse<Blob>>(req, httpOptions.showErrorMessage);
  }

  getBoolean(url: UrlsEnum, httpOptions = new HttpOptions()) {
    const parsedUrl = this._buildUrl(httpOptions.pathParams, url);
    const req = this.http.get(parsedUrl, {
      responseType: 'text',
      params: this._buildHttpParams(httpOptions.queryParams as Map<string, string>)
    }).pipe(
      map((data: string) => data.toLowerCase() === 'true')
    );
    return this._makeRequest<boolean>(req, httpOptions.showErrorMessage);
  }

  patch<T>(url: UrlsEnum, body: object, httpOptions = new HttpOptions()) {
    const parsedUrl = this._buildUrl(httpOptions.pathParams, url);
    const req = this.http.patch(parsedUrl, body);

    return this._makeRequest<T>(req as Observable<T>, httpOptions.showErrorMessage);
  }

  private _filtrosToParams(params: any): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    if (params.sortDirection) {
      params.sortDirection = params.sortBy ? (params.sortDirection === SortOrderEnum.ASC ? 'ASC' : 'DESC') : null;
    }
    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key] != null && params[key] !== '') {
        httpParams = httpParams.append(key, params[key] instanceof Date ? formatDate(params[key], true) : params[key]); //
      }
    }
    return httpParams;
  }

  private _buildHttpParams(mapParams: Map<string, string> | object | any): HttpParams | any {

    if (!mapParams) { return null; }

    let params: HttpParams = new HttpParams();

    mapParams instanceof Map ?
      mapParams.forEach((value: string, key: string) => {
        params = params.append(key, value);
      }) :
      params = this._filtrosToParams(mapParams);

    return params;
  }

  private _buildUrl(pathParams: Array<string | number | any> | any, baseServiceURL: UrlsEnum | any): string | any {
    return (pathParams != null && pathParams.length > 0) ?
      this.apiURl.concat(this._buildPathParams(baseServiceURL, pathParams)) :
      this.apiURl.concat(baseServiceURL.toString());
  }

  private _buildPathParams(url: UrlsEnum | any, pathParams: Array<string | number | any>) {
    let parsedUrl: string = url.toString();
    const regex = /\{(.*?)\}/;

    pathParams.forEach(value => {
      const matched = regex.exec(parsedUrl);
      if (matched) {
        parsedUrl = parsedUrl.replace(matched[0], value.toString());
      }
    });
    return parsedUrl;
  }

  private _buildOptions(httpOptions: HttpOptions | DeleteOptions | any) {
    const options: ParsedHttpOptions = {
      header: httpOptions.headers,
      params: this._buildHttpParams(httpOptions.queryParams)
    };
    const deleteOptions = httpOptions as DeleteOptions;
    if (deleteOptions && deleteOptions.body) { options.body = deleteOptions.body; }
    return options;
  }

  private _buildOptionsPdf(params: Map<string, string>) {
    return {
      observe: 'response' as 'response',
      responseType: 'blob' as 'json',
      params: this._buildHttpParams(params)
    };
  }

  private _makeRequest<T>(request: Observable<T>, showErrorMessage = true) {
    return showErrorMessage ? makeRequestCheckingErrors<T>(request, this.messageService) : request;
  }

}
