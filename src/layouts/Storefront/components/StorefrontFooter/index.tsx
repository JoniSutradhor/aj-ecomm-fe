import { Link as RouterLink } from 'react-router';
import { Box, Container, Link, Typography } from '@mui/material';
import routes from 'routes/index';

const StorefrontFooter = () => (
    <Box
        component="footer"
        sx={{
            backgroundColor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider',
            mt: 8,
            py: 3,
        }}
    >
        <Container
            maxWidth="xl"
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: 2,
            }}
        >
            <Typography variant="text3" color="textSecondary">
                {`© ${new Date().getFullYear()} AJ. All rights reserved.`}
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
                <Link
                    component={RouterLink}
                    to={routes.shop.path}
                    variant="text3"
                    color="textSecondary"
                    underline="hover"
                >
                    Shop
                </Link>
                <Link
                    component={RouterLink}
                    to={routes.orderTrack.path}
                    variant="text3"
                    color="textSecondary"
                    underline="hover"
                >
                    Track order
                </Link>
                <Link
                    component={RouterLink}
                    to={routes.cart.path}
                    variant="text3"
                    color="textSecondary"
                    underline="hover"
                >
                    Cart
                </Link>
            </Box>
        </Container>
    </Box>
);

export default StorefrontFooter;
