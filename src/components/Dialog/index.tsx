import { ReactNode } from 'react';
import {
    Dialog as MuiDialog,
    DialogActions,
    DialogContent,
    DialogProps as MuiDialogProps,
    DialogTitle,
    IconButton,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import CloseIcon from 'icons/CloseIcon';
import { ZeroArgsFunctionType } from 'types/functions';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    CLOSE_BUTTON: 'dialog-close-button',
};

export interface DialogProps extends Omit<MuiDialogProps, 'title' | 'onClose'> {
    title?: ReactNode;
    actions?: ReactNode;
    /** Closing is blocked while submitting. */
    isSubmitting?: boolean;
    onClose?: ZeroArgsFunctionType;
}

const Dialog = ({
    title,
    actions,
    children,
    isSubmitting = false,
    onClose,
    maxWidth = 'sm',
    ...props
}: DialogProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <MuiDialog
            fullWidth
            maxWidth={maxWidth}
            fullScreen={fullScreen}
            onClose={isSubmitting ? undefined : onClose}
            {...props}
        >
            {title && (
                <DialogTitle
                    component="div"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: 18,
                        fontWeight: 700,
                        pr: 1.5,
                    }}
                >
                    {title}
                    {onClose && (
                        <IconButton
                            data-testid={TESTIDS.CLOSE_BUTTON}
                            aria-label="Close"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                </DialogTitle>
            )}
            <DialogContent dividers>{children}</DialogContent>
            {actions && <DialogActions sx={{ p: 2 }}>{actions}</DialogActions>}
        </MuiDialog>
    );
};

export default addTestIds(Dialog, TESTIDS);
