import { HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Injectable, Inject } from '@angular/core';
import { ConcatPipe } from '../../translate/pipe/concat.pipe';
import { Observable } from 'rxjs';
import { blobToJson, validateResponse } from '../helper/mensagens-erro.helper';
import { ErrorResponse } from '../model/error.model';
import * as _mimeTypes from 'mime';


const mimeTypes = _mimeTypes;

export class FileName {
  name!: string;
  nameArgs: Array<string> = [];
}

@Injectable({
  providedIn: 'root'
})
export class FileTransferService {

  constructor(
    @Inject('messageService')
    private messageService: any,
    @Inject('i18nService')
    private i18nService: any,
    @Inject(ConcatPipe) private concatPipe?: ConcatPipe | any,
  ) { }

  /**
   * makes request that returns and downloads a file (zip or pdf)
   * @param req request to get the file
   * @param filename
   * @param cdRef changeDetectorRef
   * @param callback function executed after downloading file
   */
  makeRequestAndDownload(req: Observable<HttpResponse<Blob>>, filename: string | FileName, cdRef?: ChangeDetectorRef, callback?: () => void) {
    req.subscribe(
      file => {
        this._downloadFile(file, filename);
        if (cdRef) cdRef.detectChanges();
        if (callback) callback();
      }, error => {
        blobToJson(error.error).then((jsonError: ErrorResponse | any) => {
          this.messageService.msgErro(validateResponse(jsonError));
        });
        if (cdRef) cdRef.detectChanges();
      });
  }

  private _downloadFile(response: HttpResponse<Blob | any>, name: string | FileName): any | void {
    let type = '';
    if (response.body.type == 'application/x-zip-compressed') {
      type = '.zip';
    } else {
      type = this._getType(response.body.type);
    }

    let strName = typeof (name) === 'string' ? name : name.name;
    strName = strName && strName.substring(strName.indexOf('=') + 1);

    this.i18nService.translate(strName || 'impressao.relatorio').subscribe((translatedName: any) => {
      if (typeof (name) === 'object' && name.nameArgs) {
        return translatedName = this.concatPipe.onlyConcat(translatedName, name.nameArgs) || null;
      }
      const namePDF = `${translatedName}.${type}`;
      const contentType = response.headers.get('content-type');
      const fileName = (namePDF);
      const blob = new Blob(response.body instanceof Array ? response.body : [response.body], { type: contentType || "" });
      const blobUrl = window.URL.createObjectURL(blob);

      if (window.navigator.msSaveOrOpenBlob) {
        return window.navigator.msSaveOrOpenBlob(blob, fileName);
      } else {
        const a = document.createElement('a');
        document.body.appendChild(a);

        a.href = blobUrl;
        a.download = fileName;
        a.target = '_self';
        a.click();
      }
    });
  }

  private _getType(type: string): any {
    return mimeTypes.getExtension(type);
  }

}
interface Navigator {
  msSaveOrOpenBlob: (blob: Blob) => void
}