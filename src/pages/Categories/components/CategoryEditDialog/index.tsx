import { z } from 'zod';
import { Box } from '@mui/material';
import { createCategory, updateCategory } from 'api/ajApiCategories';
import DialogForm from 'components/DialogForm';
import InputFieldController from 'components/InputFieldController';
import { toast } from 'core_components/Toaster';
import useHookForm from 'hooks/useHookForm';
import { CategoryObjectType } from 'types/category';
import { ZeroArgsFunctionType } from 'types/functions';
import { addTestIds } from 'utils/testids';
import { zOptionalMax, zRequiredMax } from 'utils/z';

const TESTIDS = {
    DIALOG: 'category-edit-dialog',
    NAME: 'category-name',
    DESCRIPTION: 'category-description',
};

const formSchema = z.object({
    name: zRequiredMax(100),
    description: zOptionalMax(1000),
});

type FormValues = z.infer<typeof formSchema>;

export interface CategoryEditDialogProps {
    /** Category to edit, `null` creates a new one. */
    category: CategoryObjectType | null;
    onClose: ZeroArgsFunctionType;
    onAfterSubmit?: ZeroArgsFunctionType;
}

const CategoryEditDialog = ({
    category,
    onClose,
    onAfterSubmit,
}: CategoryEditDialogProps) => {
    const isNew = category === null;

    const initialValues: FormValues = {
        name: category?.name ?? '',
        description: category?.description ?? '',
    };

    const {
        control,
        handleSubmit,
        setError,
        formState: { isSubmitting },
    } = useHookForm({
        schema: formSchema,
        initialValues,
        isInitialized: true,
        ignoreReset: true,
        onSubmit: async (values) => {
            const fields = {
                name: values.name,
                description: values.description || undefined,
            };
            try {
                await (isNew
                    ? createCategory(fields)
                    : updateCategory(category.id, fields));
            } catch (error) {
                const { message, statusCode } = error as Error & {
                    statusCode?: number;
                };
                if (statusCode === 409) {
                    setError('name', { message });
                } else {
                    toast.error(message);
                }
                return;
            }
            toast.success(isNew ? 'Category created' : 'Category updated');
            onAfterSubmit?.();
            onClose();
        },
    });

    return (
        <DialogForm
            open
            title={isNew ? 'New category' : 'Edit category'}
            onClose={onClose}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            confirmLabel={isNew ? 'Create' : 'Save'}
            data-testid={TESTIDS.DIALOG}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <InputFieldController
                    control={control}
                    name="name"
                    label="Name"
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                    slotProps={{ htmlInput: { 'data-testid': TESTIDS.NAME } }}
                />
                <InputFieldController
                    control={control}
                    name="description"
                    label="Description"
                    optional
                    multiline
                    minRows={3}
                    slotProps={{
                        htmlInput: { 'data-testid': TESTIDS.DESCRIPTION },
                    }}
                />
            </Box>
        </DialogForm>
    );
};

export default addTestIds(CategoryEditDialog, TESTIDS);
