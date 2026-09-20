import { FormEvent, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router';
import {
    AppBar,
    Badge,
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    TextField,
    Toolbar,
} from '@mui/material';
import Logo from 'components/Logo';
import CartIcon from 'icons/CartIcon';
import SearchIcon from 'icons/SearchIcon';
import useAuthUser from 'hooks/useAuthUser';
import useCart from 'hooks/useCart';
import routes from 'routes/index';
import { UserRoleEnum } from 'types/user';
import { queryStringStringify } from 'utils/querystring';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    SEARCH: 'storefront-search',
    CART: 'storefront-cart',
    SIGN_IN: 'storefront-sign-in',
    MY_ORDERS: 'storefront-my-orders',
    SIGN_OUT: 'storefront-sign-out',
    ADMIN: 'storefront-admin',
};

const StorefrontHeader = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isRole, logout } = useAuthUser();
    const { count } = useCart();
    const [search, setSearch] = useState('');

    const handleSearch = (event: FormEvent) => {
        event.preventDefault();
        navigate(
            `${routes.shop.path}?${queryStringStringify({ search: search.trim() })}`
        );
    };

    return (
        <AppBar
            position="sticky"
            color="inherit"
            elevation={0}
            sx={{
                backgroundColor: 'background.paper',
                borderBottom: 1,
                borderColor: 'divider',
            }}
        >
            <Container maxWidth="xl" disableGutters>
                <Toolbar sx={{ gap: { xs: 1, md: 3 } }}>
                    <RouterLink to={routes.home.path} aria-label="AJ home">
                        <Logo sx={{ height: 32, display: 'block' }} />
                    </RouterLink>
                    <Button
                        component={RouterLink}
                        to={routes.shop.path}
                        color="inherit"
                    >
                        Shop
                    </Button>
                    <Box
                        component="form"
                        role="search"
                        onSubmit={handleSearch}
                        sx={{
                            flexGrow: 1,
                            maxWidth: 480,
                            display: { xs: 'none', md: 'block' },
                        }}
                    >
                        <TextField
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search products"
                            slotProps={{
                                htmlInput: {
                                    'aria-label': 'Search products',
                                    'data-testid': TESTIDS.SEARCH,
                                },
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small" />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                        data-testid={TESTIDS.CART}
                        component={RouterLink}
                        to={routes.cart.path}
                        aria-label={`Cart, ${count} items`}
                    >
                        <Badge color="primary" badgeContent={count} max={99}>
                            <CartIcon />
                        </Badge>
                    </IconButton>
                    {isRole(UserRoleEnum.ADMIN) && (
                        <Button
                            data-testid={TESTIDS.ADMIN}
                            component={RouterLink}
                            to={routes.admin.path}
                            variant="outlined"
                        >
                            Admin
                        </Button>
                    )}
                    {isAuthenticated && (
                        <Button
                            data-testid={TESTIDS.MY_ORDERS}
                            component={RouterLink}
                            to={routes.myOrders.path}
                            color="inherit"
                        >
                            My orders
                        </Button>
                    )}
                    {isAuthenticated ? (
                        <Button
                            data-testid={TESTIDS.SIGN_OUT}
                            color="inherit"
                            onClick={logout}
                        >
                            Sign out
                        </Button>
                    ) : (
                        <Button
                            data-testid={TESTIDS.SIGN_IN}
                            component={RouterLink}
                            to={routes.login.path}
                            color="inherit"
                        >
                            Sign in
                        </Button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default addTestIds(StorefrontHeader, TESTIDS);
