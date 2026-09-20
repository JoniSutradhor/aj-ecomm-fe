import { MouseEvent, useState } from 'react';
import {
    Avatar,
    Box,
    ButtonBase,
    Divider,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import LogoutIcon from 'icons/LogoutIcon';
import useAuthUser from 'hooks/useAuthUser';
import { cssColor } from 'utils/colors';
import { getInitials } from 'utils/format';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    BUTTON: 'account-menu-button',
    LOGOUT: 'account-menu-logout',
};

const DashboardAccountMenu = () => {
    const { authUser, logout } = useAuthUser();
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    if (!authUser) return null;

    const name = `${authUser.fname} ${authUser.lname}`.trim();

    return (
        <>
            <ButtonBase
                data-testid={TESTIDS.BUTTON}
                aria-label="Account menu"
                aria-haspopup="true"
                onClick={(event: MouseEvent<HTMLElement>) =>
                    setAnchor(event.currentTarget)
                }
                sx={{ borderRadius: 2, p: 0.5, gap: 1.5 }}
            >
                <Avatar
                    sx={{
                        width: 36,
                        height: 36,
                        fontSize: 14,
                        fontWeight: 600,
                        backgroundColor: cssColor('brand100'),
                        color: cssColor('brand700'),
                    }}
                >
                    {getInitials(authUser.fname, authUser.lname)}
                </Avatar>
                <Typography
                    variant="text2"
                    sx={{
                        fontWeight: 600,
                        display: { xs: 'none', sm: 'block' },
                    }}
                >
                    {name}
                </Typography>
            </ButtonBase>
            <Menu
                anchorEl={anchor}
                open={!!anchor}
                onClose={() => setAnchor(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="text2" sx={{ fontWeight: 600 }}>
                        {name}
                    </Typography>
                    <Typography
                        variant="text3"
                        color="textSecondary"
                        component="div"
                    >
                        {authUser.email}
                    </Typography>
                </Box>
                <Divider />
                <MenuItem
                    data-testid={TESTIDS.LOGOUT}
                    onClick={() => {
                        setAnchor(null);
                        logout();
                    }}
                >
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Sign out
                </MenuItem>
            </Menu>
        </>
    );
};

export default addTestIds(DashboardAccountMenu, TESTIDS);
