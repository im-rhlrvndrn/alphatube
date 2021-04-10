import { Routes, Route } from 'react-router';

// React components
import { Home } from './pages/Home';
import { Nav } from './components/Nav';
import { VideoPlayerPage } from './pages/VideoPlayerPage';

const App = () => {
    return (
        <>
            <Nav />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/:videoId' element={<VideoPlayerPage />} />
            </Routes>
        </>
    );
};

export default App;
