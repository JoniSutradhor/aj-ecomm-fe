import React, { ReactNode } from 'react';
import useAuthUser from 'hooks/useAuthUser';
import Initializing from 'pages/Initializing';

export interface AppLoaderProps {
    children?: ReactNode;
}

const AppLoader = ({ children }: AppLoaderProps) => {
    const { isInitialized } = useAuthUser();

    return isInitialized ? children : <Initializing />;
};

export default React.memo(AppLoader);
