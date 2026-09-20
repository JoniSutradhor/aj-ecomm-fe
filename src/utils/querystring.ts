import { KeyValueObjectType } from 'types/types';

export const queryStringParse = (str: string): KeyValueObjectType =>
    Object.fromEntries(new URLSearchParams(str).entries());

/** Skips empty values so cleared filters disappear from the url. */
export const queryStringStringify = (
    obj: Record<string, string | number | boolean | null | undefined> = {}
): string => {
    const params = new URLSearchParams();
    Object.entries(obj).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            params.set(key, String(value));
        }
    });
    return params.toString();
};
