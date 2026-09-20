import { useEffect } from 'react';
import { validateAuthUser } from 'store/authUser/actions';

/**
 * Global app side effects (session validation on start, global listeners, ...)
 */
const AppEvents = () => {
    useEffect(() => {
        validateAuthUser();
    }, []);

    return null;
};

export default AppEvents;
