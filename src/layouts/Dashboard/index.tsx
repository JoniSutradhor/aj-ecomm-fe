import { useState } from 'react';
import { Outlet } from 'react-router';
import { Box, Container } from '@mui/material';
import ErrorBoundary from 'components/ErrorBoundary';
import { addTestIds } from 'utils/testids';
import DashboardNavbar from './components/DashboardNavbar';
import DashboardSidebar from './components/DashboardSidebar';

const TESTIDS = {
    LAYOUT_DASHBOARD: 'layout-dashboard',
};

/** Admin shell: sidebar navigation (drawer on small screens), top bar and the page. */
const DashboardLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <Box
            data-testid={TESTIDS.LAYOUT_DASHBOARD}
            sx={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: 'background.default',
            }}
        >
            <DashboardSidebar
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
            />
            <Box
                sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <DashboardNavbar onMenuClick={() => setMobileOpen(true)} />
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <Container maxWidth="xl" sx={{ py: 3 }}>
                        <ErrorBoundary>
                            <Outlet />
                        </ErrorBoundary>
                    </Container>
                </Box>
            </Box>
        </Box>
    );
};

export default addTestIds(DashboardLayout, TESTIDS);
