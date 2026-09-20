import { ReactNode } from 'react';
import { Box, Button, Typography } from '@mui/material';
import InboxIcon from 'icons/InboxIcon';
import AddIcon from 'icons/AddIcon';
import { ZeroArgsFunctionType } from 'types/functions';
import { cssColor } from 'utils/colors';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    EMPTY_LIST: 'empty-list',
    EMPTY_LIST_BUTTON: 'empty-list-button',
};

export interface EmptyListProps {
    title?: ReactNode;
    text?: ReactNode;
    icon?: ReactNode;
    buttonLabel?: ReactNode;
    onClick?: ZeroArgsFunctionType;
}

const EmptyList = ({
    title = 'Nothing here yet',
    text,
    icon = <InboxIcon fontSize="large" />,
    buttonLabel,
    onClick,
}: EmptyListProps) => (
    <Box
        data-testid={TESTIDS.EMPTY_LIST}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            py: 8,
            px: 2,
        }}
    >
        <Box
            sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: cssColor('grey100'),
                color: cssColor('grey700'),
                mb: 2,
            }}
        >
            {icon}
        </Box>
        <Typography variant="h3" color="textPrimary">
            {title}
        </Typography>
        {text && (
            <Typography
                variant="text2"
                color="textSecondary"
                sx={{ mt: 0.5, maxWidth: 420 }}
            >
                {text}
            </Typography>
        )}
        {onClick && (
            <Button
                data-testid={TESTIDS.EMPTY_LIST_BUTTON}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onClick}
                sx={{ mt: 3 }}
            >
                {buttonLabel}
            </Button>
        )}
    </Box>
);

export default addTestIds(EmptyList, TESTIDS);
