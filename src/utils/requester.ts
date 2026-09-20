import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from 'utils/config';
import ErrorWithStatus from 'utils/errorWithStatus';

let authToken: string | null = null;

const client = axios.create({
    baseURL: config.api_url,
    timeout: config.api_timeout,
});

client.interceptors.request.use((requestConfig) => {
    if (authToken) {
        requestConfig.headers.set('Authorization', `Bearer ${authToken}`);
    }
    return requestConfig;
});

export const handleResponse = <T>(
    promise: Promise<AxiosResponse<T>>
): Promise<T> =>
    promise
        .catch((error: AxiosError<{ message?: string }>) => {
            return Promise.reject(
                ErrorWithStatus(error?.response?.data?.message || error.message)
                    .status(error?.response?.status ?? 500)
                    .original(error)
            );
        })
        .then((response) => response.data);

export default class Requester {
    static setToken(token: string | null) {
        authToken = token;
    }

    static get<T = any>(path: string, params?: AxiosRequestConfig) {
        return handleResponse<T>(client.get(path, params));
    }

    static post<T = any>(
        path: string,
        data?: unknown,
        params?: AxiosRequestConfig
    ) {
        return handleResponse<T>(client.post(path, data, params));
    }

    static put<T = any>(
        path: string,
        data?: unknown,
        params?: AxiosRequestConfig
    ) {
        return handleResponse<T>(client.put(path, data, params));
    }

    static patch<T = any>(
        path: string,
        data?: unknown,
        params?: AxiosRequestConfig
    ) {
        return handleResponse<T>(client.patch(path, data, params));
    }

    static delete<T = any>(path: string, params?: AxiosRequestConfig) {
        return handleResponse<T>(client.delete(path, params));
    }
}
