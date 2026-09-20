import { Control, FieldValues, useFieldArray, useWatch } from 'react-hook-form';
import { Box, Button, IconButton, Typography } from '@mui/material';
import InputFieldController from 'components/InputFieldController';
import ProductImage from 'components/ProductImage';
import AddIcon from 'icons/AddIcon';
import DeleteIcon from 'icons/DeleteIcon';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    ADD: 'product-images-add',
    REMOVE: 'product-images-remove',
    URL: 'product-images-url',
};

export const MAX_PRODUCT_IMAGES = 10;

interface ImageRowProps {
    control: Control<any>;
    index: number;
    onRemove: () => void;
}

const ImageRow = ({ control, index, onRemove }: ImageRowProps) => {
    const url = useWatch({ control, name: `images.${index}.url` });

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
            <ProductImage src={url} size={40} />
            <InputFieldController
                control={control}
                name={`images.${index}.url`}
                label={
                    index === 0 ? 'Main image URL' : `Image URL ${index + 1}`
                }
                placeholder="https://"
                slotProps={{ htmlInput: { 'data-testid': TESTIDS.URL } }}
            />
            <IconButton
                data-testid={TESTIDS.REMOVE}
                aria-label={`Remove image ${index + 1}`}
                onClick={onRemove}
                sx={{ mt: 0.25 }}
            >
                <DeleteIcon fontSize="small" />
            </IconButton>
        </Box>
    );
};

export interface ProductImagesFieldProps<T extends FieldValues> {
    /** Control of a form that has an `images: { url: string }[]` field. */
    control: Control<T>;
}

/** List of image URLs, the first one is the main image. */
const ProductImagesField = <T extends FieldValues>({
    control: formControl,
}: ProductImagesFieldProps<T>) => {
    // The field array is addressed by name, so the form type is not needed inside
    const control = formControl as unknown as Control<any>;
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'images',
    });

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {fields.length === 0 && (
                <Typography variant="text2" color="textSecondary">
                    No images yet. Paste a link to an image hosted online.
                </Typography>
            )}
            {fields.map((field, index) => (
                <ImageRow
                    key={field.id}
                    control={control}
                    index={index}
                    onRemove={() => remove(index)}
                />
            ))}
            <Box>
                <Button
                    data-testid={TESTIDS.ADD}
                    startIcon={<AddIcon />}
                    disabled={fields.length >= MAX_PRODUCT_IMAGES}
                    onClick={() => append({ url: '' })}
                >
                    Add image
                </Button>
            </Box>
        </Box>
    );
};

export default addTestIds(ProductImagesField, TESTIDS);
