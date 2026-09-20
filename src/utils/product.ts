import { CartItemType } from 'types/cart';
import { ProductObjectType, StockStateEnum } from 'types/product';
import { StoreProductObjectType } from 'types/storeProduct';
import { ORDER_LIMITS } from './orderLimits';

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

/** Stock at or below this is shown to shoppers as "Only N left". */
export const STORE_LOW_STOCK = 5;

/** Whole percent saved against the compare at price, 0 when not on sale. */
export const getDiscountPercent = (
    price: number,
    compareAtPrice: number | null | undefined
) =>
    compareAtPrice && compareAtPrice > price
        ? Math.round((1 - price / compareAtPrice) * 100)
        : 0;

/** Most units of a product one order can hold: the stock, and the api limit per line. */
export const getMaxQuantity = (
    product: Pick<StoreProductObjectType, 'stockQuantity'>
) =>
    Math.max(
        0,
        Math.min(product.stockQuantity, ORDER_LIMITS.maxQuantityPerLine)
    );

/** Cart snapshot of a store product. */
export const getCartItem = (
    product: StoreProductObjectType
): Omit<CartItemType, 'quantity'> => ({
    productId: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: product.images[0],
    maxQuantity: getMaxQuantity(product),
});
