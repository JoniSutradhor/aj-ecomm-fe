import { useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router';
import { Box, Button, ButtonBase, Chip, Typography } from '@mui/material';
import EmptyList from 'components/EmptyList';
import PageHeader from 'components/PageHeader';
import PriceTag from 'components/PriceTag';
import ProductPicture from 'components/ProductPicture';
import ProgressCard from 'components/ProgressCard';
import QuantityInput from 'components/QuantityInput';
import { toast } from 'core_components/Toaster';
import CartIcon from 'icons/CartIcon';
import useCart from 'hooks/useCart';
import useStoreProduct from 'hooks/useStoreProduct';
import routes from 'routes/index';
import { StoreProductObjectType } from 'types/storeProduct';
import { cssColor } from 'utils/colors';
import { STORE_LOW_STOCK, getCartItem, getMaxQuantity } from 'utils/product';
import { queryStringStringify } from 'utils/querystring';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    NAME: 'product-detail-name',
    STOCK: 'product-detail-stock',
    ADD: 'product-detail-add',
    VIEW_CART: 'product-detail-view-cart',
    THUMBNAIL: 'product-detail-thumbnail',
    NOT_FOUND: 'product-detail-not-found',
};

interface ProductDetailContentProps {
    product: StoreProductObjectType;
}

const ProductDetailContent = ({ product }: ProductDetailContentProps) => {
    const { getQuantity, add, isFull } = useCart();
    const [imageIndex, setImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const inCart = getQuantity(product.id);
    const available =
        isFull && inCart === 0
            ? 0
            : Math.max(getMaxQuantity(product) - inCart, 0);
    const soldOut = product.stockQuantity <= 0;
    const selected = Math.min(quantity, Math.max(available, 1));

    let stockText = 'In stock';
    let stockColor = cssColor('success700');
    if (soldOut) {
        stockText = 'Out of stock';
        stockColor = cssColor('danger700');
    } else if (product.stockQuantity <= STORE_LOW_STOCK) {
        stockText = `Only ${product.stockQuantity} left`;
        stockColor = cssColor('warning700');
    }

    return (
        <>
            <PageHeader
                title={product.name}
                breadcrumbs={[
                    { label: 'Shop', to: routes.shop.path },
                    ...(product.category
                        ? [
                              {
                                  label: product.category.name,
                                  to: `${routes.shop.path}?${queryStringStringify({ category: product.category.id })}`,
                              },
                          ]
                        : []),
                    { label: product.name },
                ]}
            />
            <Box
                sx={{
                    display: 'grid',
                    gap: { xs: 3, md: 6 },
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    alignItems: 'start',
                }}
            >
                <Box>
                    <ProductPicture
                        src={product.images[imageIndex]}
                        alt={product.name}
                        sx={{ borderRadius: 2 }}
                    />
                    {product.images.length > 1 && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1,
                                mt: 1.5,
                            }}
                        >
                            {product.images.map((image, index) => (
                                <ButtonBase
                                    // The same url may be listed twice
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={`${image}-${index}`}
                                    data-testid={TESTIDS.THUMBNAIL}
                                    aria-label={`Show image ${index + 1}`}
                                    aria-pressed={index === imageIndex}
                                    onClick={() => setImageIndex(index)}
                                    sx={{
                                        width: 64,
                                        borderRadius: 1,
                                        overflow: 'hidden',
                                        border: `2px solid ${
                                            index === imageIndex
                                                ? cssColor('brand600')
                                                : cssColor('grey200')
                                        }`,
                                    }}
                                >
                                    <ProductPicture src={image} alt="" />
                                </ButtonBase>
                            ))}
                        </Box>
                    )}
                </Box>
                <Box>
                    {product.category && (
                        <Chip
                            size="small"
                            variant="outlined"
                            label={product.category.name}
                            sx={{ mb: 1.5 }}
                        />
                    )}
                    <Typography
                        data-testid={TESTIDS.NAME}
                        variant="h1"
                        component="p"
                        sx={{ mb: 1.5 }}
                    >
                        {product.name}
                    </Typography>
                    <PriceTag
                        large
                        price={product.price}
                        compareAtPrice={product.compareAtPrice}
                    />
                    <Typography
                        data-testid={TESTIDS.STOCK}
                        variant="text2"
                        sx={{ mt: 1, fontWeight: 600, color: stockColor }}
                    >
                        {stockText}
                    </Typography>
                    {product.description && (
                        <Typography
                            variant="text1"
                            color="textSecondary"
                            sx={{ mt: 3, whiteSpace: 'pre-line' }}
                        >
                            {product.description}
                        </Typography>
                    )}
                    <Box
                        sx={{
                            mt: 4,
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <QuantityInput
                            value={selected}
                            onChange={setQuantity}
                            max={available}
                            label={product.name}
                        />
                        <Button
                            data-testid={TESTIDS.ADD}
                            variant="contained"
                            size="large"
                            startIcon={<CartIcon />}
                            disabled={available <= 0}
                            onClick={() => {
                                add(getCartItem(product), selected);
                                setQuantity(1);
                                toast.success(`${product.name} added to cart`);
                            }}
                        >
                            {soldOut ? 'Sold out' : 'Add to cart'}
                        </Button>
                    </Box>
                    {inCart > 0 && (
                        <Typography variant="text2" sx={{ mt: 2 }}>
                            {`${inCart} in your cart. `}
                            <Button
                                data-testid={TESTIDS.VIEW_CART}
                                component={RouterLink}
                                to={routes.cart.path}
                                size="small"
                            >
                                View cart
                            </Button>
                        </Typography>
                    )}
                </Box>
            </Box>
        </>
    );
};

const ProductDetail = () => {
    const { slug } = useParams();
    const { product, error, isInitialized } = useStoreProduct(slug);
    // The hook keeps the previous product until the next one arrives
    const current = product?.slug === slug ? product : null;

    if (error) {
        return (
            <Box data-testid={TESTIDS.NOT_FOUND}>
                <title>Product not found | AJ</title>
                <EmptyList
                    title="We couldn't find this product"
                    text="It may have been removed or is no longer available."
                />
                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        component={RouterLink}
                        to={routes.shop.path}
                        variant="contained"
                    >
                        Back to shop
                    </Button>
                </Box>
            </Box>
        );
    }

    if (!isInitialized || !current) {
        return <ProgressCard />;
    }

    return <ProductDetailContent key={current.id} product={current} />;
};

export default addTestIds(ProductDetail, TESTIDS);
