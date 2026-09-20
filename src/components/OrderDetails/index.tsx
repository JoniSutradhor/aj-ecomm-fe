import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router';
import { Box, Card, Divider, Link, Typography } from '@mui/material';
import OrderStatusChip from 'components/OrderStatusChip';
import ProductPicture from 'components/ProductPicture';
import routes from 'routes/index';
import { OrderObjectType, PaymentStatusEnum } from 'types/order';
import { formatCurrency, formatDateTime } from 'utils/format';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    NUMBER: 'order-number',
    ITEM: 'order-item',
    SUBTOTAL: 'order-subtotal',
    SHIPPING: 'order-shipping',
    TOTAL: 'order-total',
};

export interface OrderDetailsProps {
    order: OrderObjectType;
    /** Replaces the "Continue shopping" link, `null` shows no footer. */
    footer?: ReactNode;
}

interface TotalRowProps {
    label: string;
    value: number;
    testId: string;
    bold?: boolean;
}

const TotalRow = ({ label, value, testId, bold = false }: TotalRowProps) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="text2" sx={{ fontWeight: bold ? 700 : 400 }}>
            {label}
        </Typography>
        <Typography
            data-testid={testId}
            variant="text2"
            sx={{ fontWeight: bold ? 700 : 400 }}
        >
            {formatCurrency(value)}
        </Typography>
    </Box>
);

/** Read only view of an order: status, delivery details, lines and totals. */
const OrderDetails = ({ order, footer }: OrderDetailsProps) => (
    <Card>
        <Box
            sx={{
                p: 3,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: 2,
            }}
        >
            <Box>
                <Typography
                    data-testid={TESTIDS.NUMBER}
                    variant="h3"
                    component="h2"
                >
                    {order.orderNumber}
                </Typography>
                <Typography variant="text3" color="textSecondary">
                    {`Placed ${formatDateTime(order.createdAt)}`}
                </Typography>
            </Box>
            <Box sx={{ textAlign: { sm: 'right' } }}>
                <OrderStatusChip status={order.status} />
                <Typography
                    variant="text3"
                    color="textSecondary"
                    component="div"
                    sx={{ mt: 0.5 }}
                >
                    {order.paymentStatus === PaymentStatusEnum.PAID
                        ? 'Paid'
                        : 'Cash on delivery, pay when it arrives'}
                </Typography>
            </Box>
        </Box>
        <Divider />
        <Box sx={{ p: 3 }}>
            <Typography variant="text3" color="textSecondary" component="div">
                Delivering to
            </Typography>
            <Typography variant="text2" sx={{ fontWeight: 600 }}>
                {order.fullName}
            </Typography>
            <Typography variant="text2" component="div">
                {[order.addressLine, order.city, order.postalCode]
                    .filter(Boolean)
                    .join(', ')}
            </Typography>
            <Typography variant="text2" color="textSecondary" component="div">
                {`${order.phone} | ${order.email}`}
            </Typography>
            {order.notes && (
                <Typography
                    variant="text2"
                    color="textSecondary"
                    component="div"
                    sx={{ mt: 1 }}
                >
                    {`Note: ${order.notes}`}
                </Typography>
            )}
        </Box>
        <Divider />
        {order.items.map((item) => (
            <Box
                key={item.id}
                data-testid={TESTIDS.ITEM}
                sx={{ display: 'flex', gap: 2, p: 2, alignItems: 'center' }}
            >
                <Box sx={{ width: 56, flexShrink: 0 }}>
                    <ProductPicture
                        src={item.image ?? undefined}
                        alt={item.name}
                        sx={{ borderRadius: 1 }}
                    />
                </Box>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography variant="text2" sx={{ fontWeight: 600 }}>
                        {item.name}
                    </Typography>
                    <Typography variant="text3" color="textSecondary">
                        {`${item.quantity} x ${formatCurrency(item.unitPrice)}`}
                    </Typography>
                </Box>
                <Typography variant="text2" sx={{ fontWeight: 600 }}>
                    {formatCurrency(item.lineTotal)}
                </Typography>
            </Box>
        ))}
        <Divider />
        <Box sx={{ p: 3, display: 'grid', gap: 0.5 }}>
            <TotalRow
                label="Subtotal"
                value={order.subtotal}
                testId={TESTIDS.SUBTOTAL}
            />
            <TotalRow
                label="Shipping"
                value={order.shippingFee}
                testId={TESTIDS.SHIPPING}
            />
            <TotalRow
                bold
                label="Total"
                value={order.total}
                testId={TESTIDS.TOTAL}
            />
        </Box>
        {footer !== null && (
            <>
                <Divider />
                <Box sx={{ p: 2, textAlign: 'center' }}>
                    {footer ?? (
                        <Link
                            component={RouterLink}
                            to={routes.shop.path}
                            variant="text2"
                            underline="hover"
                        >
                            Continue shopping
                        </Link>
                    )}
                </Box>
            </>
        )}
    </Card>
);

export default addTestIds(OrderDetails, TESTIDS);
