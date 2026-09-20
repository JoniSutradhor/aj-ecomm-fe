import { format, parseISO } from 'date-fns';
import config from 'utils/config';

const currencyFormatter = new Intl.NumberFormat(config.default_language, {
    style: 'currency',
    currency: config.currency,
});

const numberFormatter = new Intl.NumberFormat(config.default_language);

export const formatCurrency = (value: number | null | undefined) =>
    currencyFormatter.format(value ?? 0);

export const formatNumber = (value: number | null | undefined) =>
    numberFormatter.format(value ?? 0);

export const formatDateTime = (value: string | null | undefined) =>
    value ? format(parseISO(value), 'dd MMM yyyy, HH:mm') : '';

export const formatDate = (value: string | null | undefined) =>
    value ? format(parseISO(value), 'dd MMM yyyy') : '';

/** "John Doe" -> "JD" */
export const getInitials = (fname = '', lname = '') =>
    `${fname.charAt(0)}${lname.charAt(0)}`.toUpperCase();
