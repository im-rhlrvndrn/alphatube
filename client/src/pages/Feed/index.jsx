import { useTheme } from '../../context/ThemeContext';

// React components
import { FeedLibraryLayout } from '../../components/Layouts/FeedLibrary';

export const Feed = () => {
    const { theme } = useTheme();

    return (
        <div
            className='feed'
            style={{
                paddingBottom: '4rem',
                minHeight: '100vh',
                height: 'auto',
                width: '100%',
                backgroundColor: theme.dark_background,
                color: theme.color,
            }}
        >
            <FeedLibraryLayout title='History' />
            <FeedLibraryLayout title='Liked videos' />
            <FeedLibraryLayout title='Watch later' />
        </div>
    );
};
