import { getStoreCategories } from 'api/ajApiStore';
import { StoreCategoryObjectType } from 'types/storeProduct';
import { createFetchHook } from 'utils/hooks';

const useStoreCategories =
    createFetchHook<Array<StoreCategoryObjectType>>(getStoreCategories);

export default useStoreCategories;
