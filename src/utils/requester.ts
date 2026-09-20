import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    isCancel,
} from 'axios';
import config from 'utils/config';
import ErrorWithStatus from 'utils/errorWithStatus';

let authToken: string | null = null;
let unauthorizedHandler: (() => void) | null = null;

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

const getErrorMessage = (
    error: AxiosError<{ message?: string | string[] }>
) => {
    const message = error?.response?.data?.message;
    // Validation errors come as a list of messages
    return (
        (Array.isArray(message) ? message.join(', ') : message) || error.message
    );
};

export const handleResponse = <T>(
    promise: Promise<AxiosResponse<T>>
): Promise<T> =>
    promise
        .catch((error: AxiosError<{ message?: string | string[] }>) => {
            // Aborted on purpose (filter changed, page left): keep the axios error so callers can use isCancel()
            if (isCancel(error)) {
                return Promise.reject(error);
            }
            // A session that expired or was revoked, only for requests that sent a token
            if (error?.response?.status === 401 && authToken) {
                unauthorizedHandler?.();
            }
            return Promise.reject(
                ErrorWithStatus(getErrorMessage(error))
                    .status(error?.response?.status ?? 500)
                    .original(error)
            );
        })
        .then((response) => response.data);

export default class Requester {
    static setToken(token: string | null) {
        authToken = token;
    }

    /** Called when the api rejects the current token, used to sign the user out. */
    static onUnauthorized(handler: (() => void) | null) {
        unauthorizedHandler = handler;
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
