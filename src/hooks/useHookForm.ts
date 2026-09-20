import { useEffect } from 'react';
import {
    DefaultValues,
    FieldValues,
    UseFormProps,
    useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type hookFormOptions<T extends FieldValues> = {
    schema: z.ZodType<T, T>;
    initialValues?: T;
    isInitialized?: boolean;
    ignoreReset?: boolean;
    onSubmit: (data: T) => void | Promise<void>;
} & UseFormProps<T>;

/**
 * react-hook-form + zod. Form values are strings for inputs, convert them to
 * the api types in `onSubmit`. The form is reset to `initialValues` once
 * `isInitialized` turns true (data loaded) and after a successful submit.
 */
const useHookForm = <V extends FieldValues>({
    schema,
    initialValues,
    isInitialized = false,
    ignoreReset = false,
    onSubmit,
    ...options
}: hookFormOptions<V>) => {
    const form = useForm<V>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: initialValues as DefaultValues<V>,
        ...options,
    });

    const { reset } = form;
    const { isSubmitSuccessful } = form.formState;

    useEffect(() => {
        if (initialValues && !ignoreReset) {
            reset(initialValues as DefaultValues<V>);
        }
        // Reset only when the data finished loading or after a save, not on every render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful, isInitialized, ignoreReset, reset]);

    return {
        ...form,
        handleSubmit: form.handleSubmit(onSubmit),
    };
};

export default useHookForm;
