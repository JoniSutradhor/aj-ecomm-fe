import { useMemo } from 'react';
import { useLocation } from 'react-router';

const useQueryParams = () => {
    const location = useLocation();
    const params = useMemo(
        () =>
            Object.fromEntries(new URLSearchParams(location.search).entries()),
        [location.search]
    );
    return params;
};

export default useQueryParams;
