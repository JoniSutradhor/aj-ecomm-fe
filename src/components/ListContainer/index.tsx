import { ReactNode } from 'react';
import { Box } from '@mui/material';
import EmptyList from 'components/EmptyList';
import ProgressCard from 'components/ProgressCard';
import SearchIcon from 'icons/SearchIcon';
import { ZeroArgsFunctionType } from 'types/functions';

export interface ListContainerProps {
    count: number | undefined;
    /** A request is in flight, the previous rows stay visible but dimmed. */
    pending?: boolean;
    initialized: boolean;
    /** Filters are active, an empty list means "no results" and not "nothing yet". */
    filtered?: boolean;
    children?: ReactNode;
    emptyTitle?: ReactNode;
    emptyText?: ReactNode;
    emptyButtonLabel?: ReactNode;
    emptyOnClick?: ZeroArgsFunctionType;
}

const ListContainer = ({
    count,
    pending = false,
    initialized,
    filtered = false,
    children,
    emptyTitle,
    emptyText,
    emptyButtonLabel,
    emptyOnClick,
}: ListContainerProps) => {
    if (!initialized) {
        return <ProgressCard />;
    }

    if (!count) {
        return filtered ? (
            <EmptyList
                icon={<SearchIcon fontSize="large" />}
                title="No results found"
                text="Try changing or clearing the filters."
            />
        ) : (
            <EmptyList
                title={emptyTitle}
                text={emptyText}
                buttonLabel={emptyButtonLabel}
                onClick={emptyOnClick}
            />
        );
    }

    return (
        <Box
            sx={{
                opacity: pending ? 0.5 : 1,
                pointerEvents: pending ? 'none' : 'auto',
                transition: 'opacity 150ms',
            }}
        >
            {children}
        </Box>
    );
};

export default ListContainer;
