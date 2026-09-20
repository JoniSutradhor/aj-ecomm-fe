import { z } from 'zod';

/**
 * Zod helpers for forms. Inputs hold strings, so the number helpers validate
 * a string and the form converts it with `Number(...)` on submit.
 */
export const zRequiredText = () => 'This field is required';

export const zRequired = () => z.string().trim().min(1, zRequiredText());

export const zRequiredMax = (max: number) =>
    zRequired().max(max, `Maximum ${max} characters`);

export const zOptionalMax = (max: number) =>
    z.string().trim().max(max, `Maximum ${max} characters`);

export const zValidEmail = () =>
    z
        .string()
        .trim()
        .min(1, zRequiredText())
        .pipe(z.email('Enter a valid email address'));

/** Money with at most 2 decimals, e.g. `12` or `12.50`. */
const PRICE_REGEXP = /^\d+(\.\d{1,2})?$/;

export const zPrice = () =>
    zRequired().regex(PRICE_REGEXP, 'Enter a valid price, e.g. 19.99');

export const zOptionalPrice = () =>
    z
        .string()
        .trim()
        .refine(
            (value) => value === '' || PRICE_REGEXP.test(value),
            'Enter a valid price, e.g. 19.99'
        );

/** Whole number >= `min`. */
export const zInteger = (min = 0) =>
    zRequired().refine(
        (value) => /^\d+$/.test(value) && Number(value) >= min,
        min === 0
            ? 'Enter a whole number, 0 or more'
            : `Enter a whole number, ${min} or more`
    );

export const zOptionalInteger = (min = 0) =>
    z
        .string()
        .trim()
        .refine(
            (value) =>
                value === '' || (/^\d+$/.test(value) && Number(value) >= min),
            `Enter a whole number, ${min} or more`
        );

/** Empty or an http(s) link. */
export const zOptionalUrl = () =>
    z
        .string()
        .trim()
        .refine(
            (value) => value === '' || /^https?:\/\/\S+$/i.test(value),
            'Enter a valid link starting with http:// or https://'
        );
