import { CategoryObjectType } from './category';
import { PaginationFilterType } from './pagination';

export enum ProductStatusEnum {
    DRAFT = 'draft',
    ACTIVE = 'active',
    ARCHIVED = 'archived',
}

export interface ProductObjectType {
    id: number;
    name: string;
    slug: string;
    sku: string;
    description: string | null;
    price: number;
    compareAtPrice: number | null;
    status: ProductStatusEnum;
    images: string[];
    stockQuantity: number;
    lowStockThreshold: number;
    categoryId: number | null;
    category: CategoryObjectType | null;
    createdAt: string;
    updatedAt: string;
}

/** Create and update payload. `null` clears an optional field on update. */
export interface ProductFieldsType {
    name?: string;
    sku?: string;
    description?: string | null;
    price?: number;
    compareAtPrice?: number | null;
    status?: ProductStatusEnum;
    images?: string[];
    lowStockThreshold?: number;
    categoryId?: number | null;
}

export interface CreateProductFieldsType extends ProductFieldsType {
    name: string;
    sku: string;
    price: number;
    /** Creates an initial stock movement, stock is not editable afterwards. */
    initialStock?: number;
}

export interface ProductsFilterType extends PaginationFilterType {
    search?: string;
    status?: ProductStatusEnum;
    categoryId?: number;
    lowStock?: boolean;
}

export enum StockStateEnum {
    IN_STOCK = 'in_stock',
    LOW = 'low',
    OUT = 'out',
}
