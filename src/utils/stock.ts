import { ManualStockMovementType, StockMovementTypeEnum } from 'types/stock';

export const STOCK_MOVEMENT_TYPE_LABELS: Record<StockMovementTypeEnum, string> =
    {
        [StockMovementTypeEnum.INITIAL]: 'Initial stock',
        [StockMovementTypeEnum.RESTOCK]: 'Restock',
        [StockMovementTypeEnum.ADJUSTMENT]: 'Adjustment',
        [StockMovementTypeEnum.DAMAGE]: 'Damaged / lost',
        [StockMovementTypeEnum.RETURN]: 'Customer return',
        [StockMovementTypeEnum.SALE]: 'Sale',
    };

export const STOCK_MOVEMENT_TYPE_OPTIONS = Object.values(
    StockMovementTypeEnum
).map((type) => ({ value: type, label: STOCK_MOVEMENT_TYPE_LABELS[type] }));

/** Types an admin can record, in the order they are shown. */
export const MANUAL_MOVEMENT_TYPES = [
    StockMovementTypeEnum.RESTOCK,
    StockMovementTypeEnum.ADJUSTMENT,
    StockMovementTypeEnum.DAMAGE,
    StockMovementTypeEnum.RETURN,
] as const satisfies readonly ManualStockMovementType[];

/** "+5" / "-3" */
export const formatDelta = (delta: number) =>
    delta > 0 ? `+${delta}` : String(delta);
