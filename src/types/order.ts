import { PaginationFilterType } from './pagination';

export enum OrderStatusEnum {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}

export enum PaymentMethodEnum {
    /** Cash on delivery. */
    COD = 'cod',
}

export enum PaymentStatusEnum {
    UNPAID = 'unpaid',
    PAID = 'paid',
}

export interface OrderItemObjectType {
    id: number;
    /** Null once the product has been deleted. */
    productId: number | null;
    name: string;
    sku: string;
    image: string | null;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
}

export interface OrderObjectType {
    id: number;
    /** Public reference, e.g. AJ-000042. */
    orderNumber: string;
    status: OrderStatusEnum;
    paymentMethod: PaymentMethodEnum;
    paymentStatus: PaymentStatusEnum;
    fullName: string;
    email: string;
    phone: string;
    addressLine: string;
    city: string;
    postalCode: string | null;
    notes: string | null;
    subtotal: number;
    shippingFee: number;
    total: number;
    items: OrderItemObjectType[];
    createdAt: string;
    updatedAt: string;
}

/** Prices are never sent, the api reads them from the catalog. */
export interface PlaceOrderFieldsType {
    items: { productId: number; quantity: number }[];
    fullName: string;
    email: string;
    phone: string;
    addressLine: string;
    city: string;
    postalCode?: string;
    notes?: string;
}

export interface TrackOrderFieldsType {
    orderNumber: string;
    email: string;
}

export interface MyOrdersFilterType extends PaginationFilterType {
    status?: OrderStatusEnum;
}
