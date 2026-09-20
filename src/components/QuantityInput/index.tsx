import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from 'icons/AddIcon';
import RemoveIcon from 'icons/RemoveIcon';
import { cssColor } from 'utils/colors';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    DECREASE: 'quantity-decrease',
    INCREASE: 'quantity-increase',
    VALUE: 'quantity-value',
};

export interface QuantityInputProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max: number;
    /** Used in the button labels, e.g. the product name. */
    label?: string;
}

/** Stepper, it can not go below `min` or above `max`. */
const QuantityInput = ({
    value,
    onChange,
    min = 1,
    max,
    label = 'quantity',
}: QuantityInputProps) => (
    <Box
        sx={{
            display: 'inline-flex',
            alignItems: 'center',
            border: `1px solid ${cssColor('grey300')}`,
            borderRadius: 1,
        }}
    >
        <IconButton
            data-testid={TESTIDS.DECREASE}
            size="small"
            aria-label={`Decrease ${label}`}
            disabled={value <= min}
            onClick={() => onChange(value - 1)}
        >
            <RemoveIcon fontSize="small" />
        </IconButton>
        <Typography
            data-testid={TESTIDS.VALUE}
            variant="text2"
            aria-live="polite"
            sx={{ minWidth: 32, textAlign: 'center', fontWeight: 600 }}
        >
            {value}
        </Typography>
        <IconButton
            data-testid={TESTIDS.INCREASE}
            size="small"
            aria-label={`Increase ${label}`}
            disabled={value >= max}
            onClick={() => onChange(value + 1)}
        >
            <AddIcon fontSize="small" />
        </IconButton>
    </Box>
);

export default addTestIds(QuantityInput, TESTIDS);
