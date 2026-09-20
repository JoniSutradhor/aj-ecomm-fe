import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import config from 'utils/config';

export const localeCookieIndex = 'locale';

const getInitialLocale = () =>
    Cookies.get(localeCookieIndex) || config.default_language;

export type AppSettingsState = {
    locale: string;
    loading: boolean;
};

export const defaultState: AppSettingsState = {
    locale: getInitialLocale(),
    loading: false,
};

const appSettingsSlice = createSlice({
    name: 'appSettings',
    initialState: defaultState,
    reducers: {
        updateAppSettings: (
            state,
            action: PayloadAction<Partial<AppSettingsState>>
        ) => ({ ...state, ...action.payload }),
    },
});

export const { updateAppSettings } = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
