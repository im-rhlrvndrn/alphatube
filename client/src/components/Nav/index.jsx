import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

// styles
import './nav.scss';

// React components
import { MenuIcon } from '../../react_icons/MenuIcon';
import { UploadIcon } from '../../react_icons/UploadIcon';
import { DarkModeIcon } from '../../react_icons/DarkModeIcon';
import { LightModeIcon } from '../../react_icons/LightModeIcon';
import { SidebarGroup } from './SidebarGroup';

export const Nav = () => {
    const { theme, isLightTheme, setTheme } = useTheme();
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const sidebarItems = [
        {
            name: 'Alan Walker',
            media: {
                type: 'image',
                value:
                    'https://images.pexels.com/photos/2280845/pexels-photo-2280845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            },
        },
        {
            name: 'BeingCodr',
            media: {
                type: 'image',
                value:
                    'https://images.pexels.com/photos/2280845/pexels-photo-2280845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            },
        },
        {
            name: 'Brad Traversy',
            media: {
                type: 'image',
                value:
                    'https://images.pexels.com/photos/2280845/pexels-photo-2280845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            },
        },
        {
            name: 'Tanay Pratap',
            media: {
                type: 'image',
                value:
                    'https://images.pexels.com/photos/2280845/pexels-photo-2280845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            },
        },
        {
            name: 'Rahul Ravindran',
            media: {
                type: 'image',
                value:
                    'https://images.pexels.com/photos/2280845/pexels-photo-2280845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            },
        },
    ];

    const toggleIsSidebarActive = () => setIsSidebarActive((prevState) => !prevState);

    return (
        <nav>
            <div
                className='nav'
                style={{ backgroundColor: theme.dark_background, color: theme.color }}
            >
                <button className='bg-transparent' onClick={toggleIsSidebarActive}>
                    <MenuIcon fill={theme.color} />
                </button>
                <div className='logo font-weight-md font-lg ml-2'>AlphaTube</div>
                <input
                    type='text'
                    style={{
                        height: '50px',
                    }}
                    className='searchbar margin-reset ml-2 pl-1 br-5 font-s'
                    placeholder='Search for videos...'
                />
                <button className='bg-transparent ml-2' onClick={setTheme}>
                    {isLightTheme ? (
                        <LightModeIcon fill={theme.color} />
                    ) : (
                        <DarkModeIcon fill={theme.color} />
                    )}
                </button>
                <img
                    src='https://images.pexels.com/photos/2280845/pexels-photo-2280845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    alt=''
                    className='margin-reset ml-2 icon-40 rounded obj-fit-cover '
                />
                <button className='margin-reset btn font-xs font-weight-md ml-2 bg-primary padding-reset flex flex-align-center pr-1 pl-1 br-5'>
                    <UploadIcon style={{ width: '20px', height: '20px' }} /> Upload New Video
                </button>
            </div>

            {isSidebarActive && (
                <div className='sidebar_wrapper'>
                    <div
                        className='sidebar'
                        style={{ backgroundColor: theme.dark_background, color: theme.color }}
                    >
                        <div className='sidebar_header flex flex-align-center pl-4'>
                            <button className='bg-transparent' onClick={toggleIsSidebarActive}>
                                <MenuIcon fill={theme.color} />
                            </button>
                            <h1 className='margin-reset font-lg ml-2'>AlphaTube</h1>
                        </div>
                        <SidebarGroup
                            sidebarItems={[
                                {
                                    name: 'Home',
                                    media: { type: 'component', value: DarkModeIcon },
                                },
                                {
                                    name: 'Explore',
                                    media: { type: 'component', value: DarkModeIcon },
                                },
                                {
                                    name: 'Subscriptions',
                                    media: { type: 'component', value: DarkModeIcon },
                                },
                            ]}
                        />
                        <SidebarGroup heading='subscriptions' sidebarItems={sidebarItems} />
                        <SidebarGroup
                            sidebarItems={[
                                {
                                    name: 'Settings',
                                    media: { type: 'component', value: DarkModeIcon },
                                },
                            ]}
                        />
                    </div>
                    <div className='overlay' onClick={toggleIsSidebarActive}></div>
                </div>
            )}
        </nav>
    );
};
