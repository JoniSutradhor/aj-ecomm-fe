import { TextField, TextFieldProps } from '@mui/material';

export type InputFieldProps = Omit<TextFieldProps, 'error'> & {
    /** Error message, shown under the field and turns the field red. */
    error?: string | boolean;
};

const InputField = ({ error, helperText, ...props }: InputFieldProps) => (
    <TextField
        {...props}
        error={Boolean(error)}
        helperText={typeof error === 'string' && error ? error : helperText}
    />
);

export default InputField;
