import { Chip } from '@mui/material';
import { ProductStatusEnum } from 'types/product';
import { CustomColorName } from 'theme/theme';
import { cssColor } from 'utils/colors';

const STATUSES: Record<
    ProductStatusEnum,
    { label: string; background: CustomColorName; color: CustomColorName }
> = {
    [ProductStatusEnum.ACTIVE]: {
        label: 'Active',
        background: 'success50',
        color: 'success700',
    },
    [ProductStatusEnum.DRAFT]: {
        label: 'Draft',
        background: 'grey200',
        color: 'grey1000',
    },
    [ProductStatusEnum.ARCHIVED]: {
        label: 'Archived',
        background: 'warning50',
        color: 'warning700',
    },
};

export const PRODUCT_STATUS_OPTIONS = Object.values(ProductStatusEnum).map(
    (status) => ({ value: status, label: STATUSES[status].label })
);

export interface StatusChipProps {
    status: ProductStatusEnum;
}

const StatusChip = ({ status }: StatusChipProps) => (
    <Chip
        size="small"
        label={STATUSES[status].label}
        sx={{
            backgroundColor: cssColor(STATUSES[status].background),
            color: cssColor(STATUSES[status].color),
        }}
    />
);

export default StatusChip;
