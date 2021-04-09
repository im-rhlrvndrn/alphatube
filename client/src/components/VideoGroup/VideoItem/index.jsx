export const VideoItem = ({ item: { title, creator, thumbnail } }) => {
    return (
        <div className='video_group_item mr-2'>
            <img src={thumbnail.url} alt={title} />
            <div className='content flex mt-1'>
                <img
                    className='margin-reset rounded icon-40 mr-1 obj-fit-cover'
                    src='https://scontent-bom1-1.cdninstagram.com/v/t51.2885-19/s150x150/51753265_750418611991537_2843550907260469248_n.jpg?tp=1&_nc_ht=scontent-bom1-1.cdninstagram.com&_nc_ohc=mRYs73TY9AEAX-CJGS1&edm=ABfd0MgAAAAA&ccb=7-4&oh=9d7fc16faa0d8bdd6153597dc3c7d46b&oe=609675A3&_nc_sid=7bff83'
                    alt=''
                />
                <div className='content_details'>
                    <h2 className='font-s margin-reset'>{title}</h2>
                    <p className='opac-6 font-xs'>{creator}</p>
                </div>
            </div>
        </div>
    );
};
