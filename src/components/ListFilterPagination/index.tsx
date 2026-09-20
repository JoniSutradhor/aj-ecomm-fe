import { TablePagination } from '@mui/material';
import useFilterChange from 'hooks/useFilterChange';
import { DefaultFiltersEnum, ITEMS_PER_PAGE_OPTIONS } from 'types/pagination';

export interface ListFilterPaginationProps {
    /** Total number of items (all pages). */
    count: number;
}

/** Pagination bound to the `page` and `limit` url query parameters. */
const ListFilterPagination = ({ count }: ListFilterPaginationProps) => {
    const { value: page, handleChange: handlePageChange } =
        useFilterChange<number>('page', DefaultFiltersEnum.PAGE);
    const { value: limit, handleChange: handleLimitChange } =
        useFilterChange<number>(
            'limit',
            DefaultFiltersEnum.ITEMS_PER_PAGE,
            true
        );

    return (
        <TablePagination
            component="div"
            count={count}
            // MUI pages are 0 based, the url and the api are 1 based
            page={Math.max(page - 1, 0)}
            onPageChange={(_, newPage) => handlePageChange(newPage + 1)}
            rowsPerPage={limit}
            rowsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
            onRowsPerPageChange={(event) =>
                handleLimitChange(event.target.value)
            }
            sx={{ borderTop: 1, borderColor: 'divider' }}
        />
    );
};

export default ListFilterPagination;
