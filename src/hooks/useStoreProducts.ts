import { getStoreProducts } from 'api/ajApiStore';
import { PaginationResponseType } from 'types/pagination';
import {
    StoreProductObjectType,
    StoreProductsFilterType,
} from 'types/storeProduct';
import { createFetchHookWithPagination } from 'utils/hooks';

const useStoreProducts = createFetchHookWithPagination<
    StoreProductObjectType,
    PaginationResponseType<StoreProductObjectType>,
    StoreProductsFilterType
>(getStoreProducts);

export default useStoreProducts;
