import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { deleteProduct } from 'api/ajApiProducts';
import DialogConfirm from 'components/DialogConfirm';
import ListContainer from 'components/ListContainer';
import ListFilterContainer from 'components/ListFilterContainer';
import ListFilterInput from 'components/ListFilterInput';
import ListFilterPagination from 'components/ListFilterPagination';
import ListFilterSelect from 'components/ListFilterSelect';
import ListFilterSwitch from 'components/ListFilterSwitch';
import MessageCard from 'components/MessageCard';
import PageHeader from 'components/PageHeader';
import { PRODUCT_STATUS_OPTIONS } from 'components/StatusChip';
import TableCard from 'components/TableCard';
import { toast } from 'core_components/Toaster';
import AddIcon from 'icons/AddIcon';
import useCategories from 'hooks/useCategories';
import useProducts from 'hooks/useProducts';
import useProductsFilter from 'hooks/useProductsFilter';
import routes from 'routes/index';
import { ProductObjectType } from 'types/product';
import { addTestIds } from 'utils/testids';
import ProductRow from './components/ProductRow';

const TESTIDS = {
    ADD_BUTTON: 'products-add-button',
    TABLE: 'products-table',
};

const Products = () => {
    const navigate = useNavigate();
    const { filter, isFiltered } = useProductsFilter();
    const { items, count, error, isInitialized, isPending, reload } =
        useProducts(filter);
    const { data: categories } = useCategories();
    const [deleteItem, setDeleteItem] = useState<ProductObjectType | null>(
        null
    );
    const [isDeleting, setDeleting] = useState(false);

    const doDelete = async () => {
        if (!deleteItem) return;
        setDeleting(true);
        try {
            await deleteProduct(deleteItem.id);
            toast.success(`${deleteItem.name} deleted`);
            setDeleteItem(null);
            await reload(true);
        } catch (deleteError) {
            toast.error((deleteError as Error).message);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <PageHeader
                title="Products"
                subtitle="Manage your catalog, prices and availability"
                actions={
                    <Button
                        data-testid={TESTIDS.ADD_BUTTON}
                        variant="contained"
                        startIcon={<AddIcon />}
                        component={RouterLink}
                        to={routes.adminProductNew.path}
                    >
                        Add product
                    </Button>
                }
            />
            <ListFilterContainer>
                <ListFilterInput
                    name="search"
                    placeholder="Search by name or SKU"
                    ariaLabel="Search products"
                />
                <ListFilterSelect
                    name="status"
                    allLabel="All statuses"
                    options={PRODUCT_STATUS_OPTIONS}
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
                    emptyText="Add your first product to start selling."
                    emptyButtonLabel="Add product"
                    emptyOnClick={() => navigate(routes.adminProductNew.path)}
                >
                    <TableCard footer={<ListFilterPagination count={count} />}>
                        <Table data-testid={TESTIDS.TABLE}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell>Stock</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((product) => (
                                    <ProductRow
                                        key={product.id}
                                        product={product}
                                        onDelete={setDeleteItem}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableCard>
                </ListContainer>
            )}

            {deleteItem && (
                <DialogConfirm
                    open
                    danger
                    title="Delete product"
                    confirmLabel="Delete"
                    isSubmitting={isDeleting}
                    onClose={() => setDeleteItem(null)}
                    onConfirm={doDelete}
                >
                    Delete <strong>{deleteItem.name}</strong>? Its stock history
                    is deleted with it. To hide a product from the store without
                    losing history, set its status to Archived instead.
                </DialogConfirm>
            )}
        </>
    );
};

export default addTestIds(Products, TESTIDS);
