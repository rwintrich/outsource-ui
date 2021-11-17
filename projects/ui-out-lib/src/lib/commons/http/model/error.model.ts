import { HttpHeaders } from '@angular/common/http';

class ErrorResponse {
    error?: ErrorResponseDetail;
    headers?: HttpHeaders;
    message?: string;
    messages?: Array<string>;
    name?: string;
    ok?: boolean;
    status?: any;
    statusText?: string;
    url?: string;
    type?: string;
}

class ErrorResponseDetail {
    code?: string;
    messages?: Array<string>;
    additionalInfo?: object;
    size?: number;
    type?: string;
}

export { ErrorResponse, ErrorResponseDetail };
