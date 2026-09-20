import { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
} from '@mui/material';
import ProgressCard from 'components/ProgressCard';
import StockAdjustDialog from 'components/StockAdjustDialog';
import StockBadge from 'components/StockBadge';
import AdjustIcon from 'icons/AdjustIcon';
import useStockMovements from 'hooks/useStockMovements';
import { ZeroArgsFunctionType } from 'types/functions';
import { ProductObjectType } from 'types/product';
import { cssColor } from 'utils/colors';
import { formatDateTime, formatNumber } from 'utils/format';
import { getStockState } from 'utils/product';
import { STOCK_MOVEMENT_TYPE_LABELS, formatDelta } from 'utils/stock';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    QUANTITY: 'product-stock-quantity',
    ADJUST: 'product-stock-adjust',
    HISTORY_ITEM: 'product-stock-history-item',
};

const HISTORY_LIMIT = 5;

export interface ProductStockCardProps {
    product: ProductObjectType;
    /** Called after the stock changed so the product can be reloaded. */
    onChange: ZeroArgsFunctionType;
}

/** Current stock of a saved product, adjust button and the latest movements. */
const ProductStockCard = ({ product, onChange }: ProductStockCardProps) => {
    const movements = useStockMovements({
        productId: product.id,
        page: 1,
        limit: HISTORY_LIMIT,
    });
    const [adjusting, setAdjusting] = useState(false);

    return (
        <Card>
            <CardHeader
                title="Stock"
                slotProps={{ title: { variant: 'h3' } }}
            />
            <CardContent sx={{ pt: 0 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        mb: 2,
                    }}
                >
                    <Typography variant="h2" data-testid={TESTIDS.QUANTITY}>
                        {formatNumber(product.stockQuantity)}
                    </Typography>
                    <StockBadge state={getStockState(product)} />
                </Box>
                <Button
                    data-testid={TESTIDS.ADJUST}
                    fullWidth
                    variant="outlined"
                    startIcon={<AdjustIcon />}
                    onClick={() => setAdjusting(true)}
                >
                    Adjust stock
                </Button>
            </CardContent>
            <Divider />
            <CardContent>
                <Typography variant="text3" color="textSecondary" gutterBottom>
                    Latest changes
                </Typography>
                {!movements.isInitialized && <ProgressCard sx={{ p: 2 }} />}
                {movements.isInitialized && movements.items.length === 0 && (
                    <Typography variant="text2" color="textSecondary">
                        No stock changes yet.
                    </Typography>
                )}
                {movements.items.map((movement) => (
                    <Box
                        key={movement.id}
                        data-testid={TESTIDS.HISTORY_ITEM}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: 2,
                            py: 1,
                        }}
                    >
                        <Box sx={{ minWidth: 0 }}>
                            <Typography
                                variant="text2"
                                sx={{ fontWeight: 600 }}
                            >
                                {STOCK_MOVEMENT_TYPE_LABELS[movement.type]}
                            </Typography>
                            <Typography
                                variant="text3"
                                color="textSecondary"
                                component="div"
                            >
                                {formatDateTime(movement.createdAt)}
                            </Typography>
                        </Box>
                        <Typography
                            variant="text2"
                            sx={{
                                fontWeight: 600,
                                color: cssColor(
                                    movement.delta > 0
                                        ? 'success700'
                                        : 'danger700'
                                ),
                            }}
                        >
                            {formatDelta(movement.delta)}
                        </Typography>
                    </Box>
                ))}
            </CardContent>
            {adjusting && (
                <StockAdjustDialog
                    product={product}
                    onClose={() => setAdjusting(false)}
                    onAfterSubmit={() => {
                        onChange();
                        movements.reload(true);
                    }}
                />
            )}
        </Card>
    );
};

export default addTestIds(ProductStockCard, TESTIDS);
