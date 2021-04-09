import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';

export const SidebarItem = (option) => {
    const { theme } = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const { name, media = {} } = option.option;

    const renderMedia = () => {
        if (media.type === 'image')
            return (
                <img className='rounded icon-30 obj-fit-cover mr-1' src={media.value} alt={name} />
            );
        else if (media.type === 'component')
            return <media.value className='mr-1' fill={theme.color} />;
        return '';
    };

    const toggleHoverState = () => setIsHovered((prevState) => !prevState);

    return (
        <div
            className='sidebar_group_item flex flex-align-center mb-1'
            style={{
                backgroundColor: isHovered && theme.light_background,
                color: isHovered && theme.color,
            }}
            onMouseEnter={toggleHoverState}
            onMouseLeave={toggleHoverState}
        >
            {renderMedia()}
            <p className='font-xs h-max'>{name}</p>
        </div>
    );
};
