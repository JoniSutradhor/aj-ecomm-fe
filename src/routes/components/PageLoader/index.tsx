import React, { ComponentType, LazyExoticComponent } from 'react';
import { Box } from '@mui/material';
import Suspense from 'components/Suspense';
import LoadingTopProgressBar from '../LoadingTopProgressBar/index';

const PageLoader =
    <P extends object>(
        Component: ComponentType<P> | LazyExoticComponent<ComponentType<P>>
    ) =>
    (props: P) => (
        <Suspense
            fallback={
                <Box>
                    <LoadingTopProgressBar />
                </Box>
            }
        >
            <Component {...(props as P & React.JSX.IntrinsicAttributes)} />
        </Suspense>
    );

export default PageLoader;
