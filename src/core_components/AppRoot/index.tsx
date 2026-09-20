import React, { ReactNode } from 'react';
import { Outlet } from 'react-router';
import AppLoader from 'core_components/AppLoader';
import { SuspensedComponent } from 'utils/react';

const ThemeProvider = SuspensedComponent(
    React.lazy(() => import('core_components/ThemeProvider'))
);
const Toaster = SuspensedComponent(
    React.lazy(() => import('core_components/Toaster'))
);
const AppEvents = SuspensedComponent(
    React.lazy(() => import('core_components/AppEvents'))
);

export interface AppRootProps {
    children?: ReactNode;
}

const AppRoot = ({ children = null }: AppRootProps) => {
    return (
        <>
            <AppEvents />
            <ThemeProvider>
                <AppLoader>
                    <Toaster />
                    {children}
                    <Outlet />
                </AppLoader>
            </ThemeProvider>
        </>
    );
};

export default React.memo(AppRoot);
