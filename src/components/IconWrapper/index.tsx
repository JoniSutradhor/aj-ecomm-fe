import { ElementType, memo } from 'react';
import { SvgIconProps } from '@mui/material';

export interface IconWrapperProps extends SvgIconProps {
    icon: ElementType;
}

const IconWrapper = ({ icon: Icon, ...props }: IconWrapperProps) => (
    <Icon {...props} />
);

export default memo(IconWrapper);
