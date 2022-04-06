import { Link } from 'react-router-dom';
import { useData } from '../../../context/DataProvider';
import { useTheme } from '../../../context/ThemeContext';

// styles
import './feedlibrary.scss';

// React components
import { EnhancedVideoItem } from '../../VideoGroup/VideoItem';
import { useEffect, useState } from 'react';
import { YouTube } from '../../../lib';
import axios from '../../../axios';
import Cookies from 'js-cookie';

export const FeedLibraryLayout = ({ title = 'hell' }) => {
    const { theme } = useTheme();
    const [{}, dataDispatch] = useData();
    const [videos, setVideos] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const fetchVideos = async () => {
        try {
            const {
                data: { items },
            } = await YouTube.getVideos(
                currentUser[`${transformTitle(title).slug}`].map(
                    (item) => item.videoId && !item.isDeleted && item.videoId
                ),
                {
                    part: ['snippet', 'statistics', 'contentDetails'],
                    regionCode: 'IN',
                    maxResults: 4,
                }
            );

            const processedVideos = items.map((item) => ({
                videoId: item?.id,
                title: item?.snippet?.title,
                channel: {
                    channelId: item?.snippet?.channelId,
                    channelTitle: item?.snippet?.channelTitle,
                },
                thumbnail: { url: item?.snippet?.thumbnails?.medium?.url },
                published_at: item?.snippet?.publishedAt,
                duration: item?.contentDetails?.duration,
            }));

            setVideos((prevState) => processedVideos);
            localStorage.setItem(`${transformTitle(title).slug}`, JSON.stringify(processedVideos));
            console.log(`${title.toLowerCase()} => `, items);
            dataDispatch({
                type: 'SET_TOAST',
                payload: { data: { message: `Fetched ${title.toLowerCase()}` } },
            });
        } catch (error) {
            console.error(error);
        }
    };

    const renderVideos = (data) => {
        if (!data.length) return <p style={{ minHeight: '100px' }}>No {title}</p>;

        return data?.map((video) => <EnhancedVideoItem item={video} />);
    };

    const transformTitle = (title) => ({
        slug: title.toLowerCase().split(' ').join('_'),
        link: `/feed/${title.toLowerCase().split(' ').join('-')}`,
    });

    useEffect(() => {
        (async () => {
            try {
                const videoData = JSON.parse(localStorage.getItem(`${transformTitle(title).slug}`));
                if (!videoData) await fetchVideos();
                else setVideos(videoData);
            } catch (error) {
                console.error(error);
                dataDispatch({
                    type: 'SET_TOAST',
                    payload: { data: { message: error.response.data.message } },
                });
            }
        })();
    }, []);

    console.log('Transformed title => ', transformTitle('history'));

    return (
        <div className='feed_library'>
            <div className='feed_library_header flex flex-justify-sb'>
                <h1 className='font-md'>{title}</h1>
                <Link to={`${transformTitle(title).link}`} style={{ color: theme.color }}>
                    See all
                </Link>
            </div>
            <div className='feed_library_content flex'>{renderVideos(videos)}</div>
        </div>
    );
};
