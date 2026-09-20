import { ProductObjectType, StockStateEnum } from 'types/product';

export const getStockState = (
    product: Pick<ProductObjectType, 'stockQuantity' | 'lowStockThreshold'>
): StockStateEnum => {
    if (product.stockQuantity <= 0) {
        return StockStateEnum.OUT;
    }
    if (product.stockQuantity <= product.lowStockThreshold) {
        return StockStateEnum.LOW;
    }
    return StockStateEnum.IN_STOCK;
};
