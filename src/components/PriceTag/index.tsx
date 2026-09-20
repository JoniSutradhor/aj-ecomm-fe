import { Box, Typography } from '@mui/material';
import { cssColor } from 'utils/colors';
import { formatCurrency } from 'utils/format';
import { getDiscountPercent } from 'utils/product';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    PRICE: 'price-tag-price',
    COMPARE: 'price-tag-compare',
    DISCOUNT: 'price-tag-discount',
};

export interface PriceTagProps {
    price: number;
    /** Original price, shown struck through when higher than `price`. */
    compareAtPrice?: number | null;
    large?: boolean;
}

const PriceTag = ({ price, compareAtPrice, large = false }: PriceTagProps) => {
    const discount = getDiscountPercent(price, compareAtPrice);

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                columnGap: 1,
            }}
        >
            <Typography
                data-testid={TESTIDS.PRICE}
                variant={large ? 'h2' : 'text1'}
                component="span"
                sx={{ fontWeight: 700 }}
            >
                {formatCurrency(price)}
            </Typography>
            {discount > 0 && (
                <>
                    <Typography
                        data-testid={TESTIDS.COMPARE}
                        variant={large ? 'text1' : 'text2'}
                        component="s"
                        sx={{ color: cssColor('grey800') }}
                    >
                        {formatCurrency(compareAtPrice)}
                    </Typography>
                    <Typography
                        data-testid={TESTIDS.DISCOUNT}
                        variant="text3"
                        component="span"
                        sx={{ color: cssColor('danger700'), fontWeight: 600 }}
                    >
                        {`${discount}% off`}
                    </Typography>
                </>
            )}
        </Box>
    );
};

export default addTestIds(PriceTag, TESTIDS);
