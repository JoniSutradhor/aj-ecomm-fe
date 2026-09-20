import { FormEventHandler, useId } from 'react';
import DialogConfirm, { DialogConfirmProps } from 'components/DialogConfirm';
import MessageCard from 'components/MessageCard';
import ProgressCard from 'components/ProgressCard';

export interface DialogFormProps extends Omit<
    DialogConfirmProps,
    'confirmType' | 'formId' | 'onConfirm' | 'onSubmit'
> {
    /** `handleSubmit` of the form hook. */
    onSubmit: FormEventHandler<HTMLFormElement>;
    /** Data of the form is loaded, shows a spinner until then. */
    isInitialized?: boolean;
    /** Load error, replaces the form. */
    error?: string;
}

/** Dialog around a form, the confirm button submits the form. */
const DialogForm = ({
    onSubmit,
    isInitialized = true,
    error,
    children,
    confirmDisabled = false,
    ...props
}: DialogFormProps) => {
    const formId = useId();

    let content = (
        <form id={formId} onSubmit={onSubmit} noValidate>
            {children}
        </form>
    );
    if (error) {
        content = <MessageCard error>{error}</MessageCard>;
    } else if (!isInitialized) {
        content = <ProgressCard />;
    }

    return (
        <DialogConfirm
            confirmType="submit"
            formId={formId}
            confirmDisabled={confirmDisabled || !isInitialized || !!error}
            {...props}
        >
            {content}
        </DialogConfirm>
    );
};

export default DialogForm;
