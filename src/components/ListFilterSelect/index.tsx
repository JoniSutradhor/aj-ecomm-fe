import { MenuItem, TextField } from '@mui/material';
import useFilterChange from 'hooks/useFilterChange';

export interface ListFilterSelectOption {
    value: string | number;
    label: string;
}

export interface ListFilterSelectProps {
    /** Url query parameter name. */
    name: string;
    /** Label of the "no filter" option, also used as the accessible name. */
    allLabel: string;
    options: ListFilterSelectOption[];
    minWidth?: number;
}

/** Select bound to a url query parameter, the empty value means no filter. */
const ListFilterSelect = ({
    name,
    allLabel,
    options,
    minWidth = 180,
}: ListFilterSelectProps) => {
    const { value, handleChange } = useFilterChange(name, '', true);

    return (
        <TextField
            select
            value={value}
            onChange={(event) => handleChange(event.target.value)}
            slotProps={{
                select: { displayEmpty: true },
                htmlInput: { 'aria-label': allLabel },
            }}
            sx={{ minWidth, width: { xs: '100%', sm: 'auto' } }}
        >
            <MenuItem value="">{allLabel}</MenuItem>
            {options.map((option) => (
                <MenuItem key={option.value} value={String(option.value)}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default ListFilterSelect;
