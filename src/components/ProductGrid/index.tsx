import { Box } from '@mui/material';
import ProductCard from 'components/ProductCard';
import { StoreProductObjectType } from 'types/storeProduct';

export interface ProductGridProps {
    products: StoreProductObjectType[];
}

/** Responsive grid of product cards. */
const ProductGrid = ({ products }: ProductGridProps) => (
    <Box
        sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
                xs: 'repeat(2, minmax(0, 1fr))',
                md: 'repeat(3, minmax(0, 1fr))',
                lg: 'repeat(4, minmax(0, 1fr))',
            },
        }}
    >
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
    </Box>
);

export default ProductGrid;
