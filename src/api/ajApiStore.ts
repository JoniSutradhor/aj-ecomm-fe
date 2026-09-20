import { AxiosRequestConfig } from 'axios';
import { PaginationResponseType } from 'types/pagination';
import {
    StoreCategoryObjectType,
    StoreProductObjectType,
    StoreProductsFilterType,
} from 'types/storeProduct';
import Requester from 'utils/requester';

export const getStoreProducts = (
    filter: StoreProductsFilterType | null,
    params: AxiosRequestConfig<any> = {}
): Promise<PaginationResponseType<StoreProductObjectType>> =>
    Requester.get('/store/products', { params: filter, ...params });

export const getStoreProduct = (
    slug: string | null,
    params: AxiosRequestConfig<any> = {}
): Promise<StoreProductObjectType> =>
    Requester.get(`/store/products/${encodeURIComponent(slug ?? '')}`, params);

export const getStoreCategories = (
    _?: unknown,
    params: AxiosRequestConfig<any> = {}
): Promise<Array<StoreCategoryObjectType>> =>
    Requester.get('/store/categories', params);
