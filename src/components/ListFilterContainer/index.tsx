import { Box, BoxProps } from '@mui/material';

const ListFilterContainer = ({ children, sx, ...props }: BoxProps) => (
    <Box
        {...props}
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 2,
            mb: 2,
            ...sx,
        }}
    >
        {children}
    </Box>
);

export default ListFilterContainer;
