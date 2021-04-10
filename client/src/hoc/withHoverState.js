import { useState } from 'react';

export const withHoverState = (WrappedComponent) => {
    const WithHoverState = (props) => {
        const [hoverState, setHoverState] = useState({ isActive: false });

        return (
            <WrappedComponent hoverState={hoverState} setHoverState={setHoverState} {...props} />
        );
    };

    return WithHoverState;
};
