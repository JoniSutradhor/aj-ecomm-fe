import { useEffect } from 'react';
import {
    OptionsObject,
    SnackbarMessage,
    SnackbarProvider,
    SnackbarProviderProps,
    useSnackbar,
    ProviderContext,
} from 'notistack';
import ErrorBoundary from 'components/ErrorBoundary';

let enqueueSnackbarFn: ProviderContext['enqueueSnackbar'];

const defaultOptions: OptionsObject = {
    anchorOrigin: { horizontal: 'center', vertical: 'top' },
    autoHideDuration: 3000,
};

const success = (message: SnackbarMessage, options: OptionsObject = {}) => {
    return enqueueSnackbarFn(message, {
        ...defaultOptions,
        ...options,
        variant: 'success',
    });
};

const error = (message: SnackbarMessage, options: OptionsObject = {}) => {
    return enqueueSnackbarFn(message, {
        ...defaultOptions,
        ...options,
        variant: 'error',
    });
};

export const toast = {
    success,
    error,
};

const ToasterContent = () => {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        enqueueSnackbarFn = enqueueSnackbar;
    }, [enqueueSnackbar]);

    return null;
};

export type ToasterProps = Omit<SnackbarProviderProps, 'children'>;

const Toaster = (props: ToasterProps) => (
    <ErrorBoundary>
        <SnackbarProvider maxSnack={3} {...props}>
            <ToasterContent />
        </SnackbarProvider>
    </ErrorBoundary>
);

export default Toaster;
