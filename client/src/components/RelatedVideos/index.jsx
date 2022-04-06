import { YouTube } from '../../lib';
import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../../context/DataProvider';

// React components
import { EnhancedVideoItem } from '../VideoGroup/VideoItem';

export const RelatedVideos = ({ videoId = '' }) => {
    const [{ related_videos }, dataDispatch] = useData();

    const fetchRelatedVideos = async (videoId) => {
        try {
            const response = await YouTube.getRelatedVideos(videoId);
            console.log('Related video details => ', response.data);
            dataDispatch({
                type: 'SET_RELATED_VIDEOS',
                payload: {
                    data: response.data.items.filter((video) => video.id.videoId !== videoId),
                },
            });
            dataDispatch({
                type: 'SET_TOAST',
                payload: { data: { message: 'Fetched related videos' } },
            });
        } catch (error) {
            console.error(error);
        }
    };

    console.log('Youtube API key => ', process.env.REACT_APP_YOUTUBE_API_KEY);

    useEffect(() => {
        (async () => {
            if (videoId) await fetchRelatedVideos(videoId);
        })();
    }, [videoId]);

    console.log('Related videos state => ', related_videos);

    return (
        <Fragment>
            <h1 className='font-md'>Related Videos</h1>
            {related_videos.data.length > 0 &&
                related_videos?.data?.map((video) => (
                    <EnhancedVideoItem
                        variant='recommendation'
                        item={{
                            videoId: video?.id?.videoId ?? '/',
                            title: video?.snippet?.title ?? 'Title Unavailable',
                            channel: {
                                channelId: video?.snippet?.channelId ?? '/',
                                channelTitle: video?.snippet?.channelTitle ?? 'Channel unavailable',
                            },
                            thumbnail: {
                                url:
                                    video?.snippet?.thumbnails?.high?.url ??
                                    'https://images.wondershare.com/recoverit/article/2020/03/Video_unavailable_Img_1.jpg',
                            },
                        }}
                    />
                ))}
        </Fragment>
    );
};
