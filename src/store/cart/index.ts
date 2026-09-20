import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemType } from 'types/cart';
import { ORDER_LIMITS } from 'utils/orderLimits';

export const cartStorageKey = 'aj_cart';

export type CartState = {
    items: CartItemType[];
};

const isCartItem = (value: unknown): value is CartItemType => {
    const item = value as CartItemType;
    return (
        !!item &&
        Number.isInteger(item.productId) &&
        typeof item.slug === 'string' &&
        typeof item.name === 'string' &&
        typeof item.price === 'number' &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0 &&
        Number.isInteger(item.maxQuantity)
    );
};

/** Saved carts may predate the current limits. */
const clampSaved = (item: CartItemType): CartItemType => {
    const maxQuantity = Math.min(
        item.maxQuantity,
        ORDER_LIMITS.maxQuantityPerLine
    );
    return {
        ...item,
        maxQuantity,
        quantity: Math.min(item.quantity, maxQuantity),
    };
};

/** The cart survives reloads, anything unreadable in storage is ignored. */
const getInitialItems = (): CartItemType[] => {
    try {
        const stored = JSON.parse(
            window.localStorage.getItem(cartStorageKey) || '[]'
        );
        return Array.isArray(stored)
            ? stored.filter(isCartItem).map(clampSaved)
            : [];
    } catch {
        return [];
    }
};

export const defaultState: CartState = {
    items: getInitialItems(),
};

const clamp = (quantity: number, max: number) =>
    Math.max(0, Math.min(Math.floor(quantity), max));

const cartSlice = createSlice({
    name: 'cart',
    initialState: defaultState,
    reducers: {
        addCartItem: (
            state,
            action: PayloadAction<{
                item: Omit<CartItemType, 'quantity'>;
                quantity: number;
            }>
        ) => {
            const { item, quantity } = action.payload;
            const existing = state.items.find(
                (cartItem) => cartItem.productId === item.productId
            );
            if (existing) {
                // Refresh the snapshot, price and stock may have changed
                Object.assign(existing, item);
                existing.quantity = clamp(
                    existing.quantity + quantity,
                    item.maxQuantity
                );
            } else {
                const next = clamp(quantity, item.maxQuantity);
                // The api accepts a limited number of lines per order
                if (next > 0 && state.items.length < ORDER_LIMITS.maxLines) {
                    state.items.push({ ...item, quantity: next });
                }
            }
        },
        setCartItemQuantity: (
            state,
            action: PayloadAction<{ productId: number; quantity: number }>
        ) => {
            const { productId, quantity } = action.payload;
            const existing = state.items.find(
                (cartItem) => cartItem.productId === productId
            );
            if (!existing) return state;
            const next = clamp(quantity, existing.maxQuantity);
            if (next > 0) {
                existing.quantity = next;
                return state;
            }
            return {
                ...state,
                items: state.items.filter(
                    (cartItem) => cartItem.productId !== productId
                ),
            };
        },
        removeCartItem: (state, action: PayloadAction<number>) => ({
            ...state,
            items: state.items.filter(
                (cartItem) => cartItem.productId !== action.payload
            ),
        }),
        clearCartItems: (state) => ({ ...state, items: [] }),
    },
});

export const {
    addCartItem,
    setCartItemQuantity,
    removeCartItem,
    clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
