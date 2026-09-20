import { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import {
    Box,
    Button,
    Card,
    CardHeader,
    List,
    ListItem,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import MessageCard from 'components/MessageCard';
import PageHeader from 'components/PageHeader';
import ProductImage from 'components/ProductImage';
import ProgressCard from 'components/ProgressCard';
import StatCard from 'components/StatCard';
import StockAdjustDialog from 'components/StockAdjustDialog';
import StockBadge from 'components/StockBadge';
import AdjustIcon from 'icons/AdjustIcon';
import MoneyIcon from 'icons/MoneyIcon';
import ProductsIcon from 'icons/ProductsIcon';
import StockIcon from 'icons/StockIcon';
import WarningIcon from 'icons/WarningIcon';
import useProducts from 'hooks/useProducts';
import useStockSummary from 'hooks/useStockSummary';
import routes from 'routes/index';
import { ProductObjectType } from 'types/product';
import { formatCurrency, formatNumber } from 'utils/format';
import { getStockState } from 'utils/product';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    LOW_STOCK_LIST: 'dashboard-low-stock-list',
    LOW_STOCK_ADJUST: 'dashboard-low-stock-adjust',
};

const LOW_STOCK_LIMIT = 8;

const Dashboard = () => {
    const summary = useStockSummary();
    const lowStock = useProducts({
        page: 1,
        limit: LOW_STOCK_LIMIT,
        lowStock: true,
    });
    const [adjustProduct, setAdjustProduct] =
        useState<ProductObjectType | null>(null);

    const reload = () => {
        summary.reload(true);
        lowStock.reload(true);
    };

    const data = summary.data;

    return (
        <>
            <PageHeader title="Dashboard" subtitle="Overview of your store" />
            {summary.error && (
                <Box sx={{ mb: 3 }}>
                    <MessageCard error>{summary.error}</MessageCard>
                </Box>
            )}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        label="Products"
                        icon={<ProductsIcon />}
                        loading={!summary.isInitialized}
                        value={formatNumber(data?.totalProducts)}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        label="Units in stock"
                        icon={<StockIcon />}
                        tone="success"
                        loading={!summary.isInitialized}
                        value={formatNumber(data?.totalUnits)}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        label="Low or out of stock"
                        icon={<WarningIcon />}
                        tone="warning"
                        loading={!summary.isInitialized}
                        value={formatNumber(
                            (data?.lowStockProducts ?? 0) +
                                (data?.outOfStockProducts ?? 0)
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        label="Inventory value"
                        icon={<MoneyIcon />}
                        loading={!summary.isInitialized}
                        value={formatCurrency(data?.inventoryValue)}
                    />
                </Grid>
            </Grid>

            <Card>
                <CardHeader
                    title="Needs restocking"
                    subheader="Products at or below their low stock level"
                    slotProps={{ title: { variant: 'h3' } }}
                    action={
                        <Button
                            component={RouterLink}
                            to={`${routes.adminStock.path}?low_stock=1`}
                        >
                            View all
                        </Button>
                    }
                />
                {lowStock.error && (
                    <Box sx={{ p: 2 }}>
                        <MessageCard error>{lowStock.error}</MessageCard>
                    </Box>
                )}
                {!lowStock.isInitialized && !lowStock.error && <ProgressCard />}
                {lowStock.isInitialized && lowStock.items.length === 0 && (
                    <Typography
                        color="textSecondary"
                        variant="text2"
                        sx={{ p: 3, pt: 1 }}
                    >
                        Everything is well stocked.
                    </Typography>
                )}
                <List data-testid={TESTIDS.LOW_STOCK_LIST} disablePadding>
                    {lowStock.items.map((product) => (
                        <ListItem
                            key={product.id}
                            divider
                            sx={{ gap: 2, flexWrap: 'wrap' }}
                        >
                            <ProductImage
                                src={product.images[0]}
                                alt={product.name}
                            />
                            <Box sx={{ flexGrow: 1, minWidth: 160 }}>
                                <Typography
                                    variant="text2"
                                    sx={{ fontWeight: 600 }}
                                >
                                    {product.name}
                                </Typography>
                                <Typography
                                    variant="text3"
                                    color="textSecondary"
                                    component="div"
                                >
                                    SKU {product.sku}
                                </Typography>
                            </Box>
                            <Typography
                                variant="text2"
                                sx={{ fontWeight: 600 }}
                            >
                                {formatNumber(product.stockQuantity)} left
                            </Typography>
                            <StockBadge state={getStockState(product)} />
                            <Button
                                data-testid={TESTIDS.LOW_STOCK_ADJUST}
                                size="small"
                                variant="outlined"
                                startIcon={<AdjustIcon />}
                                onClick={() => setAdjustProduct(product)}
                            >
                                Adjust
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Card>

            {adjustProduct && (
                <StockAdjustDialog
                    product={adjustProduct}
                    onClose={() => setAdjustProduct(null)}
                    onAfterSubmit={reload}
                />
            )}
        </>
    );
};

export default addTestIds(Dashboard, TESTIDS);
