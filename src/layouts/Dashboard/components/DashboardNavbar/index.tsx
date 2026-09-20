import { AppBar, Box, IconButton, Toolbar, useTheme } from '@mui/material';
import MenuIcon from 'icons/MenuIcon';
import { ZeroArgsFunctionType } from 'types/functions';
import { addTestIds } from 'utils/testids';
import DashboardAccountMenu from '../DashboardAccountMenu';

const TESTIDS = {
    MENU_BUTTON: 'navbar-menu-button',
};

export interface DashboardNavbarProps {
    onMenuClick: ZeroArgsFunctionType;
}

const DashboardNavbar = ({ onMenuClick }: DashboardNavbarProps) => {
    const theme = useTheme();

    return (
        <AppBar
            position="sticky"
            color="inherit"
            elevation={0}
            sx={{
                backgroundColor: 'background.paper',
                borderBottom: 1,
                borderColor: 'divider',
                height: theme.aj.topbarHeight,
                justifyContent: 'center',
            }}
        >
            <Toolbar sx={{ gap: 1 }}>
                <IconButton
                    data-testid={TESTIDS.MENU_BUTTON}
                    aria-label="Open menu"
                    edge="start"
                    onClick={onMenuClick}
                    sx={{ display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <DashboardAccountMenu />
            </Toolbar>
        </AppBar>
    );
};

export default addTestIds(DashboardNavbar, TESTIDS);
