export const VerticalMoreIcon = ({ style, fill, onClick }) => {
    return (
        <svg
            width='24px'
            height='24px'
            style={style}
            onClick={onClick}
            viewBox='0 0 24 24'
            fill={fill ?? '#000000'}
        >
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
        </svg>
    );
};
