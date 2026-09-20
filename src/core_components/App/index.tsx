import React from 'react';
import { Provider } from 'react-redux';
import store from 'store/index';
import ErrorBoundary from 'components/ErrorBoundary';
import { SuspensedComponent } from 'utils/react';

const RouterProvider = SuspensedComponent(
    React.lazy(() => import('routes/components/RouterProvider'))
);

const App = () => (
    <ErrorBoundary>
        <Provider store={store}>
            <RouterProvider />
        </Provider>
    </ErrorBoundary>
);

export default App;
