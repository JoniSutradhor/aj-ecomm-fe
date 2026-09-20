import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    TITLE: 'page-header-title',
};

export interface PageHeaderBreadcrumb {
    label: string;
    /** Last item has no link. */
    to?: string;
}

export interface PageHeaderProps {
    title: string;
    subtitle?: ReactNode;
    breadcrumbs?: PageHeaderBreadcrumb[];
    /** Buttons on the right side. */
    actions?: ReactNode;
}

const PageHeader = ({
    title,
    subtitle,
    breadcrumbs,
    actions,
}: PageHeaderProps) => (
    <Box sx={{ mb: 3 }}>
        <title>{`${title} | AJ`}</title>
        {breadcrumbs && (
            <Breadcrumbs sx={{ mb: 1 }} aria-label="Breadcrumb">
                {breadcrumbs.map((item) =>
                    item.to ? (
                        <Link
                            key={item.label}
                            component={RouterLink}
                            to={item.to}
                            underline="hover"
                            color="textSecondary"
                            variant="text2"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <Typography
                            key={item.label}
                            color="textPrimary"
                            variant="text2"
                        >
                            {item.label}
                        </Typography>
                    )
                )}
            </Breadcrumbs>
        )}
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
            }}
        >
            <Box>
                <Typography
                    variant="h2"
                    component="h1"
                    data-testid={TESTIDS.TITLE}
                >
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="text2" color="textSecondary">
                        {subtitle}
                    </Typography>
                )}
            </Box>
            {actions && <Box sx={{ display: 'flex', gap: 1 }}>{actions}</Box>}
        </Box>
    </Box>
);

export default addTestIds(PageHeader, TESTIDS);
