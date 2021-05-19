import { useEffect, useState } from 'react';
import axios from '../../../axios';
import { useParams } from 'react-router-dom';
import { useData } from '../../../context/DataProvider';
import { useTheme } from '../../../context/ThemeContext';
import { getVideos } from '../../../utils/youtube.utils';

// React components
import { EnhancedVideoItem } from '../../VideoGroup/VideoItem';

export const VideoListing = ({ videos, title }) => {
    const { theme } = useTheme();
    const urlParams = useParams();
    const [{ playlist, currentUser }, dataDispatch] = useData();
    // const [videos, setVideos] = useState([]);

    // useEffect(() => {
    //     // console.log('Playlist videos rendered');
    // }, [playlist, currentUser]);

    return (
        <div
            className='playlist_container pl-2 pr-2 pt-1 pb-1 mb-1'
            style={{ backgroundColor: theme.light_background }}
        >
            <h1 className='font-md margin-reset mb-1'>{title}</h1>
            {videos?.length > 0 &&
                videos?.map(
                    (video) =>
                        !video?.isDeleted && (
                            <EnhancedVideoItem
                                variant='playlist'
                                item={{
                                    videoId: video?.id ?? '/',
                                    title: video?.snippet?.title ?? 'Title Unavailable',
                                    channel: {
                                        channelId: video?.snippet?.channelId ?? '/',
                                        channelTitle:
                                            video?.snippet?.channelTitle ?? 'Channel unavailable',
                                    },
                                    thumbnail: {
                                        url:
                                            video?.snippet?.thumbnails?.medium?.url ??
                                            'https://images.wondershare.com/recoverit/article/2020/03/Video_unavailable_Img_1.jpg',
                                    },
                                }}
                            />
                        )
                )}
        </div>
    );
};
