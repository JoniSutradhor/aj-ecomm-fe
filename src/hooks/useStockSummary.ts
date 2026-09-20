import { getStockSummary } from 'api/ajApiStock';
import { StockSummaryType } from 'types/stock';
import { createFetchHook } from 'utils/hooks';

const useStockSummary = createFetchHook<StockSummaryType>(getStockSummary);

export default useStockSummary;
