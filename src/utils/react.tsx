import React, { ComponentType, LazyExoticComponent } from 'react';
import Suspense from 'components/Suspense';

export function SuspensedComponent<P extends object>(
    Component: ComponentType<P> | LazyExoticComponent<ComponentType<P>>
) {
    const Suspensed = (props: P) => (
        <Suspense>
            <Component {...(props as P & React.JSX.IntrinsicAttributes)} />
        </Suspense>
    );
    return Suspensed;
}
