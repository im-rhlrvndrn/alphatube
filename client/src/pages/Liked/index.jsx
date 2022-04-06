import { useEffect, useState } from 'react';
import { useData } from '../../context/DataProvider';
import { useTheme } from '../../context/ThemeContext';
import { YouTube } from '../../lib';

export const LikedPage = () => {
    const { theme } = useTheme();
    const [{ users }] = useData();
    const [videos, setVideos] = useState([]);

    const fetchVideos = async () => {
        try {
            const response = await YouTube.getVideo(`${users[0]?.liked_videos[0].videoId}`);
            console.log('Multiple Videos => ', response);
            setVideos((prevState) => response.data.items);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        (async () => {
            await fetchVideos();
        })();
    }, []);

    return (
        <div>
            {videos?.map((item) => (
                <p style={{ color: theme.color }}>{item?.snippet?.title}</p>
            ))}
        </div>
    );
};
