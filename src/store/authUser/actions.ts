import Cookies from 'js-cookie';
import store from 'store/index';
import { getAuthData } from 'api/ajApiAuthUser';
import Requester from 'utils/requester';
import { UserObjectType } from 'types/user';
import {
    AuthUserState,
    clearAuthUserData,
    setAuthUserData,
    tokenCookieIndex,
} from '.';

export const setUserInitialized = () => {
    if (store.getState().authUser.isInitialized) return;
    store.dispatch(setAuthUserData({ isInitialized: true }));
};

export const setNewAuthData = (data: Partial<AuthUserState>) => {
    store.dispatch(setAuthUserData(data));
    if (data.token) {
        Requester.setToken(data.token);
        Cookies.set(tokenCookieIndex, data.token, { expires: 1 });
    }
};

export const updateAuthUser = (data: Partial<UserObjectType>) => {
    const { user } = store.getState().authUser;
    store.dispatch(
        setAuthUserData({ user: { ...user, ...data } as UserObjectType })
    );
};

export const clearAuthUser = () => {
    Requester.setToken(null);
    Cookies.remove(tokenCookieIndex);
    store.dispatch(clearAuthUserData());
};

export const validateAuthUser = async (): Promise<void> => {
    const { token } = store.getState().authUser;

    if (!token) {
        clearAuthUser();
        setUserInitialized();
        return;
    }

    Requester.setToken(token);
    try {
        const { user } = await getAuthData();
        if (user) {
            setNewAuthData({ user });
        } else {
            clearAuthUser();
        }
    } catch {
        clearAuthUser();
    } finally {
        setUserInitialized();
    }
};

export const reloadAuthUser = () => validateAuthUser();
