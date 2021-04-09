import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { DarkModeIcon } from '../../../react_icons/DarkModeIcon';

// React components
import { SidebarItem } from '../SidebarItem';

export const SidebarGroup = ({ heading = '', sidebarItems }) => {
    const { theme } = useTheme();
    const location = useLocation();
    const [showMore, setShowMore] = useState(false);

    console.log('Location stuff: ', location);

    const toggleShowMore = () => setShowMore((prevState) => !prevState);

    const renderSidebarItems = () =>
        showMore
            ? sidebarItems.map((item) => <SidebarItem option={item} />)
            : sidebarItems.slice(0, 4).map((item) => <SidebarItem option={item} />);

    return (
        <div
            className='sidebar_group pt-2 pl-4'
            style={{ borderBottom: `2px solid ${theme.light_background}` }}
        >
            {heading && <h1 className='font-s opac-6 uppercase'>{heading}</h1>}
            {renderSidebarItems()}
            {sidebarItems.length > 4 && (
                <button
                    onClick={toggleShowMore}
                    style={{ color: theme.color }}
                    className='cursor-pointer padding-reset flex flex-align-center bg-transparent w-100p'
                >
                    <DarkModeIcon
                        className='mr-1'
                        fill={theme.color}
                        style={{ width: '20px', height: '20px' }}
                    />
                    {showMore ? 'Show less' : `Show ${sidebarItems.length - 4} more`}
                </button>
            )}
        </div>
    );
};
