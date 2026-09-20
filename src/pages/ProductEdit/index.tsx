import { useParams } from 'react-router';
import MessageCard from 'components/MessageCard';
import PageHeader from 'components/PageHeader';
import ProgressCard from 'components/ProgressCard';
import { createProduct } from 'api/ajApiProducts';
import useCategories from 'hooks/useCategories';
import useProduct from 'hooks/useProduct';
import routes from 'routes/index';
import { CreateProductFieldsType } from 'types/product';
import { addTestIds } from 'utils/testids';
import NotFound from 'pages/NotFound';
import ProductForm from './components/ProductForm';

const TESTIDS = {
    PAGE: 'page-product-edit',
};

/** Create (`/admin/products/new`, no id) and edit (`/admin/products/:id`) a product. */
const ProductEdit = () => {
    const { id } = useParams();
    const isNew = id === undefined;
    const productId = isNew ? null : Number(id);
    const isValidId = isNew || Number.isInteger(productId);

    const { product, error, isInitialized, update, reload } = useProduct(
        isValidId ? productId : null
    );
    const { data: categories, error: categoriesError } = useCategories();

    if (!isValidId) {
        return <NotFound text="Product not found" />;
    }

    const breadcrumbs = [
        { label: 'Products', to: routes.adminProducts.path },
        { label: isNew ? 'New product' : 'Edit product' },
    ];

    if (error) {
        return (
            <>
                <PageHeader title="Product" breadcrumbs={breadcrumbs} />
                <MessageCard error>{error}</MessageCard>
            </>
        );
    }

    if ((!isNew && !isInitialized) || !categories) {
        return (
            <>
                <PageHeader
                    title={isNew ? 'New product' : 'Edit product'}
                    breadcrumbs={breadcrumbs}
                />
                {categoriesError ? (
                    <MessageCard error>{categoriesError}</MessageCard>
                ) : (
                    <ProgressCard />
                )}
            </>
        );
    }

    return (
        <div data-testid={TESTIDS.PAGE}>
            <ProductForm
                // A fresh form (and values) when another product is opened
                key={product?.id ?? 'new'}
                product={isNew ? null : product}
                categories={categories}
                onSave={(fields: CreateProductFieldsType) => {
                    if (isNew) {
                        return createProduct(fields);
                    }
                    // Stock is not editable here, `initialStock` only exists on create
                    const { initialStock, ...productFields } = fields;
                    void initialStock;
                    return update(productFields);
                }}
                onStockChange={() => reload(true)}
            />
        </div>
    );
};

export default addTestIds(ProductEdit, TESTIDS);
