import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../../context/DataProvider';
import { getRelatedVideos } from '../../utils/youtube.utils';

// React components
import { EnhancedVideoItem } from '../VideoGroup/VideoItem';

export const RelatedVideos = ({ videoId = '' }) => {
    const [{ playlist, related_videos }, dataDispatch] = useData();
    const urlParams = useParams();

    const fetchRelatedVideos = async (videoId = videoId) => {
        try {
            const response = await getRelatedVideos(videoId);
            console.log('Related video details => ', response.data);
            dataDispatch({
                type: 'SET_RELATED_VIDEOS',
                payload: { data: response.data.items.filter((video) => video.id !== videoId) },
            });
            dataDispatch({
                type: 'SET_TOAST',
                payload: { data: { message: 'Fetched related videos' } },
            });
        } catch (error) {
            console.error(error);
        }
    };

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
                                    video?.snippet?.thumbnails?.medium?.url ??
                                    'https://images.wondershare.com/recoverit/article/2020/03/Video_unavailable_Img_1.jpg',
                            },
                        }}
                    />
                ))}
        </Fragment>
    );
};
