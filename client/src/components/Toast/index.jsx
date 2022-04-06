import { useEffect } from 'react';
import { useData } from '../../context/DataProvider';
import { useTheme } from '../../context/ThemeContext';

export const Toast = () => {
    const { theme } = useTheme();
    const [{ toast }, dataDispatch] = useData();

    return (
        <div
            className='toast_container'
            style={{
                position: 'fixed',
                bottom: '1rem',
                left: '1rem',
                width: '400px',
                maxWidth: '400px',
                height: 'auto',
            }}
        >
            {toast?.toasts.map((toast) => {
                setTimeout(() => {
                    dataDispatch({
                        type: 'UNSET_TOAST',
                        payload: { data: { toastId: toast._id } },
                    });
                }, 5000);
                return (
                    <div
                        className='toast'
                        key={toast._id}
                        style={{
                            padding: '1rem',
                            // textAlign: 'right',
                            marginBottom: '.5rem',
                            color: theme.dark_background,
                            backgroundColor: theme.color,
                            borderLeft: '5px solid rgba(255,192,0)',
                        }}
                    >
                        {toast?.message}
                    </div>
                );
            })}
        </div>
    );
};
