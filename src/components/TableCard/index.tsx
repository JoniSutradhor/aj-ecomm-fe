import { ReactNode } from 'react';
import { Card, CardProps, TableContainer } from '@mui/material';

export interface TableCardProps extends CardProps {
    /** Rendered under the table, e.g. the pagination. */
    footer?: ReactNode;
}

/** Card around a table with horizontal scroll on small screens. */
const TableCard = ({ children, footer, ...props }: TableCardProps) => (
    <Card {...props}>
        <TableContainer>{children}</TableContainer>
        {footer}
    </Card>
);

export default TableCard;
