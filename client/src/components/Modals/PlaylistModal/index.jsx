import { v4 } from 'uuid';
import axios from '../../../axios';
import { alreadyExists, maxWords } from '../../../utils';
import { useEffect, useRef, useState } from 'react';
import { useData } from '../../../context/DataProvider';
import { useTheme } from '../../../context/ThemeContext';
import { useModal } from '../../../context/ModalProvider';
import { withModalOverlay } from '../../../hoc/withModalOverlay';

// styles
import './playlist.scss';

// React components
import { CheckBoxOutlinedIcon } from '../../../react_icons/CheckBoxOutlinedIcon';
import { CheckBoxFilledIcon } from '../../../react_icons/CheckBoxFilledIcon';

// * The items prop is an Array so that you can pass multiple items(books) for adding a whole list of items
// * For example => move an entire cart and create a playlist out of it in one go
const PlaylistModal = ({ modal, dispatchType, items }) => {
    const { theme } = useTheme();
    const playlistRef = useRef(null);
    const [_, modalDispatch] = useModal();
    const [filter, setFilter] = useState('');
    const [{ currentUser }, dataDispatch] = useData();
    const [newPlaylistRef, setNewPlaylistRef] = useState(false);

    console.log('Playlist Modal props => ', { modal, dispatchType, items });

    const addNewPlaylist = () => setNewPlaylistRef((prevState) => !prevState);

    // const addToWishlist = async (wishlistId) => {
    //     setIsModalActive((prevState) => !prevState);
    //     const {
    //         data: { success, data, toast },
    //     } = await axios.post(`/wishlists/${wishlistId}`, {
    //         wishlistItem: items[0],
    //         type: 'ADD_TO_WISHLIST',
    //     });

    //     console.log('API add to playlist => ', data);

    //     if (success)
    //         dataDispatch({
    //             type: 'ADD_TO_WISHLIST',
    //             payload: {
    //                 wishlistId: wishlistId,
    //                 data: [{ book: data.playlist }],
    //             },
    //         });
    // };

    const addToPlaylist = async (playlistId) => {
        try {
            const {
                data: { success, data, toast },
            } = await axios.post(`/playlists/${playlistId}`, {
                type: 'ADD_TO_PLAYLIST',
                data: { videoId: modal.state.videoId, isDeleted: false },
            });

            if (success) {
                dataDispatch({
                    type: 'ADD_TO_PLAYLIST',
                    payload: {
                        data,
                    },
                });
                dataDispatch({
                    type: 'SET_TOAST',
                    payload: {
                        data: toast,
                    },
                });
            }

            modalDispatch({ type: 'UPDATE_PLAYLIST_MODAL' });
        } catch (error) {
            console.error(error);
        }
    };

    const removeFromPlaylist = async (playlistId) => {
        try {
            const {
                data: { success, data, toast },
            } = await axios.post(`/playlists/${playlistId}`, {
                type: 'REMOVE_FROM_PLAYLIST',
                data: { videoId: modal.state.videoId, isDeleted: false },
            });

            if (success) {
                dataDispatch({
                    type: 'REMOVE_FROM_PLAYLIST',
                    payload: {
                        data,
                    },
                });
                dataDispatch({
                    type: 'SET_TOAST',
                    payload: {
                        data: toast,
                    },
                });
            }

            modalDispatch({ type: 'UPDATE_PLAYLIST_MODAL' });
        } catch (error) {
            console.error(error);
        }
    };

    const renderPlaylistNames = (filter = '') => {
        // const userIndex = wishlists.findIndex((item) => item.userId === currentUser);
        const filteredPlaylist =
            filter !== ''
                ? currentUser?.playlists?.filter((item) =>
                      item.name.name.toLowerCase().includes(filter.toLowerCase())
                  )
                : currentUser?.playlists;

        if (!filteredPlaylist?.length)
            return <p style={{ color: theme.color, padding: '1rem' }}>No playlists</p>;

        return filteredPlaylist.map((playlistItem) => {
            const existsInPlaylist = alreadyExists(
                playlistItem.videos,
                { videoId: modal.state.videoId },
                'videoId'
            );
            return (
                <div
                    className='playlist-item flex flex-align-center'
                    style={{ backgroundColor: theme.light_background, color: theme.color }}
                    onClick={() =>
                        existsInPlaylist
                            ? removeFromPlaylist(playlistItem._id)
                            : addToPlaylist(playlistItem._id)
                    }
                >
                    {existsInPlaylist ? (
                        <CheckBoxFilledIcon fill={theme.constants.primary} />
                    ) : (
                        <CheckBoxOutlinedIcon fill={theme.color} />
                    )}
                    <p className='ml-1'>{maxWords(playlistItem.name.name, 30)}</p>
                </div>
            );
        });
    };

    const createPlaylist = async (event) => {
        setNewPlaylistRef((prevState) => !prevState);
        if (!event.target.textContent) return;

        const {
            data: { success, data, toast },
        } = await axios.post(`/playlists/`, {
            type: 'CREATE_PLAYLIST',
            data: {
                name: event.target.textContent,
                videos: [{ videoId: modal.state.videoId }],
            },
        });

        if (success) {
            dataDispatch({
                type: 'CREATE_PLAYLIST',
                payload: {
                    data,
                },
            });
            dataDispatch({
                type: 'SET_TOAST',
                payload: {
                    data: toast,
                },
            });
        }

        modalDispatch({ type: 'UPDATE_PLAYLIST_MODAL' });
    };

    useEffect(() => {
        if (newPlaylistRef) playlistRef.current.focus();
    }, [newPlaylistRef]);

    return (
        <div className='playlist-modal'>
            <div className='heading' style={{ color: theme.color }}>
                Save to playlist
            </div>
            <div className='cta'>
                {currentUser?.playlists?.length > 4 && (
                    <input
                        type='text'
                        value={filter}
                        autoComplete='off'
                        id='playlist-modal-input'
                        name='playlist-modal-input'
                        placeholder='Search for playlist...'
                        onChange={(event) => setFilter((prevState) => event.target.value)}
                        style={{ backgroundColor: theme.light_background, color: theme.color }}
                    />
                )}
                <div
                    className='createNew'
                    onClick={addNewPlaylist}
                    style={{ backgroundColor: theme.dark_background, color: theme.color }}
                >
                    + Create playlist
                </div>
            </div>
            <div className='playlist-modal-wrapper'>
                {newPlaylistRef && (
                    <div
                        className='new-playlist'
                        contentEditable
                        ref={playlistRef}
                        style={{ color: theme.color }}
                        onBlur={createPlaylist}
                    ></div>
                )}
                {renderPlaylistNames(filter)}
            </div>
        </div>
    );
};

const EnhancedPlaylistModal = withModalOverlay(PlaylistModal);
export { EnhancedPlaylistModal };
