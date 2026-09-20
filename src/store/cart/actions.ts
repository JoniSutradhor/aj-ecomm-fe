import store from 'store/index';
import { CartItemType } from 'types/cart';
import {
    addCartItem,
    cartStorageKey,
    clearCartItems,
    removeCartItem,
    setCartItemQuantity,
} from '.';

const persist = () => {
    try {
        window.localStorage.setItem(
            cartStorageKey,
            JSON.stringify(store.getState().cart.items)
        );
    } catch {
        // Storage blocked or full, the cart still works until the page is closed
    }
};

export const addToCart = (
    item: Omit<CartItemType, 'quantity'>,
    quantity = 1
) => {
    store.dispatch(addCartItem({ item, quantity }));
    persist();
};

export const updateCartQuantity = (productId: number, quantity: number) => {
    store.dispatch(setCartItemQuantity({ productId, quantity }));
    persist();
};

export const removeFromCart = (productId: number) => {
    store.dispatch(removeCartItem(productId));
    persist();
};

export const clearCart = () => {
    store.dispatch(clearCartItems());
    persist();
};
