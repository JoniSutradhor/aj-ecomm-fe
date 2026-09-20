import { ReactNode } from 'react';
import { Button } from '@mui/material';
import Dialog, { DialogProps } from 'components/Dialog';
import { ZeroArgsFunctionType } from 'types/functions';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    CONFIRM_BUTTON: 'confirm-ok-button',
    CANCEL_BUTTON: 'confirm-cancel-button',
};

export interface DialogConfirmProps extends Omit<DialogProps, 'actions'> {
    onClose: ZeroArgsFunctionType;
    onConfirm?: ZeroArgsFunctionType;
    closeLabel?: ReactNode;
    confirmLabel?: ReactNode;
    /** Red confirm button for destructive actions. */
    danger?: boolean;
    confirmDisabled?: boolean;
    /** Use `submit` together with `formId` to submit a form rendered in the dialog. */
    confirmType?: 'button' | 'submit';
    formId?: string;
}

const DialogConfirm = ({
    onClose,
    onConfirm,
    isSubmitting = false,
    closeLabel = 'Cancel',
    confirmLabel = 'OK',
    danger = false,
    confirmDisabled = false,
    confirmType = 'button',
    formId,
    children,
    ...props
}: DialogConfirmProps) => (
    <Dialog
        onClose={onClose}
        isSubmitting={isSubmitting}
        actions={
            <>
                <Button
                    data-testid={TESTIDS.CANCEL_BUTTON}
                    color="grey900"
                    onClick={onClose}
                    disabled={isSubmitting}
                >
                    {closeLabel}
                </Button>
                <Button
                    data-testid={TESTIDS.CONFIRM_BUTTON}
                    variant="contained"
                    color={danger ? 'error' : 'primary'}
                    type={confirmType}
                    form={formId}
                    onClick={confirmType === 'button' ? onConfirm : undefined}
                    disabled={confirmDisabled || isSubmitting}
                    loading={isSubmitting}
                >
                    {confirmLabel}
                </Button>
            </>
        }
        {...props}
    >
        {children}
    </Dialog>
);

export default addTestIds(DialogConfirm, TESTIDS);
