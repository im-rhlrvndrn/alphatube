import axios from '../../axios';
import VideoPlayer from 'react-youtube';
import { useEffect, useState } from 'react';
import { useData } from '../../context/DataProvider';
import { useTheme } from '../../context/ThemeContext';
import { YouTube } from '../../lib/';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

// styles
import '../../common/scss/playerpage.scss';
import { VideoDescription } from '../../components/VideoGroup/VideoDescription';
import { RelatedVideos } from '../../components/RelatedVideos';
import { VideoListing } from '../../components/Playlist';

export const PlaylistPagePage = ({ entity = 'playlist' }) => {
    const { theme } = useTheme();
    const urlParams = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [{ playlist, related_videos, currentUser }, dataDispatch] = useData();
    const [video, setVideo] = useState(null);

    const searchParams = YouTube.decodeQueryParams(location.search);

    const fetchVideos = async () => {
        try {
            const response = await YouTube.getPlaylistItems(urlParams.playlistId);
            console.log('playlist details', response);

            const playlistVideos = response?.data?.items?.map((playlistVideo) => ({
                videoId: playlistVideo?.snippet?.resourceId?.videoId,
                title: playlistVideo?.snippet?.title,
                channel: {
                    channelId: playlistVideo?.snippet?.channelId,
                    channelTitle: playlistVideo?.snippet?.channelTitle,
                },
                description: playlistVideo?.snippet?.description,
                thumbnail: playlistVideo?.snippet?.thumbnails?.medium?.url,
                published_at: playlistVideo?.snippet?.publishedAt,
                playlistId: playlistVideo?.snippet?.playlistId,
            }));

            dataDispatch({
                type: 'SET_PLAYLIST',
                payload: { data: { videos: playlistVideos }, currentVideo: playlistVideos[0] },
            });

            // if (success && !data.isDeleted) {
            //     dataDispatch({ type: 'SET_TOAST', payload: { data: toast } });
            //     if (success) {
            //         const response = await YouTube.getVideos([
            // ata.description,
            //                     type: data.type,
            //                     isDeleted: data.isDeleted,
            //                     videos: response.data.items.map((video) => {
            //                         const serverPlaylistIndex = data.videos.findIndex(
            //                             (item) => item.videoId === video.id && !item.isDeleted
            //                         );
            //                         if (serverPlaylistIndex !== -1)
            //                             return {
            //                                 ...video,
            //                                 isDeleted: data.videos[serverPlaylistIndex]?.isDeleted,
            //                             };
            //                     }),
            //                 },
            //             },
            //         });

            //         dataDispatch({
            //             type: 'UPDATE_PLAYLIST',
            //             payload: { data },
            //         });
            //     }

            // console.log('Playlist videos => ', {
            //     serverPlaylist: { data, success, toast },
            //     youtubePlaylist: response.data,
            // });
            // setVideos((prevState) => response.data.items);
            // }
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

    console.log('Playlist Player rendered with => ', {
        urlParams,
        video,
        location,
        decodedSearchParams: YouTube.decodeQueryParams(location.search),
    });

    return (
        <div
            className='player_page flex pt-2 pb-2 pr-4 pl-4'
            style={{ backgroundColor: theme.dark_background, color: theme.color }}
        >
            <div className='player_container'>
                <VideoPlayer
                    videoId={playlist?.currentVideo?.videoId}
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

                        if (nextVideoIndex === playlist?.data?.videos?.length) nextVideoIndex -= 1;

                        dataDispatch({
                            type: 'SET_PLAYLIST',
                            payload: {
                                currentVideo: playlist?.data?.videos[nextVideoIndex],
                            },
                        });
                    }}
                />
                {playlist?.currentVideo && <VideoDescription video={playlist?.currentVideo} />}
            </div>
            <div className='recommendations_container ml-2'>
                {playlist?.data?.videos?.length > 0 && (
                    <VideoListing videos={playlist?.data?.videos} title={playlist?.data?.name} />
                )}
                <RelatedVideos videoId={playlist?.currentVideo?.videoId} />
            </div>
        </div>
    );
};
