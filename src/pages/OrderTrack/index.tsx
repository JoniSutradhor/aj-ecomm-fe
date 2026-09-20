import { useState } from 'react';
import { useLocation } from 'react-router';
import { z } from 'zod';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { trackOrder } from 'api/ajApiOrders';
import InputFieldController from 'components/InputFieldController';
import MessageCard from 'components/MessageCard';
import OrderDetails from 'components/OrderDetails';
import PageHeader from 'components/PageHeader';
import useHookForm from 'hooks/useHookForm';
import useQueryParams from 'hooks/useQueryParams';
import { OrderObjectType } from 'types/order';
import { addTestIds } from 'utils/testids';
import { zRequiredMax, zValidEmail } from 'utils/z';

const TESTIDS = {
    NUMBER: 'track-order-number',
    EMAIL: 'track-email',
    SUBMIT: 'track-submit',
    ERROR: 'track-error',
    PLACED: 'track-placed',
};

const formSchema = z.object({
    orderNumber: zRequiredMax(30),
    email: zValidEmail(),
});

type FormValues = z.infer<typeof formSchema>;

/**
 * Shows an order. Right after checkout the order comes in the navigation state
 * (thank you page), otherwise the shopper looks it up with order number + email.
 */
const OrderTrack = () => {
    const location = useLocation();
    const params = useQueryParams();
    const state = location.state as {
        order?: OrderObjectType;
        placed?: boolean;
    } | null;
    const [order, setOrder] = useState<OrderObjectType | null>(
        state?.order ?? null
    );
    const [submitError, setSubmitError] = useState('');
    const placed = !!state?.placed && order?.id === state.order?.id;

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useHookForm({
        schema: formSchema,
        initialValues: {
            orderNumber: params.number ?? '',
            email: '',
        } as FormValues,
        ignoreReset: true,
        onSubmit: async (values) => {
            setSubmitError('');
            try {
                setOrder(
                    await trackOrder({
                        orderNumber: values.orderNumber.trim(),
                        email: values.email,
                    })
                );
            } catch (error) {
                setOrder(null);
                setSubmitError((error as Error).message);
            }
        },
    });

    if (order) {
        return (
            <>
                <PageHeader
                    title={placed ? 'Thank you for your order' : 'Your order'}
                />
                {placed && (
                    <MessageCard data-testid={TESTIDS.PLACED} sx={{ mb: 2 }}>
                        {`We received your order ${order.orderNumber}. Keep this number and the email you used, you can track the order with them. You pay in cash when it arrives.`}
                    </MessageCard>
                )}
                <Box sx={{ maxWidth: 720 }}>
                    <OrderDetails order={order} />
                </Box>
            </>
        );
    }

    return (
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            <PageHeader title="Track your order" />
            <Card>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="text2" color="textSecondary">
                        Enter the order number from your confirmation and the
                        email you ordered with.
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            mt: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        {submitError && (
                            <MessageCard error data-testid={TESTIDS.ERROR}>
                                {submitError}
                            </MessageCard>
                        )}
                        <InputFieldController
                            control={control}
                            name="orderNumber"
                            label="Order number"
                            placeholder="AJ-000042"
                            slotProps={{
                                htmlInput: { 'data-testid': TESTIDS.NUMBER },
                            }}
                        />
                        <InputFieldController
                            control={control}
                            name="email"
                            label="Email"
                            type="email"
                            slotProps={{
                                htmlInput: { 'data-testid': TESTIDS.EMAIL },
                            }}
                        />
                        <Button
                            data-testid={TESTIDS.SUBMIT}
                            type="submit"
                            variant="contained"
                            size="large"
                            loading={isSubmitting}
                        >
                            Track order
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default addTestIds(OrderTrack, TESTIDS);
