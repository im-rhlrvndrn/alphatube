import axios from '../../../axios';
import { useState } from 'react';
import { useData } from '../../../context/DataProvider';
import { useTheme } from '../../../context/ThemeContext';
import { useModal } from '../../../context/ModalProvider';
import { withModalOverlay } from '../../../hoc/withModalOverlay';

// React components
import { InputGroup } from '../../Inputs/InputGroup';

// styles
import './authmodal.scss';

const AuthModal = ({ auth = 'signup' }) => {
    const { theme } = useTheme();
    const [_, dataDispatch] = useData();
    const [{ auth: authModalState }, modalDispatch] = useModal();
    const [authState, setAuthState] = useState(auth);
    const [authData, setAuthData] = useState({});

    const updateAuthData = (event) =>
        setAuthData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));

    const authActionHandler = async (event, { action }) => {
        try {
            event.preventDefault();
            if (action === 'login') {
                const {
                    data: {
                        success,
                        data: { token, user },
                    },
                    error,
                } = await axios.post('/auth/login', {
                    email: authData.auth_email,
                    password: authData.auth_password,
                });

                console.log('Login Response: ', { token, user });
                if (success) {
                    dataDispatch({
                        type: 'LOGIN',
                        payload: { data: user },
                    });
                }
            } else if (action === 'signup') {
                console.log('Signup req data => ', {
                    full_name: authData.auth_fullname,
                    email: authData.auth_email,
                    password: authData.auth_password,
                    avatar: {},
                });

                const {
                    data: {
                        success,
                        data: { token, user },
                        toast,
                    },
                } = await axios.post('/auth/signup', {
                    full_name: authData.auth_fullname,
                    email: authData.auth_email,
                    password: authData.auth_password,
                    username: authData.auth_username,
                    avatar: {},
                });

                console.log('Signup data: ', { success, data: { token, user }, toast });
                if (success) {
                    dataDispatch({
                        type: 'SIGNUP',
                        payload: { data: user },
                    });
                }
            }

            return modalDispatch({ type: 'UPDATE_AUTH_MODAL' });
        } catch (error) {
            console.log('Error => ', error.response);
        }
    };

    const inputs = [
        {
            condition: ['signup'],
            label: {
                style: { color: theme.color },
            },
            input: {
                name: 'auth_fullname',
                placeholder: 'Full name',
                style: { backgroundColor: theme.light_background, color: theme.color },
                type: 'text',
                value: authState.auth_fullname,
            },
        },
        {
            condition: ['signup'],
            label: {
                style: { color: theme.color },
            },
            input: {
                name: 'auth_username',
                placeholder: 'Username',
                style: { backgroundColor: theme.light_background, color: theme.color },
                type: 'text',
                value: authState.auth_username,
            },
        },
        {
            condition: ['signup', 'login'],
            label: {
                style: { color: theme.color },
            },
            input: {
                name: 'auth_email',
                placeholder: 'Email',
                style: { backgroundColor: theme.light_background, color: theme.color },
                type: 'email',
                value: authState.auth_email,
            },
        },
        {
            condition: ['signup', 'login'],
            label: {
                style: { color: theme.color },
            },
            input: {
                name: 'auth_password',
                placeholder: 'Password',
                style: { backgroundColor: theme.light_background, color: theme.color },
                type: 'password',
                value: authState.auth_password,
            },
        },
    ];

    return (
        <div className='auth-modal'>
            <form onSubmit={(event) => authActionHandler(event, { action: authState })}>
                {inputs?.map(
                    (input) =>
                        input.condition.includes(authState) && (
                            <InputGroup
                                onChange={updateAuthData}
                                data={{ label: input.label, input: input.input }}
                            />
                        )
                )}
                {authState === 'login' && (
                    <div className='form-cta' style={{ color: theme.color }}>
                        Forgot password?
                    </div>
                )}
                <button
                    type='submit'
                    style={{
                        backgroundColor: theme.constants.primary,
                        color: theme.constants.dark,
                    }}
                >
                    {authState}
                </button>
                <div
                    className='form-toggle'
                    style={{ color: theme.color }}
                    onClick={() =>
                        setAuthState((prevState) => (prevState === 'signup' ? 'login' : 'signup'))
                    }
                >
                    {authState === 'signup' ? 'Already a member? Login' : 'Create a new account?'}
                </div>
            </form>
        </div>
    );
};

const EnhancedAuthModal = withModalOverlay(AuthModal);
export { EnhancedAuthModal };
