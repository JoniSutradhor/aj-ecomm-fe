import React from 'react';
import AuthGuard from 'components/AuthGuard';
import { UserRoleEnum } from 'types/user';
import { SuspensedComponent } from 'utils/react';
import PageLoader from './components/PageLoader';
import routes from './index';

const MainLayout = SuspensedComponent(React.lazy(() => import('layouts/Main')));
const DashboardLayout = SuspensedComponent(
    React.lazy(() => import('layouts/Dashboard'))
);
const AppRoot = SuspensedComponent(
    React.lazy(() => import('core_components/AppRoot'))
);

const Home = PageLoader(React.lazy(() => import('pages/Home')));
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
                path: routes.home.path,
                element: <Home />,
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
