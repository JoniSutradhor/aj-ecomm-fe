import { useCallback } from 'react';
import { getProduct, updateProduct } from 'api/ajApiProducts';
import { ProductFieldsType, ProductObjectType } from 'types/product';
import { createFetchHook } from 'utils/hooks';

const useProductFetch = createFetchHook<ProductObjectType>(getProduct);

/** Pass `null` to skip fetching (new product). */
const useProduct = (id: number | null) => {
    const { data, reload, ...rest } = useProductFetch(id, id !== null);

    const update = useCallback(
        async (fields: ProductFieldsType) => {
            const product = await updateProduct(id as number, fields);
            await reload(true);
            return product;
        },
        [id, reload]
    );

    return {
        product: data,
        reload,
        update,
        ...rest,
    };
};

export default useProduct;
