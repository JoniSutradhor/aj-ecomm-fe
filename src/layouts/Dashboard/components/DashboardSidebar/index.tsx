import { Link as RouterLink } from 'react-router';
import { Box, Drawer, Typography, useTheme } from '@mui/material';
import Logo from 'components/Logo';
import routes from 'routes/index';
import { ZeroArgsFunctionType } from 'types/functions';
import DashboardMenu from '../DashboardMenu';

export interface DashboardSidebarProps {
    /** Mobile drawer state, on desktop the sidebar is always visible. */
    mobileOpen: boolean;
    onMobileClose: ZeroArgsFunctionType;
}

const DashboardSidebar = ({
    mobileOpen,
    onMobileClose,
}: DashboardSidebarProps) => {
    const theme = useTheme();

    const content = (
        <>
            <Box
                component={RouterLink}
                to={routes.admin.path}
                sx={{
                    height: theme.aj.topbarHeight,
                    px: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    color: 'text.primary',
                    textDecoration: 'none',
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Logo sx={{ height: 28 }} />
                <Typography variant="h3">AJ Admin</Typography>
            </Box>
            <Box sx={{ pt: 2 }}>
                <DashboardMenu onNavigate={onMobileClose} />
            </Box>
        </>
    );

    const paperSx = {
        width: theme.aj.sidebarWidth,
        boxSizing: 'border-box',
        borderRight: 1,
        borderColor: 'divider',
    } as const;

    return (
        <Box
            component="aside"
            sx={{ width: { md: theme.aj.sidebarWidth }, flexShrink: { md: 0 } }}
        >
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onMobileClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': paperSx,
                }}
            >
                {content}
            </Drawer>
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': paperSx,
                }}
            >
                {content}
            </Drawer>
        </Box>
    );
};

export default DashboardSidebar;
