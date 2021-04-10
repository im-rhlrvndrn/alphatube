export const UploadIcon = ({ style, fill, onClick }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 0 24 24'
            width='24px'
            style={style}
            fill={fill ?? '#000000'}
            onClick={onClick}
        >
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z' />
        </svg>
    );
};
