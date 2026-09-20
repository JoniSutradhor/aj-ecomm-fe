import React from 'react';
import AuthGuard from 'components/AuthGuard';
import { UserRoleEnum } from 'types/user';
import { SuspensedComponent } from 'utils/react';
import PageLoader from './components/PageLoader';
import routes from './index';

const MainLayout = SuspensedComponent(React.lazy(() => import('layouts/Main')));
const StorefrontLayout = SuspensedComponent(
    React.lazy(() => import('layouts/Storefront'))
);
const DashboardLayout = SuspensedComponent(
    React.lazy(() => import('layouts/Dashboard'))
);
const AppRoot = SuspensedComponent(
    React.lazy(() => import('core_components/AppRoot'))
);

const Home = PageLoader(React.lazy(() => import('pages/Home')));
const Shop = PageLoader(React.lazy(() => import('pages/Shop')));
const ProductDetail = PageLoader(
    React.lazy(() => import('pages/ProductDetail'))
);
const Cart = PageLoader(React.lazy(() => import('pages/Cart')));
const Checkout = PageLoader(React.lazy(() => import('pages/Checkout')));
const OrderTrack = PageLoader(React.lazy(() => import('pages/OrderTrack')));
const MyOrders = PageLoader(React.lazy(() => import('pages/MyOrders')));
const Register = PageLoader(React.lazy(() => import('pages/Register')));
const Login = PageLoader(React.lazy(() => import('pages/Login')));
const Dashboard = PageLoader(React.lazy(() => import('pages/Dashboard')));
const Products = PageLoader(React.lazy(() => import('pages/Products')));
const ProductEdit = PageLoader(React.lazy(() => import('pages/ProductEdit')));
const Categories = PageLoader(React.lazy(() => import('pages/Categories')));
const Stock = PageLoader(React.lazy(() => import('pages/Stock')));
const NotFound = PageLoader(React.lazy(() => import('pages/NotFound')));

const routesConfig = [
    {
        Component: AppRoot,
        children: [
            {
                // Public storefront
                Component: StorefrontLayout,
                children: [
                    {
                        path: routes.home.path,
                        element: <Home />,
                    },
                    {
                        path: routes.shop.path,
                        element: <Shop />,
                    },
                    {
                        path: routes.product.path,
                        element: <ProductDetail />,
                    },
                    {
                        path: routes.cart.path,
                        element: <Cart />,
                    },
                    {
                        path: routes.checkout.path,
                        element: <Checkout />,
                    },
                    {
                        path: routes.orderTrack.path,
                        element: <OrderTrack />,
                    },
                    {
                        // Any signed in customer (admins too)
                        path: routes.myOrders.path,
                        element: (
                            <AuthGuard>
                                <MyOrders />
                            </AuthGuard>
                        ),
                    },
                ],
            },
            {
                // Admin area, administrators only
                element: (
                    <AuthGuard roles={[UserRoleEnum.ADMIN]}>
                        <DashboardLayout />
                    </AuthGuard>
                ),
                children: [
                    {
                        path: routes.admin.path,
                        element: <Dashboard />,
                    },
                    {
                        path: routes.adminProducts.path,
                        element: <Products />,
                    },
                    {
                        path: routes.adminProductNew.path,
                        element: <ProductEdit />,
                    },
                    {
                        path: routes.adminProductEdit.path,
                        element: <ProductEdit />,
                    },
                    {
                        path: routes.adminCategories.path,
                        element: <Categories />,
                    },
                    {
                        path: routes.adminStock.path,
                        element: <Stock />,
                    },
                ],
            },
            {
                Component: MainLayout,
                children: [
                    {
                        path: routes.login.path,
                        element: <Login />,
                    },
                    {
                        path: routes.register.path,
                        element: <Register />,
                    },
                    {
                        path: routes.notFound404.path,
                        element: <NotFound />,
                    },
                    {
                        path: '*',
                        element: <NotFound />,
                    },
                ],
            },
        ],
    },
];

export default routesConfig;
