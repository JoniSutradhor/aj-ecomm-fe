import { ElementType } from 'react';
import IconWrapper, { IconWrapperProps } from 'components/IconWrapper';

export const createIcon = (icon: ElementType) => {
    const Icon = (props: Omit<IconWrapperProps, 'icon'>) => (
        <IconWrapper {...props} icon={icon} />
    );
    return Icon;
};
