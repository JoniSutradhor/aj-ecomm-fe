import { Chip } from '@mui/material';
import { OrderStatusEnum } from 'types/order';
import { CustomColorName } from 'theme/theme';
import { cssColor } from 'utils/colors';

const STATUSES: Record<
    OrderStatusEnum,
    { label: string; background: CustomColorName; color: CustomColorName }
> = {
    [OrderStatusEnum.PENDING]: {
        label: 'Pending',
        background: 'warning50',
        color: 'warning700',
    },
    [OrderStatusEnum.CONFIRMED]: {
        label: 'Confirmed',
        background: 'brand50',
        color: 'brand700',
    },
    [OrderStatusEnum.SHIPPED]: {
        label: 'Shipped',
        background: 'brand100',
        color: 'brand700',
    },
    [OrderStatusEnum.DELIVERED]: {
        label: 'Delivered',
        background: 'success50',
        color: 'success700',
    },
    [OrderStatusEnum.CANCELLED]: {
        label: 'Cancelled',
        background: 'danger50',
        color: 'danger700',
    },
};

export interface OrderStatusChipProps {
    status: OrderStatusEnum;
}

const OrderStatusChip = ({ status }: OrderStatusChipProps) => (
    <Chip
        size="small"
        label={STATUSES[status].label}
        sx={{
            backgroundColor: cssColor(STATUSES[status].background),
            color: cssColor(STATUSES[status].color),
        }}
    />
);

export default OrderStatusChip;
