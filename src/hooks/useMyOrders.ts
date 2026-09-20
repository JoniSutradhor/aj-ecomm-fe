import { getMyOrders } from 'api/ajApiOrders';
import { MyOrdersFilterType, OrderObjectType } from 'types/order';
import { PaginationResponseType } from 'types/pagination';
import { createFetchHookWithPagination } from 'utils/hooks';

const useMyOrders = createFetchHookWithPagination<
    OrderObjectType,
    PaginationResponseType<OrderObjectType>,
    MyOrdersFilterType
>(getMyOrders);

export default useMyOrders;
