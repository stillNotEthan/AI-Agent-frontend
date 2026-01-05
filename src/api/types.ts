import type { ResponseType } from "axios";

export enum ResponseStatusCode {
    OPERATING_SUCCESSFULLY = "0000",
    EMPTY_CONTENT = "0001",
    NOTHING_CHANGED = "0002",
    OPERATING_FAILED = "2000",
    ILLEGAL_PARAMETERS = "2001",
    UNAUTHORIZED = "2002",
    FORBIDDEN = "2003",
    NOT_FOUND = "2004",
    METHOD_NOT_ALLOWED = "2005",
    REQUEST_TIMEOUT = "2006",
    SYSTEM_ERROR = "3000",
}

export interface IRequest {
    path: string;
    params?: unknown;
    responseType?: ResponseType;
    headers?: Record<string, string>;
    token?: string;
}

export interface IBodyRequest extends IRequest {
    data?: unknown;
}

export interface IFormDataRequest extends IRequest {
    data: FormData;
}

export interface IResponse<T = unknown> {
    category: string;
    code: ResponseStatusCode;
    message: string;
    data?: T;
}
