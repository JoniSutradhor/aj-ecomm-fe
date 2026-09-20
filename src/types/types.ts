import { ChangeEvent } from 'react';

export type KeyValueObjectType<T = string> = Record<string, T>;

export type ChangeEventType = ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement
>;
