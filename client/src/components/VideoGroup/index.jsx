// styles
import './videogroup.scss';

// React components
import { VideoItem } from './VideoItem';

export const VideoGroup = ({ heading, videoItems }) => {
    return (
        <div className='video_group w-100p mt-4'>
            {heading && <h1 className='font-lg'>{heading}</h1>}
            <div className='flex flex-justify-sb'>
                {videoItems.map((item) => (
                    <VideoItem item={item} />
                ))}
            </div>
        </div>
    );
};
