import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { isDevelopment } from 'utils/environment';
import appSettings from './appSettings';
import authUser from './authUser';

const rootReducer = combineReducers({
    appSettings,
    authUser,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createAppStore = (preloadedState?: Partial<RootState>) =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
        devTools: isDevelopment() && { name: 'AJ Store' },
    });

const store = createAppStore();

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

export default store;
