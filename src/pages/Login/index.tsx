import { useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { z } from 'zod';
import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    Typography,
} from '@mui/material';
import { login } from 'api/ajApiAuthUser';
import InputFieldController from 'components/InputFieldController';
import MessageCard from 'components/MessageCard';
import VisibilityIcon from 'icons/VisibilityIcon';
import VisibilityOffIcon from 'icons/VisibilityOffIcon';
import useAuthUser from 'hooks/useAuthUser';
import useHookForm from 'hooks/useHookForm';
import routes from 'routes/index';
import { setNewAuthData } from 'store/authUser/actions';
import { addTestIds } from 'utils/testids';
import { zRequired, zValidEmail } from 'utils/z';

const TESTIDS = {
    EMAIL: 'login-email',
    PASSWORD: 'login-password',
    SUBMIT: 'login-submit',
    ERROR: 'login-error',
};

const formSchema = z.object({
    email: zValidEmail(),
    password: zRequired(),
});

type FormValues = z.infer<typeof formSchema>;

const initialValues: FormValues = { email: '', password: '' };

const Login = () => {
    const location = useLocation();
    const { isAuthenticated } = useAuthUser();
    const [showPassword, setShowPassword] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useHookForm({
        schema: formSchema,
        initialValues,
        ignoreReset: true,
        onSubmit: async (values) => {
            setSubmitError('');
            try {
                const { user, token } = await login(values);
                setNewAuthData({ user, token });
            } catch (error) {
                setSubmitError((error as Error).message);
            }
        },
    });

    if (isAuthenticated) {
        const from = (location.state as { from?: { pathname: string } } | null)
            ?.from?.pathname;
        return <Navigate to={from || routes.admin.path} replace />;
    }

    return (
        <Card>
            <title>Sign in | AJ</title>
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Sign in
                </Typography>
                <Typography variant="text2" color="textSecondary">
                    Use your administrator account to manage the store.
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        mt: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    {submitError && (
                        <MessageCard error data-testid={TESTIDS.ERROR}>
                            {submitError}
                        </MessageCard>
                    )}
                    <InputFieldController
                        control={control}
                        name="email"
                        label="Email"
                        type="email"
                        autoComplete="username"
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus
                        slotProps={{
                            htmlInput: { 'data-testid': TESTIDS.EMAIL },
                        }}
                    />
                    <InputFieldController
                        control={control}
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        slotProps={{
                            htmlInput: { 'data-testid': TESTIDS.PASSWORD },
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            aria-label={
                                                showPassword
                                                    ? 'Hide password'
                                                    : 'Show password'
                                            }
                                            onClick={() =>
                                                setShowPassword(
                                                    (value) => !value
                                                )
                                            }
                                        >
                                            {showPassword ? (
                                                <VisibilityOffIcon fontSize="small" />
                                            ) : (
                                                <VisibilityIcon fontSize="small" />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <Button
                        data-testid={TESTIDS.SUBMIT}
                        type="submit"
                        variant="contained"
                        size="large"
                        loading={isSubmitting}
                    >
                        Sign in
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default addTestIds(Login, TESTIDS);
