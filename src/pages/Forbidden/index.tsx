import { Box, Button, Container, Typography } from '@mui/material';
import LogoutIcon from 'icons/LogoutIcon';
import useAuthUser from 'hooks/useAuthUser';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    FORBIDDEN: 'page-forbidden',
    LOGOUT_BUTTON: 'forbidden-logout-button',
};

const Forbidden = () => {
    const { authUser, logout } = useAuthUser();

    return (
        <Box
            data-testid={TESTIDS.FORBIDDEN}
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'background.default',
            }}
        >
            <title>No access | AJ</title>
            <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                <Typography variant="h2" gutterBottom>
                    You don&apos;t have access to this area
                </Typography>
                <Typography color="textSecondary" variant="text1" gutterBottom>
                    {authUser?.email} is not an administrator account.
                </Typography>
                <Button
                    data-testid={TESTIDS.LOGOUT_BUTTON}
                    variant="outlined"
                    startIcon={<LogoutIcon />}
                    onClick={logout}
                    sx={{ mt: 2 }}
                >
                    Sign out
                </Button>
            </Container>
        </Box>
    );
};

export default addTestIds(Forbidden, TESTIDS);
