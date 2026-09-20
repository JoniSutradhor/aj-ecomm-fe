import { matchPath, useLocation } from 'react-router';
import routes from 'routes/index';

const useCurrentRoute = () => {
    const location = useLocation();
    return Object.values(routes).find((route) =>
        matchPath(route.path, location.pathname)
    );
};

export default useCurrentRoute;
