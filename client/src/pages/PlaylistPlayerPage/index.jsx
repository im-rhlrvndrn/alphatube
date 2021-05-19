import axios from '../../axios';
import VideoPlayer from 'react-youtube';
import { useEffect, useState } from 'react';
import { useData } from '../../context/DataProvider';
import { useTheme } from '../../context/ThemeContext';
import { getVideos } from '../../utils/youtube.utils';
import { useNavigate, useParams } from 'react-router-dom';

// styles
import '../../common/scss/playerpage.scss';
import { VideoDescription } from '../../components/VideoGroup/VideoDescription';
import { RelatedVideos } from '../../components/RelatedVideos';
import { VideoListing } from '../../components/Playlist';

export const PlaylistPagePage = ({ entity = 'playlist' }) => {
    const { theme } = useTheme();
    const urlParams = useParams();
    const navigate = useNavigate();
    const [{ playlist, related_videos, currentUser }, dataDispatch] = useData();
    const [video, setVideo] = useState(null);

    const fetchVideos = async () => {
        try {
            const {
                data: { success, data, toast },
            } = await axios.get(`/playlists/${urlParams.playlistId}`);
            console.log('server playlist', { success, data, toast });
            if (success && !data.isDeleted) {
                dataDispatch({ type: 'SET_TOAST', payload: { data: toast } });
                if (success) {
                    const response = await getVideos([
                        data.videos.map((item) => item.videoId).join(','),
                    ]);

                    dataDispatch({
                        type: 'SET_PLAYLIST',
                        payload: {
                            data: {
                                name: data.name.name,
                                description: data.description,
                                type: data.type,
                                isDeleted: data.isDeleted,
                                videos: response.data.items.map((video) => {
                                    const serverPlaylistIndex = data.videos.findIndex(
                                        (item) => item.videoId === video.id && !item.isDeleted
                                    );
                                    if (serverPlaylistIndex !== -1)
                                        return {
                                            ...video,
                                            isDeleted: data.videos[serverPlaylistIndex]?.isDeleted,
                                        };
                                }),
                            },
                        },
                    });

                    dataDispatch({
                        type: 'UPDATE_PLAYLIST',
                        payload: { data },
                    });
                }

                // console.log('Playlist videos => ', {
                //     serverPlaylist: { data, success, toast },
                //     youtubePlaylist: response.data,
                // });
                // setVideos((prevState) => response.data.items);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        (async () => await fetchVideos())();

        return () =>
            dataDispatch({
                type: 'UNSET_PLAYLIST',
            });
    }, []);

    useEffect(() => {}, [currentUser]);

    // useEffect(() => {
    //     (async () => {
    //         // if (entity === 'playlist' && playlist?.currentVideo)
    //         // await fetchVideo(playlist?.currentVideo?.id);
    //     })();
    // }, [playlist, currentUser]);

    console.log('Playlist Player rendered with => ', {
        urlParams,
        video,
    });

    return (
        <div
            className='player_page flex pt-2 pb-2 pr-4 pl-4'
            style={{ backgroundColor: theme.dark_background, color: theme.color }}
        >
            <div className='player_container'>
                <div className='player'>
                    <VideoPlayer
                        videoId={playlist?.currentVideo?.id}
                        opts={{
                            width: '100%',
                            height: '600',
                            playerVars: { autoplay: 1 },
                        }}
                        onEnd={() => {
                            let nextVideoIndex =
                                playlist?.data?.videos?.findIndex(
                                    (item) => item.id === playlist?.currentVideo?.id
                                ) + 1;

                            if (nextVideoIndex === playlist?.data?.videos?.length)
                                nextVideoIndex -= 1;

                            dataDispatch({
                                type: 'SET_PLAYLIST',
                                payload: {
                                    currentVideo: playlist?.data?.videos[nextVideoIndex],
                                },
                            });
                        }}
                    />
                </div>
                {playlist?.currentVideo && <VideoDescription video={playlist?.currentVideo} />}
            </div>
            <div className='recommendations_container ml-2'>
                {playlist?.data?.videos?.length > 0 && (
                    <VideoListing videos={playlist?.data?.videos} title={playlist?.data?.name} />
                )}
                {playlist?.data?.videos?.length > 0 && (
                    <RelatedVideos videoId={playlist?.currentVideo?.id} />
                )}
            </div>
        </div>
    );
};
