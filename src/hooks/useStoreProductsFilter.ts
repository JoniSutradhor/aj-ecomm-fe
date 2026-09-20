import { useMemo } from 'react';
import { DefaultFiltersEnum } from 'types/pagination';
import {
    StoreProductSortEnum,
    StoreProductsFilterType,
} from 'types/storeProduct';
import useQueryParams from './useQueryParams';

/** Products per page of the shop, a multiple of the grid columns (2, 3, 4). */
export const SHOP_PAGE_SIZE = 12;

/**
 * Builds the shop api filter from the url query
 * (`page`, `search`, `category`, `sort`).
 * `isFiltered` is true when any filter besides paging and sorting is active.
 */
const useStoreProductsFilter = () => {
    const params = useQueryParams();

    return useMemo(() => {
        const sort = Object.values(StoreProductSortEnum).find(
            (value) => value === params.sort
        );
        const filter: StoreProductsFilterType = {
            page: Number(params.page) || DefaultFiltersEnum.PAGE,
            limit: SHOP_PAGE_SIZE,
            search: params.search || undefined,
            categoryId: Number(params.category) || undefined,
            sort,
        };
        const isFiltered = !!filter.search || !!filter.categoryId;

        return { filter, isFiltered };
    }, [params]);
};

export default useStoreProductsFilter;
