import { getAPIURL } from "@/lib/env";
import { AUTH_COOKIES_KEY, AUTH_STORAGE_KEY } from "@/store/authStore";
import axios from "axios";
import { deleteCookie } from "cookies-next";
import debounce from "debounce";
import { toast } from "sonner";
import {
    type IBodyRequest,
    type IFormDataRequest,
    type IRequest,
    ResponseStatusCode,
} from "./types";

const request = axios.create({
    baseURL: getAPIURL(),
});

console.log('API Base URL:', getAPIURL());
const errorToast = debounce((message: string) => {
    toast.error(message);
}, 300);

request.interceptors.response.use(
    (response) => {
        const { code, data, message } = response.data;

        if (
            [
                ResponseStatusCode.UNAUTHORIZED,
                ResponseStatusCode.FORBIDDEN,
            ].includes(code)
        ) {
            localStorage.removeItem(AUTH_STORAGE_KEY);
            deleteCookie(AUTH_COOKIES_KEY);
            window.location.href = "/login";
            return Promise.reject(response);
        }

        if (
            code !== ResponseStatusCode.OPERATING_SUCCESSFULLY &&
            !(response?.data instanceof Blob)
        ) {
            return Promise.resolve({
                ...response,
                data: {
                    code,
                    message: message || data,
                },
            });
        }
        return response;
    },
    (error) => {
        console.error('API Error Detail:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            data: error.response?.data,
            url: error.config?.url,
            baseURL: error.config?.baseURL,
        });

        const errorData = error.response?.data;
        errorToast(errorData?.message || error.message || "System error");

        const response = {
            status: 200,
            data: {
                code: errorData?.code || ResponseStatusCode.SYSTEM_ERROR,
                message: errorData?.message || error.message || "System error",
                data: {},
            },
        };

        return Promise.resolve(response);
    },
);

export const getReq = async <T>(req: IRequest) => {
    const { path, params, headers, token, responseType } = req;
    const response = await request.get<T>(path, {
        params,
        headers: getHeaders({ token, headers }),
        responseType: responseType || "json",
    });
    return response.data;
};

export const delReq = async <T>(req: IRequest) => {
    const { path, params, headers, token } = req;
    const response = await request.delete<T>(path, {
        params,
        headers: getHeaders({ token, headers }),
    });
    return response.data;
};

export const postReq = async <T>(req: IBodyRequest) => {
    const { path, data, params, headers, token } = req;
    console.log('Sending POST request to:', `${getAPIURL()}${path}`, 'with data:', data);
    const response = await request.post<T>(path, data, {
        params,
        headers: getHeaders({ token, headers }),
    });
    console.log('Received response from:', path, 'data:', response.data);
    return response.data;
};

export const putReq = async <T>(req: IBodyRequest) => {
    const { path, data, params, headers, token } = req;
    const response = await request.put<T>(path, data, {
        params,
        headers: getHeaders({ token, headers }),
    });
    return response.data;
};

export const patchReq = async <T>(req: IBodyRequest) => {
    const { path, data, params, headers, token } = req;
    const response = await request.patch<T>(path, data, {
        params,
        headers: getHeaders({ token, headers }),
    });
    return response.data;
};

export const formPostReq = async <T>(req: IFormDataRequest) => {
    const { path, data, params, headers, token } = req;
    const response = await request.post<T>(path, data, {
        params,
        headers: getHeaders({
            token,
            headers: { ...headers, "Content-Type": "multipart/form-data" },
        }),
    });
    return response.data;
};

const getHeaders = ({
    token,
    headers,
}: { token?: string; headers?: Record<string, string> }) => {
    return {
        ...(token && {
            Authorization: `Bearer ${token}`,
        }),
        ...headers,
    };
};
