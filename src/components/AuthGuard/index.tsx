import { ReactNode, memo } from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuthUser from 'hooks/useAuthUser';
import routes from 'routes/index';

export interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard = ({ children = null }: AuthGuardProps) => {
    const location = useLocation();
    const { isAuthenticated, isInitialized } = useAuthUser();

    if (!isInitialized) {
        return null;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to={routes.home.path}
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
};

export default memo(AuthGuard);
