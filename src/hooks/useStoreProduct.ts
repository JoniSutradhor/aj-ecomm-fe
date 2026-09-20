import { getStoreProduct } from 'api/ajApiStore';
import { StoreProductObjectType } from 'types/storeProduct';
import { createFetchHook } from 'utils/hooks';

const useStoreProductFetch = createFetchHook<StoreProductObjectType, string>(
    getStoreProduct
);

const useStoreProduct = (slug: string | undefined) => {
    const { data, ...rest } = useStoreProductFetch(
        slug ?? null,
        slug !== undefined
    );

    return { product: data, ...rest };
};

export default useStoreProduct;
