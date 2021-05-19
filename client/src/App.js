import { useEffect } from 'react';
import { useData } from './context/DataProvider';
import { Routes, Route } from 'react-router-dom';
import { useModal } from './context/ModalProvider';

// React components
import { Home } from './pages/Home';
import { Nav } from './components/Nav';
import { LikedPage } from './pages/Liked';
import { VideoPlayerPage } from './pages/VideoPlayerPage';
import { EnhancedAuthModal as AuthModal } from './components/Modals/AuthModal';
import { EnhancedPlaylistModal as PlaylistModal } from './components/Modals/PlaylistModal';
import Cookies from 'js-cookie';
import { PlaylistPagePage } from './pages/PlaylistPlayerPage';
import { Toast } from './components/Toast';
import { Feed } from './pages/Feed';
import { NotFound } from './pages/404';

const App = () => {
    const [{ toast }, dataDispatch] = useData();
    const [{ playlist, auth }, modalDispatch] = useModal();

    useEffect(() => {
        console.log(
            'Initial load => currentUser: ',
            JSON.parse(localStorage.getItem('currentUser'))
        );
        if (!JSON.parse(localStorage.getItem('currentUser')))
            dataDispatch({
                type: 'INITIALIZE_DATA',
                payload: {
                    propertyName: 'currentUser',
                    data: null,
                },
            });
        if (!Cookies.get('userId')) localStorage.setItem('currentUser', null);
    }, []);

    return (
        <>
            <Nav />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/video/:videoId' element={<VideoPlayerPage />} />
                <Route path='/playlist/:playlistId' element={<PlaylistPagePage />} />
                <Route path='/liked' element={<LikedPage />} />
                <Route path='/feed' element={<Feed />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            {playlist.isActive && (
                <PlaylistModal modal={playlist} dispatchType='UPDATE_PLAYLIST_MODAL' />
            )}
            {auth.isActive && (
                <AuthModal
                    auth={auth.state.authState}
                    modal={auth}
                    dispatchType='UPDATE_AUTH_MODAL'
                />
            )}
            {toast?.toasts?.length > 0 && <Toast />}
        </>
    );
};

export default App;
