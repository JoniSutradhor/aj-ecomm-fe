import { getStockMovements } from 'api/ajApiStock';
import { PaginationResponseType } from 'types/pagination';
import { StockMovementObjectType, StockMovementsFilterType } from 'types/stock';
import { createFetchHookWithPagination } from 'utils/hooks';

const useStockMovements = createFetchHookWithPagination<
    StockMovementObjectType,
    PaginationResponseType<StockMovementObjectType>,
    StockMovementsFilterType
>(getStockMovements);

export default useStockMovements;
