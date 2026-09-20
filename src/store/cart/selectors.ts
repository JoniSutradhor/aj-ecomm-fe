import type { RootState } from 'store/index';

export const getCartItems = (state: RootState) => state.cart.items;
export const getCartCount = (state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const getCartSubtotal = (state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
