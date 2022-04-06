import { Fragment } from 'react';
import VideoPlayer from 'react-youtube';
import { useNavigate, useParams } from 'react-router-dom';

export const MediaPlayer = ({
    next_video: {
        thumbnail,
        videoId,
        channel: { channelId, channelTitle },
        playlistId = '',
    },
    currentVideoId = '',
    media_type = 'video',
}) => {
    const urlParams = useParams();
    const navigate = useNavigate();
    const media_url =
        media_type === 'video' ? `/video/${videoId}` : `/playlist/${playlistId}?video=${videoId}`;

    return (
        <Fragment>
            <VideoPlayer
                videoId={urlParams?.videoId}
                opts={{
                    width: '100%',
                    height: '600',
                    playerVars: { autoplay: 1 },
                }}
                onEnd={() => navigate(media_url)}
            />
        </Fragment>
    );
};
