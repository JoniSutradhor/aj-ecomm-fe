import { useEffect } from 'react';
import { clearAuthUser, validateAuthUser } from 'store/authUser/actions';
import Requester from 'utils/requester';

/**
 * Global app side effects (session validation on start, global listeners, ...)
 */
const AppEvents = () => {
    useEffect(() => {
        validateAuthUser();

        // The api rejected our token (expired / revoked): sign out, AuthGuard redirects to login
        Requester.onUnauthorized(clearAuthUser);
        return () => Requester.onUnauthorized(null);
    }, []);

    return null;
};

export default AppEvents;
