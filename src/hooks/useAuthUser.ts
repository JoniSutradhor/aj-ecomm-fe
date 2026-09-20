import { useCallback } from 'react';
import { UserObjectType, UserRoleEnum } from 'types/user';
import {
    clearAuthUser,
    reloadAuthUser,
    updateAuthUser,
} from 'store/authUser/actions';
import {
    getAuthUserData,
    isAuthUserAuthenticated,
    isAuthUserInitialized,
} from 'store/authUser/selectors';
import useAppSelector from './useAppSelector';

const useAuthUser = () => {
    const authUser = useAppSelector(getAuthUserData);
    const isInitialized = useAppSelector(isAuthUserInitialized);
    const isAuthenticated = useAppSelector(isAuthUserAuthenticated);

    const role = authUser?.role;
    const isRole = useCallback(
        (...roles: UserRoleEnum[]): boolean => !!role && roles.includes(role),
        [role]
    );

    return {
        authUser,
        isInitialized,
        isAuthenticated,
        isRole,
        reload: reloadAuthUser,
        update: (data: Partial<UserObjectType>) => updateAuthUser(data),
        logout: clearAuthUser,
    };
};

export default useAuthUser;
