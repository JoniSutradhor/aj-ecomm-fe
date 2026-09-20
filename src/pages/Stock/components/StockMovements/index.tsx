import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router';
import {
    Link,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import ListContainer from 'components/ListContainer';
import ListFilterContainer from 'components/ListFilterContainer';
import ListFilterPagination from 'components/ListFilterPagination';
import ListFilterSelect from 'components/ListFilterSelect';
import MessageCard from 'components/MessageCard';
import TableCard from 'components/TableCard';
import useQueryParams from 'hooks/useQueryParams';
import useStockMovements from 'hooks/useStockMovements';
import routes from 'routes/index';
import { DefaultFiltersEnum } from 'types/pagination';
import { StockMovementTypeEnum, StockMovementsFilterType } from 'types/stock';
import { cssColor } from 'utils/colors';
import { formatDateTime, formatNumber } from 'utils/format';
import {
    STOCK_MOVEMENT_TYPE_LABELS,
    STOCK_MOVEMENT_TYPE_OPTIONS,
    formatDelta,
} from 'utils/stock';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    TABLE: 'stock-movements-table',
    ROW: 'stock-movements-row',
    DELTA: 'stock-movements-delta',
};

const StockMovements = () => {
    const params = useQueryParams();
    const filter = useMemo<StockMovementsFilterType>(
        () => ({
            page: Number(params.page) || DefaultFiltersEnum.PAGE,
            limit: Number(params.limit) || DefaultFiltersEnum.ITEMS_PER_PAGE,
            type: (params.type as StockMovementTypeEnum) || undefined,
        }),
        [params]
    );
    const { items, count, error, isInitialized, isPending } =
        useStockMovements(filter);

    return (
        <>
            <ListFilterContainer>
                <ListFilterSelect
                    name="type"
                    allLabel="All types"
                    options={STOCK_MOVEMENT_TYPE_OPTIONS}
                />
            </ListFilterContainer>

            {error ? (
                <MessageCard error>{error}</MessageCard>
            ) : (
                <ListContainer
                    count={count}
                    initialized={isInitialized}
                    pending={isPending}
                    filtered={!!filter.type}
                    emptyTitle="No stock changes yet"
                    emptyText="Every restock, adjustment and sale shows up here."
                >
                    <TableCard footer={<ListFilterPagination count={count} />}>
                        <Table data-testid={TESTIDS.TABLE}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell align="right">Change</TableCell>
                                    <TableCell align="right">Balance</TableCell>
                                    <TableCell>Note</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((movement) => (
                                    <TableRow
                                        key={movement.id}
                                        hover
                                        data-testid={TESTIDS.ROW}
                                    >
                                        <TableCell
                                            sx={{ whiteSpace: 'nowrap' }}
                                        >
                                            {formatDateTime(movement.createdAt)}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                component={RouterLink}
                                                to={routes.adminProductEdit.pathWithId(
                                                    movement.productId
                                                )}
                                                underline="hover"
                                                color="textPrimary"
                                                variant="text2"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                {movement.product?.name}
                                            </Link>
                                            <Typography
                                                variant="text3"
                                                color="textSecondary"
                                                component="div"
                                            >
                                                SKU {movement.product?.sku}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                STOCK_MOVEMENT_TYPE_LABELS[
                                                    movement.type
                                                ]
                                            }
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            data-testid={TESTIDS.DELTA}
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
                                        </TableCell>
                                        <TableCell align="right">
                                            {formatNumber(
                                                movement.quantityAfter
                                            )}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                maxWidth: 280,
                                                color: 'text.secondary',
                                            }}
                                        >
                                            <Typography variant="text2" noWrap>
                                                {movement.reason || '—'}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableCard>
                </ListContainer>
            )}
        </>
    );
};

export default addTestIds(StockMovements, TESTIDS);
