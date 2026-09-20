export enum DefaultFiltersEnum {
    PAGE = 1,
    ITEMS_PER_PAGE = 20,
}

export const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

export type PaginationFilterType = {
    page?: number;
    limit?: number;
};

export type PaginationResponseType<T1> = {
    items: T1[];
    total: number;
    page: number;
    limit: number;
};
