import { ReactNode } from 'react';
import { Outlet } from 'react-router';
import { Box, Container } from '@mui/material';
import ErrorBoundary from 'components/ErrorBoundary';
import { addTestIds } from 'utils/testids';
import StorefrontFooter from './components/StorefrontFooter';
import StorefrontHeader from './components/StorefrontHeader';

const TESTIDS = {
    LAYOUT_STOREFRONT: 'layout-storefront',
};

export interface StorefrontLayoutProps {
    children?: ReactNode;
}

/** Public shop: header with search and cart, page content, footer. */
const StorefrontLayout = ({ children }: StorefrontLayoutProps) => (
    <Box
        sx={{
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }}
        data-testid={TESTIDS.LAYOUT_STOREFRONT}
    >
        <StorefrontHeader />
        <Container component="main" maxWidth="xl" sx={{ flexGrow: 1, py: 4 }}>
            <ErrorBoundary>
                <Outlet />
                {children}
            </ErrorBoundary>
        </Container>
        <StorefrontFooter />
    </Box>
);

export default addTestIds(StorefrontLayout, TESTIDS);
