import { Routes, Route } from 'react-router';

// React components
import { Nav } from './components/Nav';
import { Home } from './pages/Home';

const App = () => {
    return (
        <>
            <Nav /> 
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </>
    );
};

export default App;
