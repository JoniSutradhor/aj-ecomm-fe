import { Box, Pagination } from '@mui/material';
import ListContainer from 'components/ListContainer';
import ListFilterContainer from 'components/ListFilterContainer';
import ListFilterInput from 'components/ListFilterInput';
import ListFilterSelect from 'components/ListFilterSelect';
import MessageCard from 'components/MessageCard';
import PageHeader from 'components/PageHeader';
import ProductGrid from 'components/ProductGrid';
import useFilterChange from 'hooks/useFilterChange';
import useStoreCategories from 'hooks/useStoreCategories';
import useStoreProducts from 'hooks/useStoreProducts';
import useStoreProductsFilter from 'hooks/useStoreProductsFilter';
import { DefaultFiltersEnum } from 'types/pagination';
import { StoreProductSortEnum } from 'types/storeProduct';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    PRODUCTS: 'shop-products',
    PAGINATION: 'shop-pagination',
    COUNT: 'shop-count',
};

const SORT_OPTIONS = [
    { value: StoreProductSortEnum.PRICE_ASC, label: 'Price: low to high' },
    { value: StoreProductSortEnum.PRICE_DESC, label: 'Price: high to low' },
    { value: StoreProductSortEnum.NAME, label: 'Name: A to Z' },
];

const Shop = () => {
    const { filter, isFiltered } = useStoreProductsFilter();
    const { items, count, pages, error, isInitialized, isPending } =
        useStoreProducts(filter);
    const { data: categories } = useStoreCategories();
    const { handleChange: handlePageChange } = useFilterChange<number>(
        'page',
        DefaultFiltersEnum.PAGE
    );

    const category = categories?.find(({ id }) => id === filter.categoryId);
    let title = 'All products';
    if (filter.search) {
        title = `Results for “${filter.search}”`;
    } else if (category) {
        title = category.name;
    }

    return (
        <>
            <PageHeader
                title={title}
                subtitle={
                    isInitialized && !error ? (
                        <span data-testid={TESTIDS.COUNT}>
                            {`${count} ${count === 1 ? 'product' : 'products'}`}
                        </span>
                    ) : undefined
                }
            />
            <ListFilterContainer>
                <ListFilterInput
                    name="search"
                    placeholder="Search products"
                    ariaLabel="Search products"
                />
                <ListFilterSelect
                    name="category"
                    allLabel="All categories"
                    options={(categories ?? []).map((item) => ({
                        value: item.id,
                        label: `${item.name} (${item.productCount})`,
                    }))}
                />
                <ListFilterSelect
                    name="sort"
                    allLabel="Newest"
                    options={SORT_OPTIONS}
                    minWidth={200}
                />
            </ListFilterContainer>
            {error ? (
                <MessageCard error>{error}</MessageCard>
            ) : (
                <ListContainer
                    count={count}
                    pending={isPending}
                    initialized={isInitialized}
                    filtered={isFiltered}
                    emptyTitle="No products yet"
                    emptyText="We are stocking the shelves, please check back shortly."
                >
                    <Box data-testid={TESTIDS.PRODUCTS}>
                        <ProductGrid products={items} />
                    </Box>
                    {pages > 1 && (
                        <Box
                            data-testid={TESTIDS.PAGINATION}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mt: 4,
                            }}
                        >
                            <Pagination
                                count={pages}
                                page={filter.page}
                                onChange={(_, page) => handlePageChange(page)}
                                color="primary"
                                shape="rounded"
                            />
                        </Box>
                    )}
                </ListContainer>
            )}
        </>
    );
};

export default addTestIds(Shop, TESTIDS);
