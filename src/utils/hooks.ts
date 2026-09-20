import { AxiosRequestConfig, isCancel } from 'axios';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PaginationResponseType } from 'types/pagination';

/**
 * Creates a data fetching hook. `filter` is compared by value (JSON), an
 * in flight request is aborted when the filter changes or the component unmounts.
 * Pass `autoFetch = false` to fetch only when `reload` is called.
 */
export const createFetchHook = <T1 = any, T2 = number>(
    fetchFn: (arg0: T2 | null, params?: AxiosRequestConfig<any>) => Promise<T1>,
    defaultFilter: T2 | null = null
) => {
    return (filter: T2 | null = defaultFilter, autoFetch = true) => {
        const [data, setData] = useState<T1 | null>(null);
        const [error, setError] = useState('');
        const [isPending, setPending] = useState(autoFetch);
        const controller = useRef<AbortController | null>(null);

        const filterJSON = JSON.stringify(filter);
        const stableFilter = useMemo(
            () =>
                (filterJSON === undefined
                    ? null
                    : JSON.parse(filterJSON)) as T2 | null,
            [filterJSON]
        );

        const fetch = useCallback(
            (background = false) => {
                if (!background) {
                    setPending(true);
                }
                controller.current?.abort();
                const current = new AbortController();
                controller.current = current;

                return fetchFn(stableFilter, { signal: current.signal })
                    .then((fetchedData) => {
                        setError('');
                        setData(fetchedData);
                        return fetchedData;
                    })
                    .catch((response: Error) => {
                        // Canceled should not be treated as error
                        if (isCancel(response)) {
                            return null;
                        }
                        console.error(response);
                        setError(response.message || String(response));
                        setData(null);
                        return null;
                    })
                    .finally(() => {
                        if (controller.current === current) {
                            setPending(false);
                        }
                    });
            },
            [stableFilter]
        );

        useEffect(() => {
            if (autoFetch) {
                fetch();
            }

            return () => {
                controller.current?.abort();
            };
        }, [fetch, autoFetch]);

        return {
            data,
            error,
            isInitialized: data !== null || !!error,
            isPending,
            reload: fetch,
        };
    };
};

export const createFetchHookWithPagination = <
    T1 = any,
    T2 extends PaginationResponseType<T1> = PaginationResponseType<T1>,
    T3 = number,
>(
    fetchFn: (arg0: T3 | null, params?: AxiosRequestConfig<any>) => Promise<T2>,
    defaultFilter: T3 | null = null
) => {
    const useFetchHook = createFetchHook<T2, T3>(fetchFn, defaultFilter);

    return (filter: T3 | null = defaultFilter, autoFetch = true) => {
        const { data, ...rest } = useFetchHook(filter, autoFetch);

        return {
            items: data?.items ?? [],
            count: data?.total ?? 0,
            pages: data ? Math.ceil(data.total / data.limit) : 0,
            ...rest,
        };
    };
};
