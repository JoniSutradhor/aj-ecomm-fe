import { Box, BoxProps } from '@mui/material';
import { assetUrl } from 'utils/url';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    LOGO: 'logo',
};

export type LogoProps = Omit<BoxProps<'img'>, 'component' | 'src'>;

// TODO: replace the default Vite logo (public/favicon.svg) with the AJ logo
const Logo = (props: LogoProps) => (
    <Box
        component="img"
        alt="AJ"
        src={assetUrl('/favicon.svg')}
        data-testid={TESTIDS.LOGO}
        {...props}
    />
);

export default addTestIds(Logo, TESTIDS);
