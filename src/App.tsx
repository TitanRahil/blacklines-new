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

import { BrandProvider } from './context/BrandContext';
import AgencyBanner from './components/AgencyBanner';

function App() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.65,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.0,
            smoothTouch: false,
        });

        (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
            lenis.destroy();
        };
    }, []);

    return (
        <Router>
            <BrandProvider>
                <ScrollToTop />
                <Navbar />
                <AgencyBanner />
                <Suspense fallback={<div className="min-h-screen bg-[#030005] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" /></div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/parts/:id" element={<PartPage />} />
                        <Route path="/parts/:partId/:subPartId" element={<SubPartPage />} />
                        <Route path="/builds/:id" element={<BuildPage />} />
                    </Routes>
                </Suspense>
            </BrandProvider>
        </Router>
    )
}

export default App
