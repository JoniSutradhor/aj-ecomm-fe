import { useCallback } from 'react';
import {
    addToCart,
    clearCart,
    removeFromCart,
    updateCartQuantity,
} from 'store/cart/actions';
import {
    getCartCount,
    getCartItems,
    getCartSubtotal,
} from 'store/cart/selectors';
import { ORDER_LIMITS } from 'utils/orderLimits';
import useAppSelector from './useAppSelector';

const useCart = () => {
    const items = useAppSelector(getCartItems);
    const count = useAppSelector(getCartCount);
    const subtotal = useAppSelector(getCartSubtotal);

    /** Quantity of a product already in the cart. */
    const getQuantity = useCallback(
        (productId: number) =>
            items.find((item) => item.productId === productId)?.quantity ?? 0,
        [items]
    );

    return {
        items,
        count,
        /** No room for another product, only quantities can change. */
        isFull: items.length >= ORDER_LIMITS.maxLines,
        subtotal,
        getQuantity,
        add: addToCart,
        setQuantity: updateCartQuantity,
        remove: removeFromCart,
        clear: clearCart,
    };
};

export default useCart;
