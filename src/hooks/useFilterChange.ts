import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { queryStringParse, queryStringStringify } from 'utils/querystring';

/**
 * Reads / writes one url query parameter, the list filters live in the url so
 * they survive reloads and can be shared. A value equal to `defaultValue`
 * is removed from the url.
 */
const useFilterChange = <T1 = string | number>(
    name: string,
    defaultValue: T1,
    resetPageParam = false
) => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryValue = String(
        queryStringParse(location.search)?.[name] ?? defaultValue
    );

    const handleChange = useCallback(
        (value: string | number) => {
            if (String(value) === queryValue) return;

            const queryObject: Record<string, string | number> = {
                ...queryStringParse(location.search),
                [name]: value,
            };
            if (String(queryObject[name]) === String(defaultValue)) {
                delete queryObject[name];
            }
            if (resetPageParam) {
                delete queryObject.page;
            }
            navigate(
                `${location.pathname}?${queryStringStringify(queryObject)}`,
                { replace: true }
            );
        },
        [queryValue, name, defaultValue, resetPageParam, location, navigate]
    );

    return {
        value: (typeof defaultValue === 'number'
            ? parseFloat(queryValue)
            : queryValue) as T1,
        handleChange,
    };
};

export default useFilterChange;
