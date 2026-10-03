import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useLayoutEffect, useEffect, Suspense } from 'react';
import Navbar from './components/Navbar';
import Lenis from '@studio-freight/lenis';

const Home = React.lazy(() => import('./pages/Home'));
const PartPage = React.lazy(() => import('./pages/PartPage'));
const BuildPage = React.lazy(() => import('./pages/BuildPage'));
const SubPartPage = React.lazy(() => import('./pages/SubPartPage'));

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
    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.85,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.15,
            touchMultiplier: 1.5,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <Router>
            <ScrollToTop />
            <Navbar />
            <Suspense fallback={<div className="min-h-screen bg-[#030005] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" /></div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/parts/:id" element={<PartPage />} />
                    <Route path="/parts/:partId/:subPartId" element={<SubPartPage />} />
                    <Route path="/builds/:id" element={<BuildPage />} />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App
