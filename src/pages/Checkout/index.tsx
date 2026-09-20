import { useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router';
import { z } from 'zod';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Link,
    Typography,
} from '@mui/material';
import { placeOrder } from 'api/ajApiOrders';
import InputFieldController from 'components/InputFieldController';
import MessageCard from 'components/MessageCard';
import PageHeader from 'components/PageHeader';
import ProductPicture from 'components/ProductPicture';
import useAuthUser from 'hooks/useAuthUser';
import useCart from 'hooks/useCart';
import useHookForm from 'hooks/useHookForm';
import routes from 'routes/index';
import { formatCurrency } from 'utils/format';
import { ORDER_LIMITS } from 'utils/orderLimits';
import { addTestIds } from 'utils/testids';
import { zOptionalMax, zRequiredMax, zValidEmail } from 'utils/z';

const TESTIDS = {
    FORM: 'checkout-form',
    FULL_NAME: 'checkout-full-name',
    EMAIL: 'checkout-email',
    PHONE: 'checkout-phone',
    ADDRESS: 'checkout-address',
    CITY: 'checkout-city',
    POSTAL_CODE: 'checkout-postal-code',
    NOTES: 'checkout-notes',
    SUBMIT: 'checkout-submit',
    ERROR: 'checkout-error',
    SUBTOTAL: 'checkout-subtotal',
};

// Same limits as the api, so an order is never rejected for a field the form allowed
const formSchema = z.object({
    fullName: zRequiredMax(ORDER_LIMITS.fullName),
    email: zValidEmail().pipe(
        z
            .string()
            .max(ORDER_LIMITS.email, `Maximum ${ORDER_LIMITS.email} characters`)
    ),
    phone: zRequiredMax(ORDER_LIMITS.phone),
    addressLine: zRequiredMax(ORDER_LIMITS.addressLine),
    city: zRequiredMax(ORDER_LIMITS.city),
    postalCode: zOptionalMax(ORDER_LIMITS.postalCode),
    notes: zOptionalMax(ORDER_LIMITS.notes),
});

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
    const navigate = useNavigate();
    const { authUser, isInitialized } = useAuthUser();
    const { items, subtotal, clear } = useCart();
    const [submitError, setSubmitError] = useState('');
    // Once the order is placed the cart is cleared, that must not send the shopper back to the cart
    const [isPlaced, setPlaced] = useState(false);

    const initialValues: FormValues = {
        fullName: authUser ? `${authUser.fname} ${authUser.lname}`.trim() : '',
        email: authUser?.email ?? '',
        phone: '',
        addressLine: '',
        city: '',
        postalCode: '',
        notes: '',
    };

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useHookForm({
        schema: formSchema,
        initialValues,
        isInitialized,
        onSubmit: async (values) => {
            setSubmitError('');
            try {
                const order = await placeOrder({
                    items: items.map(({ productId, quantity }) => ({
                        productId,
                        quantity,
                    })),
                    fullName: values.fullName,
                    email: values.email,
                    phone: values.phone,
                    addressLine: values.addressLine,
                    city: values.city,
                    postalCode: values.postalCode || undefined,
                    notes: values.notes || undefined,
                });
                // Batched with the cart update, so no render sees an empty cart and an unplaced order
                setPlaced(true);
                clear();
                navigate(routes.orderTrack.path, {
                    replace: true,
                    state: { order, placed: true },
                });
            } catch (error) {
                setSubmitError((error as Error).message);
            }
        },
    });

    if (!items.length && !isPlaced) {
        return <Navigate to={routes.cart.path} replace />;
    }

    return (
        <>
            <PageHeader
                title="Checkout"
                breadcrumbs={[
                    { label: 'Cart', to: routes.cart.path },
                    { label: 'Checkout' },
                ]}
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
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                        <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
                            Delivery details
                        </Typography>
                        <Box
                            component="form"
                            data-testid={TESTIDS.FORM}
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            {submitError && (
                                <MessageCard error data-testid={TESTIDS.ERROR}>
                                    {submitError}{' '}
                                    <Link
                                        component={RouterLink}
                                        to={routes.cart.path}
                                    >
                                        Review your cart
                                    </Link>
                                </MessageCard>
                            )}
                            <InputFieldController
                                control={control}
                                name="fullName"
                                label="Full name"
                                autoComplete="name"
                                slotProps={{
                                    htmlInput: {
                                        'data-testid': TESTIDS.FULL_NAME,
                                        maxLength: ORDER_LIMITS.fullName,
                                    },
                                }}
                            />
                            <Box
                                sx={{
                                    display: 'grid',
                                    gap: 2,
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: '1fr 1fr',
                                    },
                                }}
                            >
                                <InputFieldController
                                    control={control}
                                    name="email"
                                    label="Email"
                                    type="email"
                                    autoComplete="email"
                                    slotProps={{
                                        htmlInput: {
                                            'data-testid': TESTIDS.EMAIL,
                                            maxLength: ORDER_LIMITS.email,
                                        },
                                    }}
                                />
                                <InputFieldController
                                    control={control}
                                    name="phone"
                                    label="Phone"
                                    type="tel"
                                    autoComplete="tel"
                                    slotProps={{
                                        htmlInput: {
                                            'data-testid': TESTIDS.PHONE,
                                            maxLength: ORDER_LIMITS.phone,
                                        },
                                    }}
                                />
                            </Box>
                            <InputFieldController
                                control={control}
                                name="addressLine"
                                label="Address"
                                autoComplete="street-address"
                                slotProps={{
                                    htmlInput: {
                                        'data-testid': TESTIDS.ADDRESS,
                                        maxLength: ORDER_LIMITS.addressLine,
                                    },
                                }}
                            />
                            <Box
                                sx={{
                                    display: 'grid',
                                    gap: 2,
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: '1fr 1fr',
                                    },
                                }}
                            >
                                <InputFieldController
                                    control={control}
                                    name="city"
                                    label="City"
                                    autoComplete="address-level2"
                                    slotProps={{
                                        htmlInput: {
                                            'data-testid': TESTIDS.CITY,
                                            maxLength: ORDER_LIMITS.city,
                                        },
                                    }}
                                />
                                <InputFieldController
                                    control={control}
                                    name="postalCode"
                                    label="Postal code"
                                    optional
                                    autoComplete="postal-code"
                                    slotProps={{
                                        htmlInput: {
                                            'data-testid': TESTIDS.POSTAL_CODE,
                                            maxLength: ORDER_LIMITS.postalCode,
                                        },
                                    }}
                                />
                            </Box>
                            <InputFieldController
                                control={control}
                                name="notes"
                                label="Delivery notes"
                                optional
                                multiline
                                minRows={2}
                                slotProps={{
                                    htmlInput: {
                                        'data-testid': TESTIDS.NOTES,
                                        maxLength: ORDER_LIMITS.notes,
                                    },
                                }}
                            />
                            <Typography variant="text2" color="textSecondary">
                                Payment: cash on delivery. You pay when the
                                order arrives.
                            </Typography>
                            <Button
                                data-testid={TESTIDS.SUBMIT}
                                type="submit"
                                variant="contained"
                                size="large"
                                loading={isSubmitting}
                            >
                                Place order
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
                            Order summary
                        </Typography>
                        {items.map((item) => (
                            <Box
                                key={item.productId}
                                sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}
                            >
                                <Box sx={{ width: 48, flexShrink: 0 }}>
                                    <ProductPicture
                                        src={item.image}
                                        alt={item.name}
                                        sx={{ borderRadius: 1 }}
                                    />
                                </Box>
                                <Typography
                                    variant="text2"
                                    sx={{ flexGrow: 1, minWidth: 0 }}
                                >
                                    {`${item.quantity} x ${item.name}`}
                                </Typography>
                                <Typography
                                    variant="text2"
                                    sx={{ fontWeight: 600 }}
                                >
                                    {formatCurrency(item.price * item.quantity)}
                                </Typography>
                            </Box>
                        ))}
                        <Divider sx={{ my: 2 }} />
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
                            The delivery fee is added when the order is placed.
                            Prices are confirmed at that moment.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default addTestIds(Checkout, TESTIDS);
