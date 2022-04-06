import { Fragment } from 'react';

// styles
import './nextvideo.scss';

export const NextVideo = ({
    next_video: {
        thumbnail,
        title,
        channel: { channelId, channelTitle },
    },
}) => {
    return (
        <div className='next_video'>
            <div className='next_video_wrapper'>
                <p>
                    Up next in <strong>4</strong>
                </p>
                <img src={thumbnail?.url} alt={title} />
                <h1>{title}</h1>
                <h2>{channelTitle}</h2> {/* light shade */}
                <div className='cta'>
                    <button>Cancel</button>
                    <button>Play now</button>
                </div>
            </div>
            {/* Timer for next video */}
            {/* Thumbnail and video details */}
            {/* CTA buttons */}
        </div>
    );
};
