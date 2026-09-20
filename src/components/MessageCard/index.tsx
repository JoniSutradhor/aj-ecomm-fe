import { ReactNode } from 'react';
import { Alert, AlertProps } from '@mui/material';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    MESSAGE_CARD: 'message-card',
};

export interface MessageCardProps extends Omit<AlertProps, 'severity'> {
    error?: boolean;
    children?: ReactNode;
}

const MessageCard = ({
    error = false,
    children,
    ...props
}: MessageCardProps) => (
    <Alert
        data-testid={TESTIDS.MESSAGE_CARD}
        severity={error ? 'error' : 'info'}
        {...props}
    >
        {children}
    </Alert>
);

export default addTestIds(MessageCard, TESTIDS);
