import { FormControlLabel, Switch } from '@mui/material';
import useFilterChange from 'hooks/useFilterChange';

export interface ListFilterSwitchProps {
    /** Url query parameter name, `1` when on and removed when off. */
    name: string;
    label: string;
}

const ListFilterSwitch = ({ name, label }: ListFilterSwitchProps) => {
    const { value, handleChange } = useFilterChange(name, '', true);

    return (
        <FormControlLabel
            label={label}
            control={
                <Switch
                    checked={value === '1'}
                    onChange={(event) =>
                        handleChange(event.target.checked ? '1' : '')
                    }
                />
            }
        />
    );
};

export default ListFilterSwitch;
