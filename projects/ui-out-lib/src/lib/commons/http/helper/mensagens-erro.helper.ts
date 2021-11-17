import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorResponse } from '../model/error.model';

function errorStatusIsKnown(response: any) {
    const knownErrors = {
        401: 'validacoes.erro401'
    } || null;
    // return knownErrors[response?.status];
}

function concatMessages(response: ErrorResponse) {
    const messages = response.error ? response.error.messages : response.messages;
    return messages instanceof Array ?
        messages.join(', ') :
        messages;
}

function checkTypeError(response: ErrorResponse): any {
    if (response && response.type === 'error') return 'validacoes.falhaConexao';
}

export function validateResponse(response: ErrorResponse): string {
    // const errorMessage = errorStatusIsKnown(response:) || concatMessages(response) || checkTypeError(response);

    return "";
    // return errorMessage;
}

export function blobToJson(blob: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event: any) => {
            resolve(JSON.parse(event.target.result));
        };

        reader.onerror = reject;

        reader.readAsText(blob);
    });
}

// TODO: tipar MessageService quando frame estiver modularizado ou quando for inevitável como dependência dessa lib
export function makeRequestCheckingErrors<T>(request: Observable<T>, messageService: { msgErro: (arg0: string) => void; }) {
    return request.pipe(
        catchError(
            error => {
                if (error.error instanceof Blob) {
                    blobToJson(error.error).then((jsonError: ErrorResponse | any) =>
                        messageService.msgErro(validateResponse(jsonError)));
                } else {
                    messageService.msgErro(validateResponse(error));
                }
                throw error;
            }
        )
    );
}
