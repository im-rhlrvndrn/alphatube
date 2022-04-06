import Cookies from 'js-cookie';
import axios from '../../../axios';
import { YouTube } from '../../../lib';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isUserLoggedIn, transformDate } from '../../../utils';
import { useData } from '../../../context/DataProvider';
import { useTheme } from '../../../context/ThemeContext';
import { useModal } from '../../../context/ModalProvider';

// styles
import './videodescription.scss';

// React components
import { HeartIcon } from '../../../react_icons/HeartIcon';
import { HeartOutlinedIcon } from '../../../react_icons/HeartOutlinedIcon';
import { WatchLaterOutlinedIcon } from '../../../react_icons/WatchLaterOutlinedIcon';
import { WatchLaterIcon } from '../../../react_icons/WatchLaterIcon';
import { PlaylistAddIcon } from '../../../react_icons/PlaylistAddIcon';

export const VideoDescription = ({ video }) => {
    const { theme } = useTheme();
    const urlParams = useParams();
    const [{ playlist }, modalDispatch] = useModal();
    const [_, dataDispatch] = useData();
    const [channel, setChannel] = useState({});

    const fetchChannel = async () => {
        try {
            let currentChannel = JSON.parse(localStorage.getItem('currentChannel'));

            // if (currentChannel?.id !== video?.snippet?.channelId) alert('The channel is the same');
            // else alert('The channels are not same and we failed to fetch new Channel details');
            if (currentChannel?.id !== video?.channel?.channelId) {
                const {
                    data: { items },
                } = await YouTube.getChannel(video?.channel?.channelId);
                console.log('channel details: ', items[0]);
                setChannel((prevState) => ({
                    id: items[0]?.id,
                    title: items[0]?.snippet?.title,
                    thumbnails: items[0]?.snippet?.thumbnails,
                    statistics: items[0]?.statistics,
                }));
                localStorage.setItem('currentChannel', JSON.stringify(items[0]));
                dataDispatch({
                    type: 'SET_TOAST',
                    payload: { data: { message: 'Fetched channel details' } },
                });
            } else
                setChannel((prevState) => ({
                    id: video?.channel?.channelId,
                    title: currentChannel?.snippet?.title,
                    thumbnails: currentChannel?.snippet?.thumbnails,
                    statistics: currentChannel?.statistics,
                }));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        (async () => {
            if (video?.channel?.channelId) await fetchChannel();
        })();
    }, [video?.channel?.channelId]);

    // useEffect(() => {}, [urlParams.videoId]);

    return (
        <div className='video_description'>
            <VideoDetails title={video?.title} videoId={video?.videoId} video={video} />
            <div className='channel_details flex mt-2'>
                <img
                    style={{ objectFit: 'cover' }}
                    className='icon-50 rounded mr-1'
                    src={channel?.thumbnails?.default?.url}
                    alt={channel?.title}
                />
                <div className='channel_info'>
                    <p className='font-weight-md'>{channel?.title}</p>
                    {/* <h4>{video[0]?.snippet?.channelTitle}</h4> */}
                </div>
            </div>
            <div className='description mt-2'>{video?.description}</div>
        </div>
    );
};

export const VideoDetails = ({ title, videoId, video }) => {
    const { theme } = useTheme();
    // const urlParams = useParams();
    const [{ currentUser }, dataDispatch] = useData();
    const [userStats, setUserStats] = useState({ isLiked: false, watchLater: false });
    const [{ playlist }, modalDispatch] = useModal();

    const { isLiked, watchLater } = userStats;
    const loggedUserId = Cookies.get('userId');

    const addToLikedVideos = async () => {
        try {
            if (isUserLoggedIn()) {
                const {
                    data: { success, data, toast },
                } = await axios.post(`/users/${loggedUserId}`, {
                    type: 'ADD_TO_LIKED_VIDEOS',
                    data: { isDeleted: false, videoId },
                });
                console.log('ADD_TO_LIKED_VIDEOS Response => ', { success, data, toast });
                if (success) {
                    dataDispatch({
                        type: 'ADD_TO_LIKED_VIDEOS',
                        payload: { data },
                    });
                    dataDispatch({ type: 'SET_TOAST', payload: { data: toast } });
                }
            } else {
                modalDispatch({
                    type: 'UPDATE_AUTH_MODAL',
                    payload: { state: { authState: 'login' } },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const removeFromLikedVideos = async (id) => {
        try {
            const {
                data: { success, data, toast },
            } = await axios.post(`/users/${loggedUserId}`, {
                type: 'REMOVE_FROM_LIKED_VIDEOS',
                data: { videoId: id },
            });

            if (success) {
                dataDispatch({
                    type: 'REMOVE_FROM_LIKED_VIDEOS',
                    payload: { data },
                });
                dataDispatch({ type: 'SET_TOAST', payload: { data: toast } });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addToWatchLater = async () => {
        try {
            const {
                data: { success, data, toast },
            } = await axios.post(`/users/${loggedUserId}`, {
                type: 'ADD_TO_WATCH_LATER',
                data: { isDeleted: false, videoId },
            });

            if (success) {
                dataDispatch({
                    type: 'ADD_TO_WATCH_LATER',
                    payload: { data },
                });
                dataDispatch({ type: 'SET_TOAST', payload: { data: toast } });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const removeFromWatchLater = async (id) => {
        try {
            const {
                data: { success, data, toast },
            } = await axios.post(`/users/${loggedUserId}`, {
                type: 'REMOVE_FROM_WATCH_LATER',
                data: { videoId: id },
            });
            if (success) {
                dataDispatch({
                    type: 'REMOVE_FROM_WATCH_LATER',
                    payload: { data },
                });
                dataDispatch({ type: 'SET_TOAST', payload: { data: toast } });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const openPlaylistModal = () =>
        modalDispatch({
            type: 'UPDATE_PLAYLIST_MODAL',
            payload: { state: { videoId } },
        });

    useEffect(() => {
        setUserStats((prevState) => ({
            ...prevState,
            isLiked:
                currentUser?.liked_videos?.findIndex(
                    (item) => item.videoId === videoId && !item.isDeleted
                ) !== -1 && currentUser
                    ? true
                    : false,
            watchLater:
                currentUser?.watch_later?.findIndex(
                    (item) => item.videoId === videoId && !item.isDeleted
                ) !== -1 && currentUser
                    ? true
                    : false,
        }));
    }, [currentUser]);

    console.log('CurrentUser => ', currentUser);
    console.log('Rendered Video Description component => ', { title, video, videoId });

    return (
        <div className='video_details'>
            <h1 className='video_title font-lg'>{title}</h1>
            <div className='video_stats flex flex-justify-sb'>
                <div className='stats opac-6'>
                    {new Intl.NumberFormat().format(video?.statistics?.viewCount)} views{' '}
                    {transformDate(video?.published_at?.split('T')[0])}
                </div>
                <div className='video_engagement flex'>
                    <button
                        onClick={() =>
                            isLiked ? removeFromLikedVideos(videoId) : addToLikedVideos()
                        }
                        className='cursor-pointer mr-1 bg-transparent'
                    >
                        {isLiked ? (
                            <HeartIcon fill={theme.color} />
                        ) : (
                            <HeartOutlinedIcon fill={theme.color} />
                        )}
                    </button>
                    <button
                        className='cursor-pointer mr-1 bg-transparent'
                        onClick={openPlaylistModal}
                    >
                        <PlaylistAddIcon fill={theme.color} />
                    </button>
                    <button
                        onClick={() =>
                            watchLater ? removeFromWatchLater(videoId) : addToWatchLater()
                        }
                        className='cursor-pointer mr-1 bg-transparent'
                    >
                        {watchLater ? (
                            <WatchLaterIcon fill={theme.color} />
                        ) : (
                            <WatchLaterOutlinedIcon fill={theme.color} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
