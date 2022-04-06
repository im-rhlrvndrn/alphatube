import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { withHoverState } from '../../../hoc/withHoverState';
import { maxWords, processDuration, processPublishedAt } from '../../../utils';

// styles
import './videoitem.scss';

// React components
import { VerticalMoreIcon } from '../../../react_icons/VerticalMoreIcon';

// Assets

const VideoItem = ({
    item: {
        videoId = 'fbDoO83t1eM',
        title = 'hell',
        channel: { channelTitle = 'Mera channel', channelId = 'nahi dunga' },
        thumbnail = 'https://i.ytimg.com/vi/NSR_Y_rm_zU/mqdefault.jpg',
        duration = 'PT1H1M55S',
        published_at = 'today',
    },
    hoverState,
    setHoverState,
    variant = 'default',
}) => {
    const { theme } = useTheme();
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [videoOptionsActive, setVideoOptionsActive] = useState(false);
    const { hours, minutes, seconds } = processDuration(duration);
    // const recommendationVariant = variant === 'recommendation';
    // const playlistVariant = variant === 'playlist';

    const getThumbnailUrl = () => {
        if (hoverState.isActive) {
            if (thumbnail?.animated?.url) return thumbnail.animated.url;
        }
        return thumbnail.url;
    };

    const toggleHoverState = (event) =>
        setHoverState((prevState) => ({
            ...prevState,
            isActive: event.type === 'mouseenter' || event.type === 'focus' ? true : false,
        }));

    const defaultVariant = {
        content: {
            className: 'mt-1',
        },
    };

    const playlistVariant = {
        mainDiv: {
            style: { width: '100%' },
            className: 'flex flex-align-start margin-reset mb-1',
        },
        video_thumbnail: {
            style: {
                width: '120px',
                height: '80px',
            },
        },
        content: {
            className: 'ml-1',
        },
    };

    const recommendationVariant = {
        mainDiv: {
            style: { width: '100%' },
            className: 'flex flex-align-start margin-reset mb-1',
        },
        video_thumbnail: {
            style: {
                width: '200px',
                height: '120px',
            },
        },
        content: {
            className: 'margin-reset ml-1',
        },
    };

    useEffect(() => {
        setSelectedVariant(
            variant === 'playlist'
                ? playlistVariant
                : variant === 'recommendation'
                ? recommendationVariant
                : defaultVariant
        );
    }, []);

    return (
        <div
            // to={`/R59e1Vl5lO8`}
            to=''
            className={`video_item ${selectedVariant?.mainDiv?.className ?? ''}`}
            onMouseEnter={toggleHoverState}
            onMouseLeave={toggleHoverState}
            onFocus={toggleHoverState}
            onBlur={toggleHoverState}
            style={{
                cursor: hoverState.isActive && 'pointer',
                ...(selectedVariant?.mainDiv?.style ?? undefined),
            }}
        >
            <Link to={`/video/${videoId}`} className='image_link'>
                <img
                    className='video_thumbnail'
                    style={{
                        ...(selectedVariant?.video_thumbnail?.style ?? undefined),
                    }}
                    tabIndex='0'
                    src={getThumbnailUrl()}
                    alt={title}
                />
                {/* <div
                    className='duration'
                    style={{ color: theme.color, backgroundColor: theme.dark_background }}
                >
                    {`${hours === '00' ? '' : `${hours}:`}${minutes}:${seconds}`}
                </div> */}
            </Link>
            <div className={`content flex ${selectedVariant?.content?.className ?? ''}`}>
                {!recommendationVariant ||
                    (!playlistVariant && (
                        <img
                            className='margin-reset rounded icon-40 mr-1 obj-fit-cover'
                            src='https://scontent-bom1-1.cdninstagram.com/v/t51.2885-19/s150x150/51753265_750418611991537_2843550907260469248_n.jpg?tp=1&_nc_ht=scontent-bom1-1.cdninstagram.com&_nc_ohc=mRYs73TY9AEAX-CJGS1&edm=ABfd0MgAAAAA&ccb=7-4&oh=9d7fc16faa0d8bdd6153597dc3c7d46b&oe=609675A3&_nc_sid=7bff83'
                            alt=''
                        />
                    ))}
                <div className='content_details' style={{ color: theme.color }}>
                    <VideoTitle title={title} url={`/${videoId}`} /*'/R59e1Vl5lO8'*/ />
                    <VideoChannelDetails channel={{ channelId, channelTitle }} />
                    {variant !== 'playlist' && (
                        <div className='statistics'>
                            <span tabIndex='0' className='views font-xs opac-6'>
                                9M views
                            </span>
                            <span tabIndex='0' className='published_time font-xs opac-6'>
                                {' . '}
                                {moment(processPublishedAt(published_at)).fromNow()}
                            </span>
                        </div>
                    )}
                </div>
                <button
                    className='bg-transparent ml-1 flex flex-align-start'
                    onClick={() => setVideoOptionsActive((prevState) => !prevState)}
                    onMouseLeave={() => setVideoOptionsActive(false)}
                >
                    <VerticalMoreIcon fill={theme.color} />
                    {videoOptionsActive && <VideoOptionMenu />}
                </button>
            </div>
        </div>
    );
};

const VideoTitle = ({ title, url }) => {
    const { theme } = useTheme();
    return (
        <Link
            to={`/video/${url}`}
            tabIndex='0'
            title={title}
            className='video_title font-weight-md font-s margin-reset'
            style={{ color: theme.color }}
        >
            {maxWords(title, 30)}
        </Link>
    );
};

const VideoChannelDetails = ({ channel: { channelId, channelTitle } }) => {
    const { theme } = useTheme();
    return (
        <Link
            to={`${channelId === '/' ? '/' : `/channel/${channelId}`}`}
            tabIndex='0'
            className='channel_name opac-6 font-xs display-block'
            style={{ color: theme.color }}
        >
            {channelTitle}
        </Link>
    );
};

const VideoOptionMenu = () => {
    const { theme } = useTheme();

    return (
        <div
            className='video_options'
            style={{ backgroundColor: theme.light_background, color: theme.color }}
        >
            <span>Save to Watch Later</span>
            <span>Save to playlist</span>
        </div>
    );
};

const EnhancedVideoItem = withHoverState(VideoItem);
export { EnhancedVideoItem };
