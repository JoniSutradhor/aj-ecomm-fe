import { useNavigate } from 'react-router';
import { z } from 'zod';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    MenuItem,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import InputFieldController from 'components/InputFieldController';
import PageHeader from 'components/PageHeader';
import { PRODUCT_STATUS_OPTIONS } from 'components/StatusChip';
import { toast } from 'core_components/Toaster';
import useHookForm from 'hooks/useHookForm';
import routes from 'routes/index';
import { CategoryObjectType } from 'types/category';
import { ZeroArgsFunctionType } from 'types/functions';
import {
    CreateProductFieldsType,
    ProductObjectType,
    ProductStatusEnum,
} from 'types/product';
import { addTestIds } from 'utils/testids';
import {
    zInteger,
    zOptionalInteger,
    zOptionalMax,
    zOptionalPrice,
    zOptionalUrl,
    zPrice,
    zRequiredMax,
} from 'utils/z';
import ProductImagesField, { MAX_PRODUCT_IMAGES } from '../ProductImagesField';
import ProductStockCard from '../ProductStockCard';

const TESTIDS = {
    FORM: 'product-form',
    NAME: 'product-name',
    DESCRIPTION: 'product-description',
    PRICE: 'product-price',
    COMPARE_AT_PRICE: 'product-compare-at-price',
    STATUS: 'product-status',
    CATEGORY: 'product-category',
    SKU: 'product-sku',
    LOW_STOCK_THRESHOLD: 'product-low-stock-threshold',
    INITIAL_STOCK: 'product-initial-stock',
    SAVE: 'product-save',
    CANCEL: 'product-cancel',
};

const FORM_ID = 'product-form';

const formSchema = z
    .object({
        name: zRequiredMax(200),
        sku: zRequiredMax(64),
        description: zOptionalMax(10000),
        price: zPrice(),
        compareAtPrice: zOptionalPrice(),
        status: z.enum(ProductStatusEnum),
        // '' means no category
        categoryId: z.string(),
        lowStockThreshold: zInteger(0),
        initialStock: zOptionalInteger(0),
        images: z
            .array(z.object({ url: zOptionalUrl() }))
            .max(MAX_PRODUCT_IMAGES),
    })
    .superRefine((values, context) => {
        if (
            values.compareAtPrice &&
            values.price &&
            Number(values.compareAtPrice) <= Number(values.price)
        ) {
            context.addIssue({
                code: 'custom',
                path: ['compareAtPrice'],
                message: 'Must be higher than the price',
            });
        }
    });

type FormValues = z.infer<typeof formSchema>;

const getInitialValues = (product: ProductObjectType | null): FormValues => ({
    name: product?.name ?? '',
    sku: product?.sku ?? '',
    description: product?.description ?? '',
    price: product ? String(product.price) : '',
    compareAtPrice:
        product?.compareAtPrice != null ? String(product.compareAtPrice) : '',
    status: product?.status ?? ProductStatusEnum.DRAFT,
    categoryId: product?.categoryId != null ? String(product.categoryId) : '',
    lowStockThreshold: String(product?.lowStockThreshold ?? 5),
    initialStock: '',
    images: (product?.images ?? []).map((url) => ({ url })),
});

export interface ProductFormProps {
    /** Product to edit, `null` creates a new one. */
    product: ProductObjectType | null;
    categories: CategoryObjectType[];
    /** Creates or updates the product. */
    onSave: (fields: CreateProductFieldsType) => Promise<unknown>;
    /** Called when the stock of the product changed (edit only). */
    onStockChange: ZeroArgsFunctionType;
}

const ProductForm = ({
    product,
    categories,
    onSave,
    onStockChange,
}: ProductFormProps) => {
    const navigate = useNavigate();
    const isNew = product === null;

    const {
        control,
        handleSubmit,
        setError,
        formState: { isSubmitting, isDirty },
    } = useHookForm({
        schema: formSchema,
        initialValues: getInitialValues(product),
        isInitialized: true,
        onSubmit: async (values) => {
            const fields: CreateProductFieldsType = {
                name: values.name,
                sku: values.sku,
                description: values.description || null,
                price: Number(values.price),
                compareAtPrice: values.compareAtPrice
                    ? Number(values.compareAtPrice)
                    : null,
                status: values.status,
                categoryId: values.categoryId
                    ? Number(values.categoryId)
                    : null,
                lowStockThreshold: Number(values.lowStockThreshold),
                images: values.images
                    .map((image) => image.url)
                    .filter((url) => url !== ''),
            };
            if (isNew && Number(values.initialStock) > 0) {
                fields.initialStock = Number(values.initialStock);
            }

            try {
                await onSave(fields);
            } catch (error) {
                const { message, statusCode } = error as Error & {
                    statusCode?: number;
                };
                if (statusCode === 409 && /sku/i.test(message)) {
                    setError('sku', { message });
                } else {
                    toast.error(message);
                }
                return;
            }
            toast.success(isNew ? 'Product created' : 'Product saved');
            if (isNew) {
                navigate(routes.adminProducts.path);
            }
        },
    });

    return (
        <>
            <PageHeader
                title={isNew ? 'New product' : product.name}
                breadcrumbs={[
                    { label: 'Products', to: routes.adminProducts.path },
                    { label: isNew ? 'New product' : product.name },
                ]}
                actions={
                    <>
                        <Button
                            data-testid={TESTIDS.CANCEL}
                            color="grey900"
                            onClick={() => navigate(routes.adminProducts.path)}
                        >
                            {isNew ? 'Cancel' : 'Back'}
                        </Button>
                        <Button
                            data-testid={TESTIDS.SAVE}
                            type="submit"
                            form={FORM_ID}
                            variant="contained"
                            disabled={!isNew && !isDirty}
                            loading={isSubmitting}
                        >
                            {isNew ? 'Create product' : 'Save changes'}
                        </Button>
                    </>
                }
            />
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Box
                        component="form"
                        id={FORM_ID}
                        data-testid={TESTIDS.FORM}
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                    >
                        <Card>
                            <CardHeader
                                title="Details"
                                slotProps={{ title: { variant: 'h3' } }}
                            />
                            <CardContent
                                sx={{
                                    pt: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                }}
                            >
                                <InputFieldController
                                    control={control}
                                    name="name"
                                    label="Name"
                                    slotProps={{
                                        htmlInput: {
                                            'data-testid': TESTIDS.NAME,
                                        },
                                    }}
                                />
                                <InputFieldController
                                    control={control}
                                    name="description"
                                    label="Description"
                                    optional
                                    multiline
                                    minRows={4}
                                    slotProps={{
                                        htmlInput: {
                                            'data-testid': TESTIDS.DESCRIPTION,
                                        },
                                    }}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader
                                title="Images"
                                slotProps={{ title: { variant: 'h3' } }}
                            />
                            <CardContent sx={{ pt: 0 }}>
                                <ProductImagesField control={control} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader
                                title="Pricing"
                                slotProps={{ title: { variant: 'h3' } }}
                            />
                            <CardContent sx={{ pt: 0 }}>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <InputFieldController
                                            control={control}
                                            name="price"
                                            label="Price"
                                            slotProps={{
                                                htmlInput: {
                                                    inputMode: 'decimal',
                                                    'data-testid':
                                                        TESTIDS.PRICE,
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <InputFieldController
                                            control={control}
                                            name="compareAtPrice"
                                            label="Compare-at price"
                                            optional
                                            helperText="Shown crossed out next to the price"
                                            slotProps={{
                                                htmlInput: {
                                                    inputMode: 'decimal',
                                                    'data-testid':
                                                        TESTIDS.COMPARE_AT_PRICE,
                                                },
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, lg: 4 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                    >
                        <Card>
                            <CardHeader
                                title="Organization"
                                slotProps={{ title: { variant: 'h3' } }}
                            />
                            <CardContent
                                sx={{
                                    pt: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                }}
                            >
                                <InputFieldController
                                    control={control}
                                    name="status"
                                    label="Status"
                                    select
                                    helperText="Only active products are sold"
                                    slotProps={{
                                        htmlInput: {
                                            'data-testid': TESTIDS.STATUS,
                                        },
                                    }}
                                >
                                    {PRODUCT_STATUS_OPTIONS.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </InputFieldController>
                                <InputFieldController
                                    control={control}
                                    name="categoryId"
                                    label="Category"
                                    select
                                    slotProps={{
                                        select: { displayEmpty: true },
                                        htmlInput: {
                                            'data-testid': TESTIDS.CATEGORY,
                                        },
                                    }}
                                >
                                    <MenuItem value="">No category</MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem
                                            key={category.id}
                                            value={String(category.id)}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </InputFieldController>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader
                                title="Inventory"
                                slotProps={{ title: { variant: 'h3' } }}
                            />
                            <CardContent
                                sx={{
                                    pt: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                }}
                            >
                                <InputFieldController
                                    control={control}
                                    name="sku"
                                    label="SKU"
                                    slotProps={{
                                        htmlInput: {
                                            'data-testid': TESTIDS.SKU,
                                        },
                                    }}
                                />
                                <InputFieldController
                                    control={control}
                                    name="lowStockThreshold"
                                    label="Low stock level"
                                    helperText="Warn when stock is at or below this"
                                    slotProps={{
                                        htmlInput: {
                                            inputMode: 'numeric',
                                            'data-testid':
                                                TESTIDS.LOW_STOCK_THRESHOLD,
                                        },
                                    }}
                                />
                                {isNew && (
                                    <InputFieldController
                                        control={control}
                                        name="initialStock"
                                        label="Initial stock"
                                        optional
                                        helperText="Units on hand now. Changed later with stock adjustments"
                                        slotProps={{
                                            htmlInput: {
                                                inputMode: 'numeric',
                                                'data-testid':
                                                    TESTIDS.INITIAL_STOCK,
                                            },
                                        }}
                                    />
                                )}
                            </CardContent>
                        </Card>

                        {!isNew && (
                            <ProductStockCard
                                product={product}
                                onChange={onStockChange}
                            />
                        )}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default addTestIds(ProductForm, TESTIDS);
