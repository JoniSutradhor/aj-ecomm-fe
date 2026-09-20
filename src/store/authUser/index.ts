import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { UserObjectType } from 'types/user';

export const tokenCookieIndex = 'aj_token';

export type AuthUserState = {
    user: UserObjectType | null;
    token: string | null;
    isInitialized: boolean;
};

export const defaultState: AuthUserState = {
    user: null,
    token: Cookies.get(tokenCookieIndex) || null,
    isInitialized: false,
};

const authUserSlice = createSlice({
    name: 'authUser',
    initialState: defaultState,
    reducers: {
        setAuthUserData: (
            state,
            action: PayloadAction<Partial<AuthUserState>>
        ) => ({ ...state, ...action.payload }),
        clearAuthUserData: (state) => ({
            ...state,
            user: null,
            token: null,
        }),
    },
});

export const { setAuthUserData, clearAuthUserData } = authUserSlice.actions;

export default authUserSlice.reducer;
