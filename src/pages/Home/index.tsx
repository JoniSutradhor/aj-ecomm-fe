import { Card, Container, Typography } from '@mui/material';

const Home = () => (
    <Card sx={{ p: 2 }}>
        <Container maxWidth="md">
            <Typography align="center" color="textPrimary" variant="h2">
                AJ E-Commerce
            </Typography>
            <Typography align="center" color="textSecondary" variant="text2">
                The skeleton is ready. Start building in src/pages.
            </Typography>
        </Container>
    </Card>
);

export default Home;
