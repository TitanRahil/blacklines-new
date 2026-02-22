import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import Home from './pages/Home';
import PartPage from './pages/PartPage';
import BuildPage from './pages/BuildPage';
import SubPartPage from './pages/SubPartPage';
import Navbar from './components/Navbar';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useLayoutEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                return;
            }
        }
        window.scrollTo(0, 0);
    }, [pathname, hash]);

    return null;
}

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/parts/:id" element={<PartPage />} />
                <Route path="/parts/:partId/:subPartId" element={<SubPartPage />} />
                <Route path="/builds/:id" element={<BuildPage />} />
            </Routes>
        </Router>
    )
}

export default App
