import { useLocation, useNavigate } from 'react-router';
import { Box, Tab, Tabs } from '@mui/material';
import Grid from '@mui/material/Grid';
import MessageCard from 'components/MessageCard';
import PageHeader from 'components/PageHeader';
import StatCard from 'components/StatCard';
import HistoryIcon from 'icons/HistoryIcon';
import MoneyIcon from 'icons/MoneyIcon';
import StockIcon from 'icons/StockIcon';
import WarningIcon from 'icons/WarningIcon';
import useQueryParams from 'hooks/useQueryParams';
import useStockSummary from 'hooks/useStockSummary';
import { formatCurrency, formatNumber } from 'utils/format';
import { queryStringStringify } from 'utils/querystring';
import { addTestIds } from 'utils/testids';
import StockLevels from './components/StockLevels';
import StockMovements from './components/StockMovements';

const TESTIDS = {
    TAB_LEVELS: 'stock-tab-levels',
    TAB_HISTORY: 'stock-tab-history',
};

const TAB_LEVELS = 'levels';
const TAB_HISTORY = 'history';

const Stock = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useQueryParams();
    const tab = params.tab === TAB_HISTORY ? TAB_HISTORY : TAB_LEVELS;
    const summary = useStockSummary();
    const data = summary.data;

    return (
        <>
            <PageHeader
                title="Stock"
                subtitle="Track inventory levels and every change to them"
            />
            {summary.error && (
                <Box sx={{ mb: 3 }}>
                    <MessageCard error>{summary.error}</MessageCard>
                </Box>
            )}
            <Grid container spacing={3} sx={{ mb: 3 }}>
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
                        label="Low stock"
                        icon={<WarningIcon />}
                        tone="warning"
                        loading={!summary.isInitialized}
                        value={formatNumber(data?.lowStockProducts)}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        label="Out of stock"
                        icon={<WarningIcon />}
                        tone="danger"
                        loading={!summary.isInitialized}
                        value={formatNumber(data?.outOfStockProducts)}
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

            <Tabs
                value={tab}
                // Each tab has its own filters, so switching starts from a clean url
                onChange={(_, value) =>
                    navigate(
                        `${location.pathname}?${queryStringStringify({
                            tab: value === TAB_LEVELS ? undefined : value,
                        })}`
                    )
                }
                sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
            >
                <Tab
                    data-testid={TESTIDS.TAB_LEVELS}
                    value={TAB_LEVELS}
                    icon={<StockIcon fontSize="small" />}
                    iconPosition="start"
                    label="Stock levels"
                />
                <Tab
                    data-testid={TESTIDS.TAB_HISTORY}
                    value={TAB_HISTORY}
                    icon={<HistoryIcon fontSize="small" />}
                    iconPosition="start"
                    label="History"
                />
            </Tabs>

            {tab === TAB_LEVELS ? (
                <StockLevels onChange={() => summary.reload(true)} />
            ) : (
                <StockMovements />
            )}
        </>
    );
};

export default addTestIds(Stock, TESTIDS);
