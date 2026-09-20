import { Link as RouterLink } from 'react-router';
import {
    Box,
    IconButton,
    Link,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import ProductImage from 'components/ProductImage';
import StatusChip from 'components/StatusChip';
import StockBadge from 'components/StockBadge';
import DeleteIcon from 'icons/DeleteIcon';
import EditIcon from 'icons/EditIcon';
import routes from 'routes/index';
import { SetFunctionType } from 'types/functions';
import { ProductObjectType } from 'types/product';
import { formatCurrency, formatNumber } from 'utils/format';
import { getStockState } from 'utils/product';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    ROW: 'product-row',
    EDIT: 'product-row-edit',
    DELETE: 'product-row-delete',
};

export interface ProductRowProps {
    product: ProductObjectType;
    onDelete: SetFunctionType<ProductObjectType>;
}

const ProductRow = ({ product, onDelete }: ProductRowProps) => {
    const editPath = routes.adminProductEdit.pathWithId(product.id);

    return (
        <TableRow hover data-testid={TESTIDS.ROW}>
            <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <ProductImage src={product.images[0]} alt={product.name} />
                    <Box sx={{ minWidth: 0 }}>
                        <Link
                            component={RouterLink}
                            to={editPath}
                            underline="hover"
                            color="textPrimary"
                            variant="text2"
                            sx={{ fontWeight: 600 }}
                        >
                            {product.name}
                        </Link>
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
            <TableCell>{product.category?.name ?? '—'}</TableCell>
            <TableCell align="right">
                <Typography
                    variant="text2"
                    sx={{ fontWeight: 600 }}
                    component="div"
                >
                    {formatCurrency(product.price)}
                </Typography>
                {product.compareAtPrice !== null && (
                    <Typography
                        variant="text3"
                        color="textSecondary"
                        component="div"
                        sx={{ textDecoration: 'line-through' }}
                    >
                        {formatCurrency(product.compareAtPrice)}
                    </Typography>
                )}
            </TableCell>
            <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="text2" sx={{ fontWeight: 600 }}>
                        {formatNumber(product.stockQuantity)}
                    </Typography>
                    <StockBadge state={getStockState(product)} />
                </Box>
            </TableCell>
            <TableCell>
                <StatusChip status={product.status} />
            </TableCell>
            <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                <Tooltip title="Edit">
                    <IconButton
                        data-testid={TESTIDS.EDIT}
                        aria-label={`Edit ${product.name}`}
                        component={RouterLink}
                        to={editPath}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton
                        data-testid={TESTIDS.DELETE}
                        aria-label={`Delete ${product.name}`}
                        onClick={() => onDelete(product)}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};

export default addTestIds(ProductRow, TESTIDS);
