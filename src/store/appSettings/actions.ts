import Cookies from 'js-cookie';
import store from 'store/index';
import {
    AppSettingsState,
    localeCookieIndex,
    updateAppSettings as updateAppSettingsAction,
} from '.';

export const updateAppSettings = (appSettings: Partial<AppSettingsState>) => {
    if (
        appSettings.locale &&
        appSettings.locale !== Cookies.get(localeCookieIndex)
    ) {
        Cookies.set(localeCookieIndex, appSettings.locale, { expires: 365 });
    }
    store.dispatch(updateAppSettingsAction(appSettings));
};

export const setAppLoading = (loading: boolean) => {
    store.dispatch(updateAppSettingsAction({ loading }));
};
