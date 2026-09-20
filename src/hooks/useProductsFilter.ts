import { useMemo } from 'react';
import { DefaultFiltersEnum } from 'types/pagination';
import { ProductStatusEnum, ProductsFilterType } from 'types/product';
import useQueryParams from './useQueryParams';

/**
 * Builds the products api filter from the url query
 * (`page`, `limit`, `search`, `status`, `category`, `low_stock=1`).
 * `isFiltered` is true when any filter besides paging is active.
 */
const useProductsFilter = () => {
    const params = useQueryParams();

    return useMemo(() => {
        const filter: ProductsFilterType = {
            page: Number(params.page) || DefaultFiltersEnum.PAGE,
            limit: Number(params.limit) || DefaultFiltersEnum.ITEMS_PER_PAGE,
            search: params.search || undefined,
            status: (params.status as ProductStatusEnum) || undefined,
            categoryId: Number(params.category) || undefined,
            lowStock: params.low_stock === '1',
        };
        const isFiltered =
            !!filter.search ||
            !!filter.status ||
            !!filter.categoryId ||
            !!filter.lowStock;

        return { filter, isFiltered };
    }, [params]);
};

export default useProductsFilter;
