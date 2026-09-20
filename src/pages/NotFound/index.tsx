import { ReactNode } from 'react';
import { Card, Container, Typography } from '@mui/material';

const NotFound = ({ text }: { text?: ReactNode }) => {
    return (
        <>
            <title>Page not found</title>
            <Card sx={{ p: 2 }}>
                <Container maxWidth="md">
                    <Typography align="center" color="textPrimary" variant="h2">
                        {text || 'Oops, page not found'}
                    </Typography>
                </Container>
            </Card>
        </>
    );
};

export default NotFound;
