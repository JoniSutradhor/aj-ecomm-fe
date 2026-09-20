import { CircularProgress, Container } from '@mui/material';

const Initializing = () => {
    return (
        <>
            <title>AJ</title>
            <Container
                maxWidth="md"
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    background: 'var(--grey100)',
                }}
            >
                <CircularProgress color="grey900" />
            </Container>
        </>
    );
};

export default Initializing;
