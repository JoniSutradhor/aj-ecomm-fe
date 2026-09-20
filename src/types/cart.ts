/** A product snapshot kept in the cart, the api re-checks price and stock at checkout. */
export interface CartItemType {
    productId: number;
    slug: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
    /** Stock available when the item was added, quantity never goes above it. */
    maxQuantity: number;
}
