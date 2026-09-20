import { AxiosRequestConfig } from 'axios';
import {
    MyOrdersFilterType,
    OrderObjectType,
    PlaceOrderFieldsType,
    TrackOrderFieldsType,
} from 'types/order';
import { PaginationResponseType } from 'types/pagination';
import Requester from 'utils/requester';

/** Guests and signed in customers, a signed in order is linked to the account. */
export const placeOrder = (
    fields: PlaceOrderFieldsType
): Promise<OrderObjectType> => Requester.post('/store/orders', fields);

export const trackOrder = (
    params: TrackOrderFieldsType
): Promise<OrderObjectType> => Requester.get('/store/orders/track', { params });

export const getMyOrders = (
    filter: MyOrdersFilterType | null,
    params: AxiosRequestConfig<any> = {}
): Promise<PaginationResponseType<OrderObjectType>> =>
    Requester.get('/store/orders/mine', { params: filter, ...params });

export const cancelMyOrder = (orderNumber: string): Promise<OrderObjectType> =>
    Requester.patch(`/store/orders/${encodeURIComponent(orderNumber)}/cancel`);
