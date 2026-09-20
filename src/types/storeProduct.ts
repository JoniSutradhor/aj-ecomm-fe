import { PaginationFilterType } from './pagination';

/** What shoppers see of a product (no sku, status or stock threshold). */
export interface StoreProductObjectType {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    compareAtPrice: number | null;
    images: string[];
    stockQuantity: number;
    category: { id: number; name: string; slug: string } | null;
}

export interface StoreCategoryObjectType {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    /** Active products only. */
    productCount: number;
}

export enum StoreProductSortEnum {
    NEWEST = 'newest',
    PRICE_ASC = 'price_asc',
    PRICE_DESC = 'price_desc',
    NAME = 'name',
}

export interface StoreProductsFilterType extends PaginationFilterType {
    search?: string;
    categoryId?: number;
    sort?: StoreProductSortEnum;
}
