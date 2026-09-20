import { PaginationFilterType } from './pagination';
import { ProductObjectType } from './product';

export enum StockMovementTypeEnum {
    INITIAL = 'initial',
    RESTOCK = 'restock',
    ADJUSTMENT = 'adjustment',
    DAMAGE = 'damage',
    RETURN = 'return',
    SALE = 'sale',
}

/** Types an admin can record by hand, the others are written by the system. */
export type ManualStockMovementType =
    | StockMovementTypeEnum.RESTOCK
    | StockMovementTypeEnum.ADJUSTMENT
    | StockMovementTypeEnum.DAMAGE
    | StockMovementTypeEnum.RETURN;

export interface StockMovementObjectType {
    id: number;
    productId: number;
    product?: Pick<ProductObjectType, 'id' | 'name' | 'sku'>;
    type: StockMovementTypeEnum;
    /** Signed change, positive adds units. */
    delta: number;
    quantityAfter: number;
    reason: string | null;
    userId: number | null;
    createdAt: string;
}

export interface StockSummaryType {
    totalProducts: number;
    totalUnits: number;
    lowStockProducts: number;
    outOfStockProducts: number;
    inventoryValue: number;
}

export interface AdjustStockFieldsType {
    productId: number;
    type: ManualStockMovementType;
    delta: number;
    reason?: string;
}

export interface StockMovementsFilterType extends PaginationFilterType {
    productId?: number;
    type?: StockMovementTypeEnum;
}
