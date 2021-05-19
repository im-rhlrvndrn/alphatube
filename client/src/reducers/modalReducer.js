export const initialState = {
    playlist: {
        isActive: false,
        state: {},
    },
    auth: {
        isActive: false,
        state: {},
    },
};

export const reducer = (state, { type, payload = { state: {} } }) => {
    console.log('action => ', { type, payload });
    switch (type) {
        case 'UPDATE_PLAYLIST_MODAL': {
            const { state: modalState } = payload;
            return {
                ...state,
                playlist: {
                    ...state.playlist,
                    isActive: !state.playlist.isActive,
                    state: modalState ?? {},
                },
            };
        }

        case 'UPDATE_AUTH_MODAL': {
            const { state: modalState } = payload;
            return {
                ...state,
                auth: {
                    ...state.auth,
                    isActive: !state.auth.isActive,
                    state: modalState ?? {},
                },
            };
        }

        default:
            return state;
    }
};
