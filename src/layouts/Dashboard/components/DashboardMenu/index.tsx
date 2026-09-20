import { ReactNode } from 'react';
import { Link as RouterLink, matchPath, useLocation } from 'react-router';
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import CategoriesIcon from 'icons/CategoriesIcon';
import DashboardIcon from 'icons/DashboardIcon';
import ProductsIcon from 'icons/ProductsIcon';
import StockIcon from 'icons/StockIcon';
import routes from 'routes/index';
import { ZeroArgsFunctionType } from 'types/functions';
import { cssColor } from 'utils/colors';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    MENU: 'dashboard-menu',
    MENU_ITEM: 'dashboard-menu-item',
};

interface MenuItem {
    label: string;
    to: string;
    icon: ReactNode;
    /** Match only the exact path (the dashboard), others match their sub pages too. */
    end?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
    {
        label: 'Dashboard',
        to: routes.admin.path,
        icon: <DashboardIcon />,
        end: true,
    },
    {
        label: 'Products',
        to: routes.adminProducts.path,
        icon: <ProductsIcon />,
    },
    {
        label: 'Categories',
        to: routes.adminCategories.path,
        icon: <CategoriesIcon />,
    },
    { label: 'Stock', to: routes.adminStock.path, icon: <StockIcon /> },
];

export interface DashboardMenuProps {
    /** Called after a click, used to close the mobile drawer. */
    onNavigate?: ZeroArgsFunctionType;
}

const DashboardMenu = ({ onNavigate }: DashboardMenuProps) => {
    const { pathname } = useLocation();

    return (
        <List
            component="nav"
            aria-label="Main"
            data-testid={TESTIDS.MENU}
            sx={{ px: 1.5 }}
        >
            {MENU_ITEMS.map((item) => {
                const selected = !!matchPath(
                    { path: item.to, end: !!item.end },
                    pathname
                );
                return (
                    <ListItemButton
                        key={item.to}
                        data-testid={TESTIDS.MENU_ITEM}
                        component={RouterLink}
                        to={item.to}
                        selected={selected}
                        aria-current={selected ? 'page' : undefined}
                        onClick={onNavigate}
                        sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            color: cssColor('grey900'),
                            '&.Mui-selected': {
                                backgroundColor: cssColor('brand50'),
                                color: cssColor('brand700'),
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: cssColor('brand100'),
                            },
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            slotProps={{
                                primary: {
                                    variant: 'text2',
                                    sx: { fontWeight: selected ? 600 : 500 },
                                },
                            }}
                        />
                    </ListItemButton>
                );
            })}
        </List>
    );
};

export default addTestIds(DashboardMenu, TESTIDS);
