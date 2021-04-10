import { useParams } from 'react-router';
import { EnhancedVideoItem } from '../../components/VideoGroup/VideoItem';
import { useTheme } from '../../context/ThemeContext';

// styles
import './videoplayerpage.scss';

export const VideoPlayerPage = () => {
    const { theme } = useTheme();
    const urlParams = useParams();

    return (
        <div
            className='video_player_page flex pt-2 pb-2 pr-4 pl-4'
            style={{ backgroundColor: theme.dark_background, color: theme.color }}
        >
            <div className='video_player_container'>
                <div className='video_player'>
                    <iframe
                        width='100%'
                        height='600'
                        src={`https://www.youtube-nocookie.com/embed/${urlParams.videoId}`}
                        title='YouTube video player'
                        frameborder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowfullscreen
                    ></iframe>
                </div>
            </div>
            <div className='recommendations_container ml-2'>
                <EnhancedVideoItem
                    variant='recommendation'
                    item={{
                        title: 'sexy NextJS video',
                        creator: 'Rahul Ravindran',
                        thumbnail: {
                            url: 'https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png',
                        },
                    }}
                />
            </div>
        </div>
    );
};
