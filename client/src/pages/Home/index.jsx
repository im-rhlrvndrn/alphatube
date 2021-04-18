import axios from 'axios';
import { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

// styles
import './home.scss';

// React components
import { VideoGroup } from '../../components/VideoGroup';

// Assets
import NextJSAnimatedThumbnail from '../../assets/nextjsanimated.webp';

export const Home = () => {
    const { theme } = useTheme();
    const videoItems = [
        {
            title: 'Getting Started w/ Next.JS',
            creator: 'Rahul Ravindran',
            thumbnail: {
                url: 'https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png',
                animated: {
                    url: NextJSAnimatedThumbnail,
                },
            },
        },
        {
            title: 'Getting Started w/ Next.JS',
            creator: 'Rahul Ravindran',
            thumbnail: {
                url: 'https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png',
                animated: {
                    url: NextJSAnimatedThumbnail,
                },
            },
        },
        {
            title: 'Getting Started w/ Next.JS',
            creator: 'Rahul Ravindran',
            thumbnail: {
                url: 'https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png',
                animated: {
                    url: NextJSAnimatedThumbnail,
                },
            },
        },
        {
            title: 'Getting Started w/ Next.JS',
            creator: 'Rahul Ravindran',
            thumbnail: {
                url: 'https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png',
                animated: {
                    url: NextJSAnimatedThumbnail,
                },
            },
        },
    ];

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:4000/');
                console.log('Server response: ', response);
            } catch (error) {
                console.log('error', error.response);
            }
        })();
    }, []);

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
