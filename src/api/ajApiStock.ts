import { AxiosRequestConfig } from 'axios';
import { PaginationResponseType } from 'types/pagination';
import {
    AdjustStockFieldsType,
    StockMovementObjectType,
    StockMovementsFilterType,
    StockSummaryType,
} from 'types/stock';
import Requester from 'utils/requester';

export const getStockSummary = (
    _?: unknown,
    params: AxiosRequestConfig<any> = {}
): Promise<StockSummaryType> => Requester.get('/admin/stock/summary', params);

export const getStockMovements = (
    filter: StockMovementsFilterType | null,
    params: AxiosRequestConfig<any> = {}
): Promise<PaginationResponseType<StockMovementObjectType>> =>
    Requester.get('/admin/stock/movements', { params: filter, ...params });

export const adjustStock = (
    fields: AdjustStockFieldsType
): Promise<StockMovementObjectType> =>
    Requester.post('/admin/stock/adjust', fields);
