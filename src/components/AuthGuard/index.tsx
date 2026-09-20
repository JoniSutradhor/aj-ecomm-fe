import { ReactNode, memo } from 'react';
import { Navigate, useLocation } from 'react-router';
import Forbidden from 'pages/Forbidden';
import useAuthUser from 'hooks/useAuthUser';
import routes from 'routes/index';
import { UserRoleEnum } from 'types/user';

export interface AuthGuardProps {
    children: ReactNode;
    /** When set only these roles get in, others see the "no access" page. */
    roles?: UserRoleEnum[];
}

const AuthGuard = ({ children = null, roles }: AuthGuardProps) => {
    const location = useLocation();
    const { isAuthenticated, isInitialized, isRole } = useAuthUser();

    if (!isInitialized) {
        return null;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to={routes.login.path}
                state={{ from: location }}
                replace
            />
        );
    }

    if (roles && !isRole(...roles)) {
        return <Forbidden />;
    }

    return children;
};

export default memo(AuthGuard);
