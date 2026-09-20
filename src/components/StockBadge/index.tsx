import { Chip } from '@mui/material';
import { StockStateEnum } from 'types/product';
import { CustomColorName } from 'theme/theme';
import { cssColor } from 'utils/colors';

const STATES: Record<
    StockStateEnum,
    { label: string; background: CustomColorName; color: CustomColorName }
> = {
    [StockStateEnum.IN_STOCK]: {
        label: 'In stock',
        background: 'success50',
        color: 'success700',
    },
    [StockStateEnum.LOW]: {
        label: 'Low stock',
        background: 'warning50',
        color: 'warning700',
    },
    [StockStateEnum.OUT]: {
        label: 'Out of stock',
        background: 'danger50',
        color: 'danger700',
    },
};

export interface StockBadgeProps {
    state: StockStateEnum;
}

const StockBadge = ({ state }: StockBadgeProps) => (
    <Chip
        size="small"
        label={STATES[state].label}
        sx={{
            backgroundColor: cssColor(STATES[state].background),
            color: cssColor(STATES[state].color),
        }}
    />
);

export default StockBadge;
