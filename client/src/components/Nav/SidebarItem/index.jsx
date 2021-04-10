import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { withHoverState } from '../../../hoc/withHoverState';

let SidebarItem = ({ option, hoverState: { isActive }, setHoverState }) => {
    const { theme } = useTheme();
    const { name, media = {} } = option;

    const renderMedia = () => {
        if (media.type === 'image')
            return (
                <img className='rounded icon-30 obj-fit-cover mr-1' src={media.value} alt={name} />
            );
        else if (media.type === 'component')
            return <media.value className='mr-1' fill={theme.color} />;
        return '';
    };

    const toggleHoverState = () =>
        setHoverState((prevState) => ({ ...prevState, isActive: !prevState.isActive }));

    return (
        <div
            className='sidebar_group_item flex flex-align-center mb-1'
            style={{
                backgroundColor: isActive && theme.light_background,
                color: isActive && theme.color,
                padding: isActive && '0.5rem 1rem',
                borderRadius: isActive && '5px 0 0 5px',
            }}
            onMouseEnter={toggleHoverState}
            onMouseLeave={toggleHoverState}
            onFocus={toggleHoverState}
            onBlur={toggleHoverState}
        >
            {renderMedia()}
            <p tabIndex='0' className='font-xs h-max'>
                {name}
            </p>
        </div>
    );
};

SidebarItem = withHoverState(SidebarItem);
export { SidebarItem };
