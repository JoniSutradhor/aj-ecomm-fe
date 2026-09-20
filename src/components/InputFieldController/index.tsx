import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import InputField, { InputFieldProps } from 'components/InputField';
import { SetFunctionType } from 'types/functions';
import { ChangeEventType } from 'types/types';

export type InputFieldControllerProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    optional?: boolean;
    onChange?: SetFunctionType<ChangeEventType>;
} & Omit<InputFieldProps, 'name' | 'onChange' | 'error'>;

/** `InputField` connected to react-hook-form, the validation error is shown automatically. */
const InputFieldController = <T extends FieldValues>({
    name,
    control,
    optional = false,
    label,
    onChange,
    ...props
}: InputFieldControllerProps<T>) => (
    <Controller
        name={name}
        control={control}
        render={({
            field: { ref, onChange: fieldOnChange, ...field },
            fieldState,
        }) => (
            <InputField
                {...props}
                {...field}
                inputRef={ref}
                label={optional ? <>{label} (optional)</> : label}
                error={fieldState.error?.message}
                onChange={(event) => {
                    fieldOnChange(event.target.value);
                    onChange?.(event);
                }}
            />
        )}
    />
);

export default InputFieldController;
