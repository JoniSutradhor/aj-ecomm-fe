import { Link as RouterLink, Outlet } from 'react-router';
import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';
import Logo from 'components/Logo';
import ErrorBoundary from 'components/ErrorBoundary';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    LAYOUT_MAIN: 'layout-main',
};

export interface MainLayoutProps {
    children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            data-testid={TESTIDS.LAYOUT_MAIN}
        >
            <Container
                maxWidth="sm"
                sx={{
                    py: '80px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 8,
                    }}
                >
                    <RouterLink to="/">
                        <Logo sx={{ height: 48 }} />
                    </RouterLink>
                </Box>
                <ErrorBoundary>
                    <Outlet />
                    {children}
                </ErrorBoundary>
            </Container>
        </Box>
    );
};

export default addTestIds(MainLayout, TESTIDS);
