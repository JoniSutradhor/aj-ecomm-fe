import { useEffect, useState } from 'react';
import useFilterChange from './useFilterChange';

/**
 * Text filter for the url query: the input updates immediately, the url (and
 * so the list request) only after the user stopped typing for `msDelay`.
 */
const useFilterChangeInput = (
    name: string,
    resetPageParam = true,
    msDelay = 400
) => {
    const { value: queryValue, handleChange: setQueryValue } = useFilterChange(
        name,
        '',
        resetPageParam
    );
    const [inputValue, setInputValue] = useState(queryValue);
    // Keep the input in sync when the url changes from elsewhere (back button, reset)
    const [prevQueryValue, setPrevQueryValue] = useState(queryValue);
    if (prevQueryValue !== queryValue) {
        setPrevQueryValue(queryValue);
        setInputValue(queryValue);
    }

    useEffect(() => {
        if (inputValue === queryValue) return undefined;
        const timeout = setTimeout(() => setQueryValue(inputValue), msDelay);
        return () => clearTimeout(timeout);
    }, [inputValue, queryValue, setQueryValue, msDelay]);

    return { value: inputValue, handleChange: setInputValue };
};

export default useFilterChangeInput;
