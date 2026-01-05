import { IResponse } from "../types";

export interface AccountData {
    name: string;
    email: string;
    token: string;
}

export interface createAccountRequest {
    name: string;
    email: string;
    password: string;
}

export interface loginRequest {
    email: string;
    password: string;
}

export interface loginResponse extends IResponse {
    data: {
        name: string;
        email: string;
        access_token: string;
    }
}

export interface resetPasswordRequest {
    email: string;
    vCode: string;
    newPwd: string;
}