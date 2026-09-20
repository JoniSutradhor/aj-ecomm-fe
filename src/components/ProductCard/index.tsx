import { Link as RouterLink } from 'react-router';
import {
    Box,
    Button,
    Card,
    CardActionArea,
    Chip,
    Typography,
} from '@mui/material';
import PriceTag from 'components/PriceTag';
import ProductPicture from 'components/ProductPicture';
import { toast } from 'core_components/Toaster';
import CartIcon from 'icons/CartIcon';
import useCart from 'hooks/useCart';
import routes from 'routes/index';
import { StoreProductObjectType } from 'types/storeProduct';
import { cssColor } from 'utils/colors';
import { getCartItem, getMaxQuantity } from 'utils/product';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    CARD: 'product-card',
    LINK: 'product-card-link',
    ADD: 'product-card-add',
    SOLD_OUT: 'product-card-sold-out',
};

export interface ProductCardProps {
    product: StoreProductObjectType;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { getQuantity, add, isFull } = useCart();
    const soldOut = product.stockQuantity <= 0;
    const inCart = getQuantity(product.id);
    const atLimit =
        inCart >= getMaxQuantity(product) || (isFull && inCart === 0);

    let buttonLabel = 'Add to cart';
    if (soldOut) {
        buttonLabel = 'Sold out';
    } else if (atLimit) {
        buttonLabel = 'Max in cart';
    }

    return (
        <Card
            data-testid={TESTIDS.CARD}
            sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
            <CardActionArea
                data-testid={TESTIDS.LINK}
                component={RouterLink}
                to={routes.product.pathWithId(product.slug, 'slug')}
                sx={{ flexGrow: 1 }}
            >
                <Box sx={{ position: 'relative' }}>
                    <ProductPicture
                        src={product.images[0]}
                        alt={product.name}
                    />
                    {soldOut && (
                        <Chip
                            data-testid={TESTIDS.SOLD_OUT}
                            size="small"
                            label="Sold out"
                            sx={{
                                position: 'absolute',
                                top: 8,
                                left: 8,
                                backgroundColor: cssColor('white'),
                                color: cssColor('grey1000'),
                            }}
                        />
                    )}
                </Box>
                <Box sx={{ p: 2 }}>
                    {product.category && (
                        <Typography
                            variant="text3"
                            color="textSecondary"
                            component="div"
                        >
                            {product.category.name}
                        </Typography>
                    )}
                    <Typography
                        variant="text2"
                        component="h3"
                        sx={{
                            fontWeight: 600,
                            mb: 0.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {product.name}
                    </Typography>
                    <PriceTag
                        price={product.price}
                        compareAtPrice={product.compareAtPrice}
                    />
                </Box>
            </CardActionArea>
            <Box sx={{ px: 2, pb: 2 }}>
                <Button
                    data-testid={TESTIDS.ADD}
                    fullWidth
                    variant="outlined"
                    startIcon={<CartIcon fontSize="small" />}
                    disabled={soldOut || atLimit}
                    aria-label={`Add ${product.name} to cart`}
                    onClick={() => {
                        add(getCartItem(product));
                        toast.success(`${product.name} added to cart`);
                    }}
                >
                    {buttonLabel}
                </Button>
            </Box>
        </Card>
    );
};

export default addTestIds(ProductCard, TESTIDS);
