import { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import { Box, Button, Pagination } from '@mui/material';
import { cancelMyOrder } from 'api/ajApiOrders';
import DialogConfirm from 'components/DialogConfirm';
import EmptyList from 'components/EmptyList';
import MessageCard from 'components/MessageCard';
import OrderDetails from 'components/OrderDetails';
import PageHeader from 'components/PageHeader';
import ProgressCard from 'components/ProgressCard';
import { toast } from 'core_components/Toaster';
import useFilterChange from 'hooks/useFilterChange';
import useMyOrders from 'hooks/useMyOrders';
import routes from 'routes/index';
import { OrderObjectType, OrderStatusEnum } from 'types/order';
import { DefaultFiltersEnum } from 'types/pagination';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    ORDER: 'my-orders-order',
    CANCEL: 'my-orders-cancel',
    PAGINATION: 'my-orders-pagination',
    EMPTY: 'my-orders-empty',
};

const PAGE_SIZE = 10;

const MyOrders = () => {
    const { value: page, handleChange: handlePageChange } =
        useFilterChange<number>('page', DefaultFiltersEnum.PAGE);
    const { items, pages, error, isInitialized, isPending, reload } =
        useMyOrders({ page, limit: PAGE_SIZE });
    const [cancelItem, setCancelItem] = useState<OrderObjectType | null>(null);
    const [isCancelling, setCancelling] = useState(false);

    const doCancel = async () => {
        if (!cancelItem) return;
        setCancelling(true);
        try {
            await cancelMyOrder(cancelItem.orderNumber);
            toast.success(`Order ${cancelItem.orderNumber} cancelled`);
            setCancelItem(null);
            await reload(true);
        } catch (cancelError) {
            toast.error((cancelError as Error).message);
        } finally {
            setCancelling(false);
        }
    };

    let content;
    if (error) {
        content = <MessageCard error>{error}</MessageCard>;
    } else if (!isInitialized) {
        content = <ProgressCard />;
    } else if (!items.length) {
        content = (
            <Box data-testid={TESTIDS.EMPTY}>
                <EmptyList
                    title="No orders yet"
                    text="Orders you place while signed in show up here."
                />
                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        component={RouterLink}
                        to={routes.shop.path}
                        variant="contained"
                    >
                        Start shopping
                    </Button>
                </Box>
            </Box>
        );
    } else {
        content = (
            <Box
                sx={{
                    display: 'grid',
                    gap: 2,
                    maxWidth: 720,
                    opacity: isPending ? 0.5 : 1,
                }}
            >
                {items.map((order) => (
                    <Box key={order.id} data-testid={TESTIDS.ORDER}>
                        <OrderDetails
                            order={order}
                            footer={
                                order.status === OrderStatusEnum.PENDING ? (
                                    <Button
                                        data-testid={TESTIDS.CANCEL}
                                        color="error"
                                        onClick={() => setCancelItem(order)}
                                    >
                                        Cancel order
                                    </Button>
                                ) : null
                            }
                        />
                    </Box>
                ))}
                {pages > 1 && (
                    <Box
                        data-testid={TESTIDS.PAGINATION}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <Pagination
                            count={pages}
                            page={page}
                            onChange={(_, next) => handlePageChange(next)}
                            color="primary"
                            shape="rounded"
                        />
                    </Box>
                )}
            </Box>
        );
    }

    return (
        <>
            <PageHeader title="My orders" />
            {content}
            {cancelItem && (
                <DialogConfirm
                    open
                    danger
                    title="Cancel order"
                    confirmLabel="Cancel order"
                    closeLabel="Keep order"
                    isSubmitting={isCancelling}
                    onClose={() => setCancelItem(null)}
                    onConfirm={doCancel}
                >
                    Cancel order <strong>{cancelItem.orderNumber}</strong>? The
                    items go back on the shelf and this can not be undone.
                </DialogConfirm>
            )}
        </>
    );
};

export default addTestIds(MyOrders, TESTIDS);
