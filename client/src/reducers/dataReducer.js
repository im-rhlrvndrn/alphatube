import { v4 } from 'uuid';
import { alreadyExists } from '../utils';

export const initialState = {
    users: [],
    currentUser: JSON.parse(localStorage.getItem('currentUser')),
    toast: {
        toasts: [],
    },
    // liked_videos: [],
    // watch_later: [],
    // history: [],
    playlist: { data: { videos: [] }, currentVideo: null },
    related_videos: { data: [], currentVideo: null },
};

export const reducer = (state, { type, payload }) => {
    console.log('DATA ACTION => ', { type, payload });
    switch (type) {
        case 'INITIALIZE_DATA': {
            const { propertyName, data } = payload;
            localStorage.setItem(propertyName, JSON.stringify(data));
            return { ...state, [propertyName]: data };
        }

        case 'SET_TOAST': {
            const { data } = payload;
            const _id = v4();

            return {
                ...state,
                toast: {
                    toasts: [...state.toast.toasts, { _id, ...data }],
                },
            };
        }

        case 'UNSET_TOAST': {
            const {
                data: { toastId },
            } = payload;

            return {
                ...state,
                toast: {
                    toasts: state.toast.toasts.filter((toast) => toast._id !== toastId),
                },
            };
        }

        case 'SET_PLAYLIST': {
            const { data, currentVideo } = payload;

            return {
                ...state,
                playlist: {
                    ...state.playlist,
                    data: data ?? { ...state.playlist.data },
                    currentVideo: currentVideo ?? data?.videos[0],
                },
            };
        }

        case 'UNSET_PLAYLIST': {
            return {
                ...state,
                playlist: { data: { videos: [] }, currentVideo: null },
            };
        }

        case 'SET_RELATED_VIDEOS': {
            const { data, currentVideo } = payload;

            return {
                ...state,
                related_videos: {
                    data: data ?? [...state.related_videos.data],
                    currentVideo: currentVideo ?? data[0],
                },
            };
        }

        case 'LOGIN': {
            const { data } = payload;
            console.log('Value of data => ', data);
            localStorage.setItem('currentUser', JSON.stringify(data));
            return {
                ...state,
                currentUser: data,
            };
        }

        case 'SIGNUP': {
            const { data } = payload;
            console.log('Value of data => ', data);
            localStorage.setItem('currentUser', JSON.stringify(data));
            return {
                ...state,
                currentUser: data,
            };
        }

        case 'LOGOUT': {
            return {
                ...state,
                currentUser: null,
            };
        }

        case 'ADD_TO_LIKED_VIDEOS': {
            const { data } = payload;
            const alreadyExists =
                state.currentUser.liked_videos.findIndex(
                    (item) => item.videoId === data.videoId
                ) !== -1;
            const updatedCurrentUser = {
                ...state.currentUser,
                liked_videos: alreadyExists
                    ? state.currentUser.liked_videos.map((item) =>
                          item.videoId === data.videoId ? data : item
                      )
                    : [...state.currentUser.liked_videos, data],
            };

            localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
            return {
                ...state,
                currentUser: updatedCurrentUser,
            };
        }

        case 'REMOVE_FROM_LIKED_VIDEOS': {
            const { data } = payload;
            const updatedCurrentUser = {
                ...state.currentUser,
                liked_videos: state.currentUser.liked_videos.filter(
                    (item) => item.videoId !== data.videoId
                ),
            };
            localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
            return {
                ...state,
                currentUser: updatedCurrentUser,
            };
        }

        case 'ADD_TO_WATCH_LATER': {
            const { data } = payload;
            const alreadyExists =
                state.currentUser.watch_later.findIndex((item) => item.videoId === data.videoId) !==
                -1;
            const updatedCurrentUser = {
                ...state.currentUser,
                watch_later: alreadyExists
                    ? state.currentUser.watch_later.map((item) =>
                          item.videoId === data.videoId ? data : item
                      )
                    : [...state.currentUser.watch_later, data],
            };

            localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
            return {
                ...state,
                currentUser: updatedCurrentUser,
            };
        }

        case 'REMOVE_FROM_WATCH_LATER': {
            const { data } = payload;
            const updatedCurrentUser = {
                ...state.currentUser,
                watch_later: state.currentUser.watch_later.filter(
                    (item) => item.videoId !== data.videoId
                ),
            };

            localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
            return {
                ...state,
                currentUser: updatedCurrentUser,
            };
        }

        case 'CREATE_PLAYLIST': {
            const { data } = payload;
            const alreadyExists =
                state.currentUser.playlists.findIndex(
                    (item) => item._id === data._id && item.name.name === data.name.name
                ) !== -1;
            const updatedCurrentUser = {
                ...state.currentUser,
                playlists: alreadyExists
                    ? state.currentUser.playlists.map((item) =>
                          item._id === data._id && item.name.name === data.name.name ? data : item
                      )
                    : [...state.currentUser.playlists, data],
            };

            // if (alreadyExists) return { ...state };
            localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
            return {
                ...state,
                currentUser: updatedCurrentUser,
            };
        }

        case 'DELETE_PLAYLIST': {
            const {
                data: { playlistId },
            } = payload;

            const updatedCurrentUser = {
                ...state.currentUser,
                playlists: state.currentUser.playlists.filter((item) => item._id !== playlistId),
            };

            localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
            return {
                ...state,
                currentUser: updatedCurrentUser,
            };
        }

        case 'ADD_TO_PLAYLIST': {
            const {
                data: { playlistId, video },
            } = payload;

            const updatedCurrentUser = {
                ...state.currentUser,
                playlists: state.currentUser.playlists.map((playlist) => {
                    if (playlist._id === playlistId) {
                        return {
                            ...playlist,
                            videos: alreadyExists(playlist.videos, video, 'videoId')
                                ? playlist.videos.map((item) =>
                                      item.videoId === video.videoId
                                          ? { ...item, isDeleted: false }
                                          : item
                                  )
                                : [...playlist.videos, video],
                        };
                    }
                    return playlist;
                }),
            };

            localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
            return {
                ...state,
                currentUser: updatedCurrentUser,
                playlist: {
                    ...state.playlist,
                    data: {
                        ...state.playlist.data,
                        videos: [...state.playlist.data.videos, video],
                    },
                },
            };
        }

        case 'REMOVE_FROM_PLAYLIST': {
            const {
                data: { playlistId, video },
            } = payload;

            const updatedCurrentUser = {
                ...state.currentUser,
                playlists: state.currentUser.playlists.map((playlist) => {
                    if (playlist._id === playlistId) {
                        return {
                            ...playlist,
                            videos: playlist.videos.filter(
                                (item) => item.videoId !== video.videoId
                            ),
                        };
                    }
                    return playlist;
                }),
            };

            localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
            return {
                ...state,
                currentUser: updatedCurrentUser,
                playlist: {
                    ...state.playlist,
                    data: {
                        ...state.playlist.data,
                        videos: state.playlist.data.videos.filter(
                            (item) => item.id !== video.videoId
                        ),
                    },
                },
            };
        }

        case 'UPDATE_PLAYLIST': {
            const { data } = payload;
            const updatedCurrentUser = {
                ...state.currentUser,
                playlists: alreadyExists(
                    state.currentUser.playlists,
                    {
                        _id: data._id,
                    },
                    '_id'
                )
                    ? state.currentUser.playlists.map((playlist) =>
                          playlist._id === data._id
                              ? { ...playlist, videos: data.videos }
                              : playlist
                      )
                    : [...state.currentUser.playlists, data],
            };

            localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
            return {
                ...state,
                currentUser: updatedCurrentUser,
            };
        }

        default: {
            return state;
        }
    }
};
