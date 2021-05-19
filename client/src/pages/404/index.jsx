import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export const NotFound = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const styles = {
        height: 'calc(100vh - 80px)',
        width: '100%',
        backgroundColor: theme.dark_background,
        color: theme.color,
    };

    return (
        <div style={styles} className='flex flex-justify-center flex-align-center flex-dir-cl'>
            <h1 className='font-weight-s'>
                404{' '}
                <span
                    style={{
                        position: 'relative',
                        top: '50%',
                        margin: '0 1rem',
                        transform: 'translateY(-25%)',
                        width: '2px',
                        height: '100%',
                        display: 'inline-block',
                        backgroundColor: theme.color,
                    }}
                ></span>{' '}
                Page not found
            </h1>
            <p
                style={{
                    margin: '1rem 0',
                    display: 'block',
                    color: theme.color,
                    cursor: 'pointer',
                }}
                onClick={() => navigate(-1)}
            >
                Go Back
            </p>
        </div>
    );
};
