import { ReactNode } from 'react';
import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';
import { cssColor } from 'utils/colors';
import { addTestIds } from 'utils/testids';

const TESTIDS = {
    STAT_CARD: 'stat-card',
    STAT_VALUE: 'stat-card-value',
};

const TONES = {
    brand: { background: 'brand50', color: 'brand600' },
    success: { background: 'success50', color: 'success600' },
    warning: { background: 'warning50', color: 'warning600' },
    danger: { background: 'danger50', color: 'danger600' },
} as const;

export interface StatCardProps {
    label: string;
    value?: ReactNode;
    icon: ReactNode;
    tone?: keyof typeof TONES;
    loading?: boolean;
}

const StatCard = ({
    label,
    value,
    icon,
    tone = 'brand',
    loading = false,
}: StatCardProps) => (
    <Card data-testid={TESTIDS.STAT_CARD} sx={{ height: '100%' }}>
        <CardContent
            sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2.5 }}
        >
            <Box
                sx={{
                    width: 48,
                    height: 48,
                    flexShrink: 0,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: cssColor(TONES[tone].background),
                    color: cssColor(TONES[tone].color),
                }}
            >
                {icon}
            </Box>
            <Box sx={{ minWidth: 0 }}>
                <Typography variant="text2" color="textSecondary" noWrap>
                    {label}
                </Typography>
                {loading ? (
                    <Skeleton width={80} height={32} />
                ) : (
                    <Typography
                        variant="h2"
                        data-testid={TESTIDS.STAT_VALUE}
                        noWrap
                    >
                        {value}
                    </Typography>
                )}
            </Box>
        </CardContent>
    </Card>
);

export default addTestIds(StatCard, TESTIDS);
