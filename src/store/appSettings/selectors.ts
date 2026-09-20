import type { RootState } from 'store/index';

export const getAppSettings = (state: RootState) => state.appSettings;
export const getLocale = (state: RootState) => state.appSettings.locale;
export const isAppLoading = (state: RootState) => state.appSettings.loading;
