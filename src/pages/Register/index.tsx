import { useState } from 'react';
import { Link as RouterLink, Navigate, useLocation } from 'react-router';
import { z } from 'zod';
import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    Link,
    Typography,
} from '@mui/material';
import { register } from 'api/ajApiAuthUser';
import InputFieldController from 'components/InputFieldController';
import MessageCard from 'components/MessageCard';
import VisibilityIcon from 'icons/VisibilityIcon';
import VisibilityOffIcon from 'icons/VisibilityOffIcon';
import useAuthUser from 'hooks/useAuthUser';
import useHookForm from 'hooks/useHookForm';
import routes from 'routes/index';
import { setNewAuthData } from 'store/authUser/actions';
import { REGISTER_LIMITS } from 'utils/orderLimits';
import { addTestIds } from 'utils/testids';
import { zRequired, zValidEmail } from 'utils/z';

const TESTIDS = {
    FIRST_NAME: 'register-first-name',
    LAST_NAME: 'register-last-name',
    EMAIL: 'register-email',
    PASSWORD: 'register-password',
    SUBMIT: 'register-submit',
    ERROR: 'register-error',
};

// Same rules as the api (`RegisterDto`)
const formSchema = z.object({
    fname: zRequired(),
    lname: zRequired(),
    email: zValidEmail(),
    password: z
        .string()
        .min(
            REGISTER_LIMITS.passwordMin,
            `At least ${REGISTER_LIMITS.passwordMin} characters`
        )
        .max(
            REGISTER_LIMITS.passwordMax,
            `Maximum ${REGISTER_LIMITS.passwordMax} characters`
        ),
});

type FormValues = z.infer<typeof formSchema>;

const initialValues: FormValues = {
    fname: '',
    lname: '',
    email: '',
    password: '',
};

const Register = () => {
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
                const { user, token } = await register(values);
                setNewAuthData({ user, token });
            } catch (error) {
                setSubmitError((error as Error).message);
            }
        },
    });

    if (isAuthenticated) {
        const from = (location.state as { from?: { pathname: string } } | null)
            ?.from?.pathname;
        return <Navigate to={from || routes.home.path} replace />;
    }

    return (
        <Card>
            <title>Create account | AJ</title>
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Create account
                </Typography>
                <Typography variant="text2" color="textSecondary">
                    Keep track of your orders. You can also check out as a
                    guest.
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
                    <Box
                        sx={{
                            display: 'grid',
                            gap: 2,
                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                        }}
                    >
                        <InputFieldController
                            control={control}
                            name="fname"
                            label="First name"
                            autoComplete="given-name"
                            slotProps={{
                                htmlInput: {
                                    'data-testid': TESTIDS.FIRST_NAME,
                                },
                            }}
                        />
                        <InputFieldController
                            control={control}
                            name="lname"
                            label="Last name"
                            autoComplete="family-name"
                            slotProps={{
                                htmlInput: {
                                    'data-testid': TESTIDS.LAST_NAME,
                                },
                            }}
                        />
                    </Box>
                    <InputFieldController
                        control={control}
                        name="email"
                        label="Email"
                        type="email"
                        autoComplete="username"
                        slotProps={{
                            htmlInput: { 'data-testid': TESTIDS.EMAIL },
                        }}
                    />
                    <InputFieldController
                        control={control}
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
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
                        Create account
                    </Button>
                    <Typography variant="text2" sx={{ textAlign: 'center' }}>
                        {'Already have an account? '}
                        <Link component={RouterLink} to={routes.login.path}>
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default addTestIds(Register, TESTIDS);
