import { useTheme } from '../../context/ThemeContext';

// styles
import './home.scss';

// React components
import { VideoGroup } from '../../components/VideoGroup';

export const Home = () => {
    const { theme } = useTheme();
    const videoItems = [
        {
            title: 'Getting Started w/ Next.JS',
            creator: 'Rahul Ravindran',
            thumbnail: {
                url: 'https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png',
            },
        },
        {
            title: 'Getting Started w/ Next.JS',
            creator: 'Rahul Ravindran',
            thumbnail: {
                url: 'https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png',
            },
        },
        {
            title: 'Getting Started w/ Next.JS',
            creator: 'Rahul Ravindran',
            thumbnail: {
                url: 'https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png',
            },
        },
        {
            title: 'Getting Started w/ Next.JS',
            creator: 'Rahul Ravindran',
            thumbnail: {
                url: 'https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png',
            },
        },
    ];

    return (
        <div
            className='home'
            style={{ backgroundColor: theme.dark_background, color: theme.color }}
        >
            <VideoGroup heading='Recommended for you' videoItems={videoItems} />
            <VideoGroup heading='Latest videos' videoItems={videoItems} />
        </div>
    );
};
