import { z } from 'zod';
import { Box, MenuItem, Typography } from '@mui/material';
import { adjustStock } from 'api/ajApiStock';
import DialogForm from 'components/DialogForm';
import InputFieldController from 'components/InputFieldController';
import { toast } from 'core_components/Toaster';
import useHookForm from 'hooks/useHookForm';
import { ZeroArgsFunctionType } from 'types/functions';
import { ProductObjectType } from 'types/product';
import { ManualStockMovementType, StockMovementTypeEnum } from 'types/stock';
import { formatNumber } from 'utils/format';
import { MANUAL_MOVEMENT_TYPES, STOCK_MOVEMENT_TYPE_LABELS } from 'utils/stock';
import { addTestIds } from 'utils/testids';
import { zInteger, zOptionalMax } from 'utils/z';

const TESTIDS = {
    DIALOG: 'stock-adjust-dialog',
    TYPE: 'stock-adjust-type',
    DIRECTION: 'stock-adjust-direction',
    QUANTITY: 'stock-adjust-quantity',
    REASON: 'stock-adjust-reason',
    RESULT: 'stock-adjust-result',
};

const formSchema = z
    .object({
        type: z.enum(MANUAL_MOVEMENT_TYPES),
        direction: z.enum(['increase', 'decrease']),
        quantity: zInteger(1),
        reason: zOptionalMax(500),
    })
    .superRefine((values, context) => {
        // Corrections and losses must be explained so the history stays auditable
        const needsReason =
            values.type === StockMovementTypeEnum.ADJUSTMENT ||
            values.type === StockMovementTypeEnum.DAMAGE;
        if (needsReason && !values.reason) {
            context.addIssue({
                code: 'custom',
                path: ['reason'],
                message: 'Please give a reason',
            });
        }
    });

type FormValues = z.infer<typeof formSchema>;

const initialValues: FormValues = {
    type: StockMovementTypeEnum.RESTOCK,
    direction: 'increase',
    quantity: '',
    reason: '',
};

/** Signed change in units for the form values (0 when the quantity is not a number yet). */
const getDelta = (values: FormValues): number => {
    const quantity = Number(values.quantity);
    if (!Number.isInteger(quantity) || quantity <= 0) return 0;
    switch (values.type) {
        case StockMovementTypeEnum.DAMAGE:
            return -quantity;
        case StockMovementTypeEnum.ADJUSTMENT:
            return values.direction === 'decrease' ? -quantity : quantity;
        default:
            return quantity;
    }
};

export interface StockAdjustDialogProps {
    product: Pick<ProductObjectType, 'id' | 'name' | 'sku' | 'stockQuantity'>;
    onClose: ZeroArgsFunctionType;
    /** Called after the stock was saved, e.g. to reload the list. */
    onAfterSubmit?: ZeroArgsFunctionType;
}

const StockAdjustDialog = ({
    product,
    onClose,
    onAfterSubmit,
}: StockAdjustDialogProps) => {
    const {
        control,
        handleSubmit,
        setError,
        watch,
        formState: { isSubmitting },
    } = useHookForm({
        schema: formSchema,
        initialValues,
        isInitialized: true,
        onSubmit: async (values) => {
            const delta = getDelta(values);
            if (product.stockQuantity + delta < 0) {
                setError('quantity', {
                    message: `Only ${formatNumber(product.stockQuantity)} in stock`,
                });
                return;
            }

            try {
                await adjustStock({
                    productId: product.id,
                    type: values.type as ManualStockMovementType,
                    delta,
                    reason: values.reason || undefined,
                });
            } catch (error) {
                toast.error((error as Error).message);
                return;
            }
            toast.success(`Stock updated for ${product.name}`);
            onAfterSubmit?.();
            onClose();
        },
    });

    const values = watch();
    const delta = getDelta(values);
    const newQuantity = product.stockQuantity + delta;

    return (
        <DialogForm
            open
            title="Adjust stock"
            onClose={onClose}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            confirmLabel="Save"
            data-testid={TESTIDS.DIALOG}
        >
            <Box sx={{ mb: 2 }}>
                <Typography variant="text2" sx={{ fontWeight: 600 }}>
                    {product.name}
                </Typography>
                <Typography
                    variant="text3"
                    color="textSecondary"
                    component="div"
                >
                    SKU {product.sku} · {formatNumber(product.stockQuantity)} in
                    stock
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <InputFieldController
                    control={control}
                    name="type"
                    label="Reason for change"
                    select
                    slotProps={{ htmlInput: { 'data-testid': TESTIDS.TYPE } }}
                >
                    {MANUAL_MOVEMENT_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                            {STOCK_MOVEMENT_TYPE_LABELS[type]}
                        </MenuItem>
                    ))}
                </InputFieldController>
                {values.type === StockMovementTypeEnum.ADJUSTMENT && (
                    <InputFieldController
                        control={control}
                        name="direction"
                        label="Direction"
                        select
                        slotProps={{
                            htmlInput: { 'data-testid': TESTIDS.DIRECTION },
                        }}
                    >
                        <MenuItem value="increase">Increase stock</MenuItem>
                        <MenuItem value="decrease">Decrease stock</MenuItem>
                    </InputFieldController>
                )}
                <InputFieldController
                    control={control}
                    name="quantity"
                    label="Quantity"
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                    slotProps={{
                        htmlInput: {
                            inputMode: 'numeric',
                            'data-testid': TESTIDS.QUANTITY,
                        },
                    }}
                />
                <InputFieldController
                    control={control}
                    name="reason"
                    label="Note"
                    optional={
                        values.type !== StockMovementTypeEnum.ADJUSTMENT &&
                        values.type !== StockMovementTypeEnum.DAMAGE
                    }
                    multiline
                    minRows={2}
                    placeholder="e.g. Purchase order #1042, stock count"
                    slotProps={{
                        htmlInput: { 'data-testid': TESTIDS.REASON },
                    }}
                />
                {delta !== 0 && (
                    <Typography
                        variant="text2"
                        data-testid={TESTIDS.RESULT}
                        color={newQuantity < 0 ? 'error' : 'textSecondary'}
                    >
                        New quantity:{' '}
                        <strong>{formatNumber(newQuantity)}</strong>
                    </Typography>
                )}
            </Box>
        </DialogForm>
    );
};

export default addTestIds(StockAdjustDialog, TESTIDS);
