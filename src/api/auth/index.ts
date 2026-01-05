import { postReq, getReq, patchReq } from "..";
import { useAuthStore } from "@/store/authStore";
import {
    createAccountRequest,
    loginRequest,
    loginResponse,
    resetPasswordRequest
} from "./types";
import { IResponse } from "../types";

export const createAccountAPI = async (payload: createAccountRequest) => {
    const response = postReq<IResponse>({
        path: "/auth/register",
        data: { ...payload }
    })
    return response;
}

export const loginAPI = async (payload: loginRequest): Promise<loginResponse> => {
    const response = await postReq<loginResponse>({
        path: "/auth/login",
        data: { ...payload }
    })
    return response;
}

export const sendVCodeAPI = async (email: string) => {
    const reponse = getReq<IResponse>({
        path: "/auth/v-code",
        params: {
            email
        }
    })
    return reponse;
}

export const resetPasswordAPI = async (payload: resetPasswordRequest) => {
    const response = patchReq<IResponse>({
        path: "/auth/reset-password",
        data: { ...payload }
    })
    return response;
}