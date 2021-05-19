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
                right: '1rem',
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
                            backgroundColor: theme.light_background,
                            color: theme.color,
                            padding: '1rem',
                            marginBottom: '.5rem',
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
