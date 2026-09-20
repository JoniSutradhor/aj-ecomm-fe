import { Box, BoxProps, CircularProgress } from '@mui/material';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    PROGRESS_CARD: 'progress-card',
};

const ProgressCard = ({ sx, ...props }: BoxProps) => (
    <Box
        data-testid={TESTIDS.PROGRESS_CARD}
        {...props}
        sx={{ textAlign: 'center', p: 4, ...sx }}
    >
        <CircularProgress color="primary" size={28} />
    </Box>
);

export default addTestIds(ProgressCard, TESTIDS);
