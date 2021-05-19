import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { withHoverState } from '../../../hoc/withHoverState';

let SidebarItem = ({ option, hoverState: { isActive }, setHoverState }) => {
    const { theme } = useTheme();
    const { name, media = {}, to = '/' } = option;

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
        <Link
            to={to}
            className='sidebar_group_item flex flex-align-center pt-1 pb-1'
            style={{
                backgroundColor: isActive && theme.light_background,
                color: theme.color,
                padding: isActive && '1rem 0 1rem 1rem',
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
        </Link>
    );
};

SidebarItem = withHoverState(SidebarItem);
export { SidebarItem };
