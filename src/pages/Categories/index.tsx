import { useState } from 'react';
import {
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import { deleteCategory } from 'api/ajApiCategories';
import DialogConfirm from 'components/DialogConfirm';
import ListContainer from 'components/ListContainer';
import MessageCard from 'components/MessageCard';
import PageHeader from 'components/PageHeader';
import TableCard from 'components/TableCard';
import { toast } from 'core_components/Toaster';
import AddIcon from 'icons/AddIcon';
import DeleteIcon from 'icons/DeleteIcon';
import EditIcon from 'icons/EditIcon';
import useCategories from 'hooks/useCategories';
import { CategoryObjectType } from 'types/category';
import { formatNumber } from 'utils/format';
import { addTestIds } from 'utils/testids';
import CategoryEditDialog from './components/CategoryEditDialog';

const TESTIDS = {
    ADD_BUTTON: 'categories-add-button',
    ROW: 'category-row',
    EDIT: 'category-row-edit',
    DELETE: 'category-row-delete',
};

const Categories = () => {
    const { data, error, isInitialized, isPending, reload } = useCategories();
    // `null` closed, 'new' creating, a category editing
    const [editItem, setEditItem] = useState<CategoryObjectType | 'new' | null>(
        null
    );
    const [deleteItem, setDeleteItem] = useState<CategoryObjectType | null>(
        null
    );
    const [isDeleting, setDeleting] = useState(false);

    const doDelete = async () => {
        if (!deleteItem) return;
        setDeleting(true);
        try {
            await deleteCategory(deleteItem.id);
            toast.success(`${deleteItem.name} deleted`);
            setDeleteItem(null);
            await reload(true);
        } catch (deleteError) {
            // e.g. the category still has products
            toast.error((deleteError as Error).message);
            setDeleteItem(null);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <PageHeader
                title="Categories"
                subtitle="Group products so customers can find them"
                actions={
                    <Button
                        data-testid={TESTIDS.ADD_BUTTON}
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setEditItem('new')}
                    >
                        Add category
                    </Button>
                }
            />

            {error ? (
                <MessageCard error>{error}</MessageCard>
            ) : (
                <ListContainer
                    count={data?.length}
                    initialized={isInitialized}
                    pending={isPending}
                    emptyTitle="No categories yet"
                    emptyText="Create categories to organize your products."
                    emptyButtonLabel="Add category"
                    emptyOnClick={() => setEditItem('new')}
                >
                    <TableCard>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell align="right">
                                        Products
                                    </TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map((category) => (
                                    <TableRow
                                        key={category.id}
                                        hover
                                        data-testid={TESTIDS.ROW}
                                    >
                                        <TableCell>
                                            <Typography
                                                variant="text2"
                                                sx={{ fontWeight: 600 }}
                                                component="div"
                                            >
                                                {category.name}
                                            </Typography>
                                            <Typography
                                                variant="text3"
                                                color="textSecondary"
                                            >
                                                {category.slug}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                maxWidth: 360,
                                                color: 'text.secondary',
                                            }}
                                        >
                                            <Typography variant="text2" noWrap>
                                                {category.description || '—'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            {formatNumber(
                                                category.productCount
                                            )}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{ whiteSpace: 'nowrap' }}
                                        >
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    data-testid={TESTIDS.EDIT}
                                                    aria-label={`Edit ${category.name}`}
                                                    onClick={() =>
                                                        setEditItem(category)
                                                    }
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    data-testid={TESTIDS.DELETE}
                                                    aria-label={`Delete ${category.name}`}
                                                    onClick={() =>
                                                        setDeleteItem(category)
                                                    }
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableCard>
                </ListContainer>
            )}

            {editItem && (
                <CategoryEditDialog
                    category={editItem === 'new' ? null : editItem}
                    onClose={() => setEditItem(null)}
                    onAfterSubmit={() => reload(true)}
                />
            )}
            {deleteItem && (
                <DialogConfirm
                    open
                    danger
                    title="Delete category"
                    confirmLabel="Delete"
                    isSubmitting={isDeleting}
                    onClose={() => setDeleteItem(null)}
                    onConfirm={doDelete}
                >
                    Delete <strong>{deleteItem.name}</strong>?
                    {!!deleteItem.productCount &&
                        ` It still has ${deleteItem.productCount} product(s), move or delete them first.`}
                </DialogConfirm>
            )}
        </>
    );
};

export default addTestIds(Categories, TESTIDS);
