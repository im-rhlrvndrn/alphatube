import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../context/DataProvider';
import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { getVideo } from '../../utils/youtube.utils';

// styles
import '../../common/scss/playerpage.scss';

// React Components
import VideoPlayer from 'react-youtube';
import { VideoDescription } from '../../components/VideoGroup/VideoDescription';
import { VideoListing } from '../../components/Playlist';
import { RelatedVideos } from '../../components/RelatedVideos';

export const VideoPlayerPage = ({ entity = 'video' }) => {
    const { theme } = useTheme();
    const urlParams = useParams();
    const navigate = useNavigate();
    const [{ playlist, related_videos, currentUser }, dataDispatch] = useData();
    const [video, setVideo] = useState(null);

    const fetchVideo = async () => {
        try {
            let currentVideo = JSON.parse(localStorage.getItem('currentVideo'));
            if (currentVideo?.id !== urlParams?.videoId) {
                const response = await getVideo(urlParams.videoId);
                console.log('video details => ', response);
                dataDispatch({
                    type: 'SET_TOAST',
                    payload: {
                        data: {
                            message: `Fetched video details for ${response.data.items[0].snippet.title}`,
                        },
                    },
                });
                setVideo((prevState) => response.data.items[0]);
                localStorage.setItem('currentVideo', JSON.stringify(response.data.items[0]));
            } else setVideo((prevState) => currentVideo);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        (async () => {
            await fetchVideo();
        })();
    }, [urlParams.videoId]);

    console.log('Video Player rendered with => ', {
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
                        videoId={urlParams?.videoId}
                        opts={{
                            width: '100%',
                            height: '600',
                            playerVars: { autoplay: 1 },
                        }}
                        onEnd={() => navigate(`/video/${related_videos?.data[0]?.id?.videoId}`)}
                    />
                </div>
                {video?.snippet?.title && <VideoDescription video={video} />}
            </div>
            <div className='recommendations_container ml-2'>
                {entity === 'playlist' && <VideoListing />}
                {(entity === 'video' /*&& video?.snippet?.title*/ || entity === 'playlist') && (
                    <RelatedVideos videoId={urlParams.videoId} />
                )}
            </div>
        </div>
    );
};
