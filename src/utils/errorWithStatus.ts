/**
 * Error with status code
 */

export type ErrorWithStatus = Error & {
    original: (original: unknown) => ErrorWithStatus;
    status: (code: number) => ErrorWithStatus;
    statusCode: number;
    originalError: unknown;
};

const ErrorWithStatus = (message?: string): ErrorWithStatus => {
    const error = new Error(message) as ErrorWithStatus;

    error.statusCode = 500;
    error.status = (code: number) => {
        if (!/^[12345]{1}\d{2}$/.test(String(code))) {
            throw new Error(`Invalid status code ${code}`);
        }
        error.statusCode = code;
        return error;
    };
    error.originalError = null;
    error.original = (original: unknown) => {
        error.originalError = original;
        return error;
    };

    error.toString = () => {
        return error.message;
    };

    return error;
};

export default ErrorWithStatus;
