import { useEffect } from 'react';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import { Box } from '@mui/material';

const LoadingTopProgressBar = () => {
    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done();
        };
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: 'background.paper',
                minHeight: '100%',
            }}
        />
    );
};

export default LoadingTopProgressBar;
