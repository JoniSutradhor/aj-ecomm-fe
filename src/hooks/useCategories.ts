import { getCategories } from 'api/ajApiCategories';
import { CategoryObjectType } from 'types/category';
import { createFetchHook } from 'utils/hooks';

const useCategories = createFetchHook<Array<CategoryObjectType>>(getCategories);

export default useCategories;
