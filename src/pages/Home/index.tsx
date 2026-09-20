import { Link as RouterLink } from 'react-router';
import { Box, Button, Chip, Link, Typography } from '@mui/material';
import MessageCard from 'components/MessageCard';
import ProductGrid from 'components/ProductGrid';
import ProgressCard from 'components/ProgressCard';
import EmptyList from 'components/EmptyList';
import useStoreCategories from 'hooks/useStoreCategories';
import useStoreProducts from 'hooks/useStoreProducts';
import routes from 'routes/index';
import { StoreProductSortEnum } from 'types/storeProduct';
import { cssColor } from 'utils/colors';
import { queryStringStringify } from 'utils/querystring';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    HERO: 'home-hero',
    CATEGORY: 'home-category',
    PRODUCTS: 'home-products',
};

const NEW_ARRIVALS = { page: 1, limit: 8, sort: StoreProductSortEnum.NEWEST };

const Home = () => {
    const { items, error, isInitialized } = useStoreProducts(NEW_ARRIVALS);
    const { data: categories } = useStoreCategories();

    return (
        <>
            <title>AJ</title>
            <Box
                data-testid={TESTIDS.HERO}
                sx={{
                    backgroundColor: cssColor('brand50'),
                    borderRadius: 2,
                    px: { xs: 3, md: 8 },
                    py: { xs: 5, md: 8 },
                    mb: 4,
                }}
            >
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{ maxWidth: 560, fontSize: { xs: 28, md: 40 } }}
                >
                    Everything you need, all in one place
                </Typography>
                <Typography
                    variant="text1"
                    color="textSecondary"
                    sx={{ mt: 1.5, maxWidth: 480 }}
                >
                    Browse the latest products, add what you like to your cart
                    and check out whenever you are ready.
                </Typography>
                <Button
                    component={RouterLink}
                    to={routes.shop.path}
                    variant="contained"
                    size="large"
                    sx={{ mt: 3 }}
                >
                    Shop now
                </Button>
            </Box>

            {!!categories?.length && (
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h3" component="h2" sx={{ mb: 1.5 }}>
                        Shop by category
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {categories.map((category) => (
                            <Chip
                                key={category.id}
                                data-testid={TESTIDS.CATEGORY}
                                component={RouterLink}
                                to={`${routes.shop.path}?${queryStringStringify({ category: category.id })}`}
                                clickable
                                variant="outlined"
                                label={`${category.name} (${category.productCount})`}
                            />
                        ))}
                    </Box>
                </Box>
            )}

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    mb: 1.5,
                }}
            >
                <Typography variant="h3" component="h2">
                    New arrivals
                </Typography>
                <Link
                    component={RouterLink}
                    to={routes.shop.path}
                    variant="text2"
                    underline="hover"
                >
                    View all
                </Link>
            </Box>
            {error && <MessageCard error>{error}</MessageCard>}
            {!isInitialized && <ProgressCard />}
            {isInitialized && !error && !items.length && (
                <EmptyList
                    title="Coming soon"
                    text="We are stocking the shelves, please check back shortly."
                />
            )}
            {!!items.length && (
                <Box data-testid={TESTIDS.PRODUCTS}>
                    <ProductGrid products={items} />
                </Box>
            )}
        </>
    );
};

export default addTestIds(Home, TESTIDS);
