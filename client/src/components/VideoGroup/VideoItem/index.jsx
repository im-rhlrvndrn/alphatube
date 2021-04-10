import { Link } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { withHoverState } from '../../../hoc/withHoverState';

// React components
import { VerticalMoreIcon } from '../../../react_icons/VerticalMoreIcon';

const VideoItem = ({
    item: { title, creator, thumbnail },
    hoverState,
    setHoverState,
    variant = 'default',
}) => {
    const { theme } = useTheme();
    const recommendationVariant = variant === 'recommendation';

    const toggleHoverState = (event) =>
        setHoverState((prevState) => ({
            ...prevState,
            isActive: event.type === 'mouseenter' || event.type === 'focus' ? true : false,
        }));

    return (
        <Link
            to={`/R59e1Vl5lO8`}
            className={`video_group_item ${!recommendationVariant ? 'mr-2' : ''} ${
                recommendationVariant ? 'flex flex-align-start margin-reset' : ''
            }`}
            onMouseEnter={toggleHoverState}
            onMouseLeave={toggleHoverState}
            onFocus={toggleHoverState}
            onBlur={toggleHoverState}
            style={{
                cursor: hoverState.isActive && 'pointer',
                width: recommendationVariant && '100%',
            }}
        >
            <img
                style={{
                    width: recommendationVariant && '200px',
                    height: recommendationVariant && '120px',
                }}
                tabIndex='0'
                src={
                    hoverState.isActive
                        ? 'https://i.ytimg.com/an_webp/R59e1Vl5lO8/mqdefault_6s.webp?du=3000&sqp=CKjhxYMG&rs=AOn4CLCenrGJ67IAeR0nvrEIL3tfazT0tA'
                        : thumbnail.url
                }
                alt={title}
            />
            <div className={`content flex ${recommendationVariant ? 'margin-reset' : 'mt-1'}`}>
                {!recommendationVariant && (
                    <img
                        className='margin-reset rounded icon-40 mr-1 obj-fit-cover'
                        src='https://scontent-bom1-1.cdninstagram.com/v/t51.2885-19/s150x150/51753265_750418611991537_2843550907260469248_n.jpg?tp=1&_nc_ht=scontent-bom1-1.cdninstagram.com&_nc_ohc=mRYs73TY9AEAX-CJGS1&edm=ABfd0MgAAAAA&ccb=7-4&oh=9d7fc16faa0d8bdd6153597dc3c7d46b&oe=609675A3&_nc_sid=7bff83'
                        alt=''
                    />
                )}
                <div className='content_details' style={{ color: theme.color }}>
                    <h2
                        tabIndex='0'
                        className={`${recommendationVariant ? 'font-xs' : 'font-s'} margin-reset`}
                    >
                        {title}
                    </h2>
                    <p tabIndex='0' className='opac-6 font-xs'>
                        {creator}
                    </p>
                    <div className='statistics'>
                        <span tabIndex='0' className='views font-xs opac-6'>
                            9M views
                        </span>
                        <span tabIndex='0' className='published_time font-xs opac-6 ml-1'>
                            10 hours ago
                        </span>
                    </div>
                </div>
                <button class='bg-transparent ml-1 flex flex-align-start'>
                    <VerticalMoreIcon fill={theme.color} />
                </button>
            </div>
        </Link>
    );
};

const EnhancedVideoItem = withHoverState(VideoItem);
export { EnhancedVideoItem };
