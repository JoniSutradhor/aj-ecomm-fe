import React from 'react';
import { SuspensedComponent } from 'utils/react';
import PageLoader from './components/PageLoader';
import routes from './index';

const MainLayout = SuspensedComponent(React.lazy(() => import('layouts/Main')));
const AppRoot = SuspensedComponent(
    React.lazy(() => import('core_components/AppRoot'))
);

const Home = PageLoader(React.lazy(() => import('pages/Home')));
const NotFound = PageLoader(React.lazy(() => import('pages/NotFound')));

const routesConfig = [
    {
        Component: AppRoot,
        children: [
            {
                Component: MainLayout,
                children: [
                    {
                        path: routes.home.path,
                        element: <Home />,
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
