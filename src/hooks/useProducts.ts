import { getProducts } from 'api/ajApiProducts';
import { PaginationResponseType } from 'types/pagination';
import { ProductObjectType, ProductsFilterType } from 'types/product';
import { createFetchHookWithPagination } from 'utils/hooks';

const useProducts = createFetchHookWithPagination<
    ProductObjectType,
    PaginationResponseType<ProductObjectType>,
    ProductsFilterType
>(getProducts);

export default useProducts;
