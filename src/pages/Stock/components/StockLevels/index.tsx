import { useState } from 'react';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import ListContainer from 'components/ListContainer';
import ListFilterContainer from 'components/ListFilterContainer';
import ListFilterInput from 'components/ListFilterInput';
import ListFilterPagination from 'components/ListFilterPagination';
import ListFilterSelect from 'components/ListFilterSelect';
import ListFilterSwitch from 'components/ListFilterSwitch';
import MessageCard from 'components/MessageCard';
import ProductImage from 'components/ProductImage';
import StockAdjustDialog from 'components/StockAdjustDialog';
import StockBadge from 'components/StockBadge';
import TableCard from 'components/TableCard';
import AdjustIcon from 'icons/AdjustIcon';
import useCategories from 'hooks/useCategories';
import useProducts from 'hooks/useProducts';
import useProductsFilter from 'hooks/useProductsFilter';
import { ZeroArgsFunctionType } from 'types/functions';
import { ProductObjectType } from 'types/product';
import { formatNumber } from 'utils/format';
import { getStockState } from 'utils/product';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    TABLE: 'stock-levels-table',
    ROW: 'stock-levels-row',
    ADJUST: 'stock-levels-adjust',
};

export interface StockLevelsProps {
    /** Called after a stock change, used to refresh the summary cards. */
    onChange: ZeroArgsFunctionType;
}

const StockLevels = ({ onChange }: StockLevelsProps) => {
    const { filter, isFiltered } = useProductsFilter();
    const { items, count, error, isInitialized, isPending, reload } =
        useProducts(filter);
    const { data: categories } = useCategories();
    const [adjustProduct, setAdjustProduct] =
        useState<ProductObjectType | null>(null);

    return (
        <>
            <ListFilterContainer>
                <ListFilterInput
                    name="search"
                    placeholder="Search by name or SKU"
                    ariaLabel="Search products"
                />
                <ListFilterSelect
                    name="category"
                    allLabel="All categories"
                    options={(categories ?? []).map((category) => ({
                        value: category.id,
                        label: category.name,
                    }))}
                />
                <ListFilterSwitch name="low_stock" label="Low stock only" />
            </ListFilterContainer>

            {error ? (
                <MessageCard error>{error}</MessageCard>
            ) : (
                <ListContainer
                    count={count}
                    initialized={isInitialized}
                    pending={isPending}
                    filtered={isFiltered}
                    emptyTitle="No products yet"
                    emptyText="Add products first, then manage their stock here."
                >
                    <TableCard footer={<ListFilterPagination count={count} />}>
                        <Table data-testid={TESTIDS.TABLE}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="right">
                                        In stock
                                    </TableCell>
                                    <TableCell align="right">
                                        Low stock level
                                    </TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((product) => (
                                    <TableRow
                                        key={product.id}
                                        hover
                                        data-testid={TESTIDS.ROW}
                                    >
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                }}
                                            >
                                                <ProductImage
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                />
                                                <Box>
                                                    <Typography
                                                        variant="text2"
                                                        sx={{ fontWeight: 600 }}
                                                        component="div"
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
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography
                                                variant="text2"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                {formatNumber(
                                                    product.stockQuantity
                                                )}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            {formatNumber(
                                                product.lowStockThreshold
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <StockBadge
                                                state={getStockState(product)}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                data-testid={TESTIDS.ADJUST}
                                                size="small"
                                                variant="outlined"
                                                startIcon={<AdjustIcon />}
                                                onClick={() =>
                                                    setAdjustProduct(product)
                                                }
                                            >
                                                Adjust
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableCard>
                </ListContainer>
            )}

            {adjustProduct && (
                <StockAdjustDialog
                    product={adjustProduct}
                    onClose={() => setAdjustProduct(null)}
                    onAfterSubmit={() => {
                        reload(true);
                        onChange();
                    }}
                />
            )}
        </>
    );
};

export default addTestIds(StockLevels, TESTIDS);
