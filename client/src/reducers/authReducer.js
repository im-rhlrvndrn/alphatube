export const initialState = {
    token: null,
    current_user: null,
    is_logged_in: false,
};

export const reducer = ({ state, action: { type, payload } }) => {
    switch (type) {
        case 'SIGNUP':
            return { ...state };

        default:
            return state;
    }
};
