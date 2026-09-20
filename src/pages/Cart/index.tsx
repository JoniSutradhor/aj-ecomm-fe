import { Link as RouterLink } from 'react-router';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    IconButton,
    Link,
    Typography,
} from '@mui/material';
import EmptyList from 'components/EmptyList';
import PageHeader from 'components/PageHeader';
import ProductPicture from 'components/ProductPicture';
import QuantityInput from 'components/QuantityInput';
import CartIcon from 'icons/CartIcon';
import DeleteIcon from 'icons/DeleteIcon';
import useCart from 'hooks/useCart';
import routes from 'routes/index';
import { formatCurrency } from 'utils/format';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    ITEM: 'cart-item',
    REMOVE: 'cart-item-remove',
    LINE_TOTAL: 'cart-item-total',
    SUBTOTAL: 'cart-subtotal',
    CHECKOUT: 'cart-checkout',
    CLEAR: 'cart-clear',
    EMPTY: 'cart-empty',
};

const Cart = () => {
    const { items, count, subtotal, setQuantity, remove, clear } = useCart();

    if (!items.length) {
        return (
            <Box data-testid={TESTIDS.EMPTY}>
                <title>Cart | AJ</title>
                <EmptyList
                    icon={<CartIcon fontSize="large" />}
                    title="Your cart is empty"
                    text="Looks like you have not added anything yet."
                />
                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        component={RouterLink}
                        to={routes.shop.path}
                        variant="contained"
                    >
                        Continue shopping
                    </Button>
                </Box>
            </Box>
        );
    }

    return (
        <>
            <PageHeader
                title="Your cart"
                subtitle={`${count} ${count === 1 ? 'item' : 'items'}`}
                actions={
                    <Button
                        data-testid={TESTIDS.CLEAR}
                        color="inherit"
                        onClick={clear}
                    >
                        Clear cart
                    </Button>
                }
            />
            <Box
                sx={{
                    display: 'grid',
                    gap: 3,
                    gridTemplateColumns: { xs: '1fr', md: '1fr 360px' },
                    alignItems: 'start',
                }}
            >
                <Card>
                    {items.map((item, index) => (
                        <Box key={item.productId} data-testid={TESTIDS.ITEM}>
                            {index > 0 && <Divider />}
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    p: 2,
                                    alignItems: 'center',
                                }}
                            >
                                <Box sx={{ width: 88, flexShrink: 0 }}>
                                    <ProductPicture
                                        src={item.image}
                                        alt={item.name}
                                        sx={{ borderRadius: 1 }}
                                    />
                                </Box>
                                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                    <Link
                                        component={RouterLink}
                                        to={routes.product.pathWithId(
                                            item.slug,
                                            'slug'
                                        )}
                                        color="textPrimary"
                                        underline="hover"
                                        variant="text1"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {item.name}
                                    </Link>
                                    <Typography
                                        variant="text2"
                                        color="textSecondary"
                                        component="div"
                                    >
                                        {formatCurrency(item.price)}
                                    </Typography>
                                    <Box sx={{ mt: 1 }}>
                                        <QuantityInput
                                            value={item.quantity}
                                            max={item.maxQuantity}
                                            label={item.name}
                                            onChange={(quantity) =>
                                                setQuantity(
                                                    item.productId,
                                                    quantity
                                                )
                                            }
                                        />
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        data-testid={TESTIDS.LINE_TOTAL}
                                        variant="text1"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {formatCurrency(
                                            item.price * item.quantity
                                        )}
                                    </Typography>
                                    <IconButton
                                        data-testid={TESTIDS.REMOVE}
                                        size="small"
                                        aria-label={`Remove ${item.name}`}
                                        onClick={() => remove(item.productId)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Card>
                <Card>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
                            Order summary
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="text1">Subtotal</Typography>
                            <Typography
                                data-testid={TESTIDS.SUBTOTAL}
                                variant="text1"
                                sx={{ fontWeight: 700 }}
                            >
                                {formatCurrency(subtotal)}
                            </Typography>
                        </Box>
                        <Typography
                            variant="text3"
                            color="textSecondary"
                            component="div"
                            sx={{ mt: 0.5 }}
                        >
                            The delivery fee is added when you place the order.
                        </Typography>
                        <Button
                            data-testid={TESTIDS.CHECKOUT}
                            component={RouterLink}
                            to={routes.checkout.path}
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 3 }}
                        >
                            Checkout
                        </Button>
                        <Button
                            component={RouterLink}
                            to={routes.shop.path}
                            fullWidth
                            sx={{ mt: 1 }}
                        >
                            Continue shopping
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default addTestIds(Cart, TESTIDS);
