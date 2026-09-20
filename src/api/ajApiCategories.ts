import { AxiosRequestConfig } from 'axios';
import { CategoryFieldsType, CategoryObjectType } from 'types/category';
import Requester from 'utils/requester';

export const getCategories = (
    _?: unknown,
    params: AxiosRequestConfig<any> = {}
): Promise<Array<CategoryObjectType>> =>
    Requester.get('/admin/categories', params);

export const createCategory = (
    fields: CategoryFieldsType
): Promise<CategoryObjectType> => Requester.post('/admin/categories', fields);

export const updateCategory = (
    id: number,
    fields: Partial<CategoryFieldsType>
): Promise<CategoryObjectType> =>
    Requester.patch(`/admin/categories/${id}`, fields);

export const deleteCategory = (id: number): Promise<void> =>
    Requester.delete(`/admin/categories/${id}`);
