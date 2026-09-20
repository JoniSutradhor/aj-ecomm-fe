import { AxiosRequestConfig } from 'axios';
import { PaginationResponseType } from 'types/pagination';
import {
    CreateProductFieldsType,
    ProductFieldsType,
    ProductObjectType,
    ProductsFilterType,
} from 'types/product';
import Requester from 'utils/requester';

export const getProducts = (
    filter: ProductsFilterType | null,
    params: AxiosRequestConfig<any> = {}
): Promise<PaginationResponseType<ProductObjectType>> =>
    Requester.get('/admin/products', {
        // The api only accepts lowStock=true, false is the same as not filtering
        params: { ...filter, lowStock: filter?.lowStock || undefined },
        ...params,
    });

export const getProduct = (
    id: number | null,
    params: AxiosRequestConfig<any> = {}
): Promise<ProductObjectType> => Requester.get(`/admin/products/${id}`, params);

export const createProduct = (
    fields: CreateProductFieldsType
): Promise<ProductObjectType> => Requester.post('/admin/products', fields);

export const updateProduct = (
    id: number,
    fields: ProductFieldsType
): Promise<ProductObjectType> =>
    Requester.patch(`/admin/products/${id}`, fields);

export const deleteProduct = (id: number): Promise<void> =>
    Requester.delete(`/admin/products/${id}`);
