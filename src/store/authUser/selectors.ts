import type { RootState } from 'store/index';

export const isAuthUserAuthenticated = (state: RootState) =>
    !!state.authUser.user;
export const isAuthUserInitialized = (state: RootState) =>
    state.authUser.isInitialized;
export const getAuthUserData = (state: RootState) => state.authUser.user;
export const getToken = (state: RootState) => state.authUser.token;
