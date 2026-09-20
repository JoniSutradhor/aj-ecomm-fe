import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from 'icons/SearchIcon';
import useFilterChangeInput from 'hooks/useFilterChangeInput';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    INPUT: 'list-filter-input',
};

export interface ListFilterInputProps {
    /** Url query parameter name. */
    name: string;
    placeholder?: string;
    ariaLabel?: string;
}

/** Search box bound to a url query parameter (debounced). */
const ListFilterInput = ({
    name,
    placeholder = 'Search',
    ariaLabel = 'Search',
}: ListFilterInputProps) => {
    const { value, handleChange } = useFilterChangeInput(name);

    return (
        <TextField
            value={value}
            onChange={(event) => handleChange(event.target.value)}
            placeholder={placeholder}
            slotProps={{
                htmlInput: {
                    'aria-label': ariaLabel,
                    'data-testid': TESTIDS.INPUT,
                },
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                        </InputAdornment>
                    ),
                },
            }}
            sx={{ width: { xs: '100%', sm: 320 } }}
        />
    );
};

export default addTestIds(ListFilterInput, TESTIDS);
