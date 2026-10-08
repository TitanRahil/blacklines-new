import { useCallback, useEffect, useRef, useState } from "react";
import { useBrand } from "../context/BrandContext";

export default function SequenceHero() {
    const brand = useBrand();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    // Images are stored in ref for performance, no state needed for re-renders since canvas handles it
    // Initialize state - aggressive mobile detection
    // We check window width immediately. If < 1024, we assume mobile/tablet.
    const getInitialMobileState = () => {
        if (typeof window !== "undefined") {
            return window.innerWidth < 1024;
        }
        return false; // Default to desktop if server-side (not the case here usually but safe)
    };

    const [isMobile, setIsMobile] = useState(getInitialMobileState);
    const [folderPath, setFolderPath] = useState(() => getInitialMobileState() ? "/frames-gtr-mobile" : "/frames");
    const frameCount = 192;
    // We now enforce the strictest loading block possible. 
    // The user prefers watching a loaders for 7-8s rather than experiencing broken 12fps scrolls while loading.
    const requiredFrames = frameCount;
    const [loadedCount, setLoadedCount] = useState(0);
    const isFullyLoaded = loadedCount >= requiredFrames;

    // Strict Scroll Lock & Lenis freeze during loading
    useEffect(() => {
        const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
        if (!isFullyLoaded) {
            lenis?.stop();
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        } else {
            lenis?.start();
            document.documentElement.style.overflow = "unset";
            document.body.style.overflow = "unset";
        }
    }, [isFullyLoaded]);

    const targetFrame = useRef(0);
    const currentFrame = useRef(-1);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const isHeroVisible = useRef(true);
    const renderRafId = useRef<number | null>(null);
    const containerHeightRef = useRef(0);
    const viewportHeightRef = useRef(0);

    // We use a ref to store ImageBitmaps (pure GPU textures) instead of heavy DOM Image elements
    const imagesRef = useRef<(ImageBitmap | null)[]>([]);

    const updateMeasurements = useCallback(() => {
        if (containerRef.current) {
            containerHeightRef.current = containerRef.current.offsetHeight;
        }
        viewportHeightRef.current = window.innerHeight;
    }, []);

    const calculateTargetFrame = useCallback((scrollPosition: number) => {
        const maxScroll = containerHeightRef.current - viewportHeightRef.current;
        if (maxScroll <= 0) return 0;

        let progress = scrollPosition / maxScroll;
        progress = Math.max(0, Math.min(1, progress));

        const ANIMATION_END_PERCENT = 0.86;
        const animProgress = progress / ANIMATION_END_PERCENT;

        if (animProgress >= 0.98) {
            return frameCount - 1;
        }

        return Math.min(
            frameCount - 1,
            Math.floor(animProgress * (frameCount - 1))
        );
    }, [frameCount]);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const img = imagesRef.current[index];

        if (canvas && img && img.width > 0) {
            if (!ctxRef.current) {
                ctxRef.current = canvas.getContext("2d", { alpha: false, desynchronized: true });
            }
            const context = ctxRef.current;
            if (!context) return;

            // Direct zero-transform fast-path when texture matches canvas dimensions
            if (canvas.width === img.width && canvas.height === img.height) {
                context.drawImage(img, 0, 0);
            } else {
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio);

                const centerShift_x = (canvas.width - img.width * ratio) * 0.5;
                const centerShift_y = (canvas.height - img.height * ratio) * 0.5;

                context.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
            }
        }
    }, []);

    // 60-120 FPS render scheduler with recursive catch-up loop:
    // Only fires RAF when frames differ, continuously stepping until caught up.
    const requestRender = useCallback(() => {
        if (!isHeroVisible.current || renderRafId.current !== null) return;

        const tick = () => {
            renderRafId.current = null;
            if (!isHeroVisible.current || !canvasRef.current) return;

            const target = targetFrame.current;
            const current = currentFrame.current;

            if (target !== current) {
                let bestFrame = -1;
                // Direct lookup first
                if (imagesRef.current[target]) {
                    bestFrame = target;
                } else if (target > current) {
                    for (let i = target; i >= current; i--) {
                        if (imagesRef.current[i]) {
                            bestFrame = i;
                            break;
                        }
                    }
                } else {
                    for (let i = target; i <= current; i++) {
                        if (imagesRef.current[i]) {
                            bestFrame = i;
                            break;
                        }
                    }
                }

                if (bestFrame !== -1 && bestFrame !== current) {
                    try {
                        renderFrame(bestFrame);
                        currentFrame.current = bestFrame;
                    } catch (e) {}
                }
            }

            // Keep loop alive if we have pending frames that are ready to draw
            if (currentFrame.current !== targetFrame.current && imagesRef.current[targetFrame.current]) {
                renderRafId.current = requestAnimationFrame(tick);
            }
        };

        renderRafId.current = requestAnimationFrame(tick);
    }, [renderFrame]);

    // IntersectionObserver: Suspends rendering when hero is scrolled offscreen
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                const wasVisible = isHeroVisible.current;
                isHeroVisible.current = entry.isIntersecting;
                if (!wasVisible && entry.isIntersecting) {
                    requestRender();
                }
            },
            { rootMargin: "200px 0px" }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [requestRender]);

    // 1. Handle resizing / mobile detection
    // 1. Handle resizing / mobile detection
    useEffect(() => {
        // use matchMedia for "folderPath" logic (Responsive Design)
        const mql = window.matchMedia("(max-width: 1024px)");

        const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
            const isSmall = e.matches;

            // Critical: Force state update if mismatched
            setIsMobile(prev => {
                if (prev !== isSmall) return isSmall;
                return prev;
            });

            setFolderPath(prev => {
                const target = isSmall ? "/frames-gtr-mobile" : "/frames";
                if (prev !== target) {
                    console.log("Atelier: Media Query Change -> Switching to:", target);
                    return target;
                }
                return prev;
            });
        };

        // Initial check
        handleMediaChange(mql);

        // Listener for changes
        mql.addEventListener("change", handleMediaChange);

        // Handler for updating frames on window resize (Mobile URL bar, etc)
        // Note: Canvas dimensions are fixed to 1920x1080 and stretched via CSS object-fit: cover 
        const resizeCanvasHandler = () => {
            ctxRef.current = null;
            updateMeasurements();
            if (canvasRef.current && containerRef.current) {
                const frameIndex = calculateTargetFrame(window.scrollY);
                targetFrame.current = frameIndex;
                requestRender();
            } else {
                targetFrame.current = 0;
            }
        };

        // Canvas needs to resize on any window dimension change
        window.addEventListener("resize", resizeCanvasHandler);
        // Initial canvas size
        resizeCanvasHandler();

        return () => {
            mql.removeEventListener("change", handleMediaChange);
            window.removeEventListener("resize", resizeCanvasHandler);
        };
    }, [frameCount, requestRender]);

    // 2. High-Efficiency Concurrency-Pooled Loader with RAF Batching
    useEffect(() => {
        setLoadedCount(0);
        imagesRef.current = new Array(frameCount);
        currentFrame.current = -1;

        const currentPath = folderPath;
        let isCancelled = false;

        const loadOrder: number[] = [];
        const step = isMobile ? 8 : 12;
        // Pass 1: Spaced keyframes for immediate responsive scrubbing
        for (let i = 1; i <= frameCount; i += step) loadOrder.push(i);
        // Pass 2: In-between frames to achieve 60fps
        for (let i = 1; i <= frameCount; i++) if ((i - 1) % step !== 0) loadOrder.push(i);

        let loadedCounter = 0;
        let rafBatchId: number | null = null;

        const notifyProgress = () => {
            if (rafBatchId !== null) return;
            rafBatchId = requestAnimationFrame(() => {
                rafBatchId = null;
                if (!isCancelled) {
                    setLoadedCount(loadedCounter);
                }
            });
        };

        // Smooth concurrent worker pool (concurrency: 8 prevents socket saturation & UI thread stalls)
        const CONCURRENCY = 8;
        let nextIndex = 0;

        const loadNext = () => {
            if (isCancelled || nextIndex >= loadOrder.length) return;
            const i = loadOrder[nextIndex++];
            const frameStr = i.toString().padStart(4, "0");
            const url = `${currentPath}/${frameStr}.webp`;

            fetch(url)
                .then(res => res.blob())
                .then(blob => createImageBitmap(blob, { premultiplyAlpha: 'none' }))
                .then(bitmap => {
                    if (isCancelled) {
                        bitmap.close();
                        return;
                    }
                    imagesRef.current[i - 1] = bitmap;
                    loadedCounter++;
                    notifyProgress();
                    if (currentFrame.current === -1 && i === 1) {
                        requestRender();
                    } else if (currentFrame.current !== targetFrame.current) {
                        requestRender();
                    }
                    loadNext();
                })
                .catch(() => {
                    if (!isCancelled) {
                        loadedCounter++;
                        notifyProgress();
                        loadNext();
                    }
                });
        };

        for (let c = 0; c < CONCURRENCY; c++) {
            loadNext();
        }

        return () => {
            isCancelled = true;
            if (rafBatchId !== null) cancelAnimationFrame(rafBatchId);
            imagesRef.current.forEach(bitmap => {
                if (bitmap) bitmap.close();
            });
        };
    }, [folderPath, frameCount, isMobile, requestRender]);

    // 3. Scroll Handler (Updates Target & triggers on-demand render with ZERO layout reflow)
    useEffect(() => {
        if (!canvasRef.current) return;
        updateMeasurements();

        const onScrollTick = (scrollY: number) => {
            if (!containerRef.current || !isHeroVisible.current) return;

            const nextTarget = calculateTargetFrame(scrollY);

            if (targetFrame.current !== nextTarget) {
                targetFrame.current = nextTarget;
                requestRender();
            }
        };

        const handleWindowScroll = () => {
            onScrollTick(window.scrollY);
        };

        const lenis = (window as unknown as { __lenis?: { on: (event: string, cb: (e: { scroll: number }) => void) => void; off: (event: string, cb: (e: { scroll: number }) => void) => void } }).__lenis;

        const handleLenisScroll = (e: { scroll: number }) => {
            onScrollTick(e.scroll);
        };

        if (lenis && typeof lenis.on === "function") {
            lenis.on("scroll", handleLenisScroll);
        }
        window.addEventListener("scroll", handleWindowScroll, { passive: true });
        handleWindowScroll();

        return () => {
            if (lenis && typeof lenis.off === "function") {
                lenis.off("scroll", handleLenisScroll);
            }
            window.removeEventListener("scroll", handleWindowScroll);
        };
    }, [calculateTargetFrame, requestRender, updateMeasurements]);

    // Calculate actual progress from 0 to 1
    const actualProgress = loadedCount / requiredFrames;
    
    // Apply a quadratic ease-out function (1 - (1 - x)^2) to make the initial loading 
    // psychologically seem much faster, but takes the exact same total time to reach 100%.
    const easedProgress = 1 - Math.pow(1 - actualProgress, 2);
    const loadProgress = Math.min(100, Math.floor(easedProgress * 100));

    return (
        <div ref={containerRef} className={`relative ${isMobile ? 'h-[175vh]' : 'h-[220vh]'} bg-black`}>
            
            {/* Massive Full-Screen Preloader */}
            <div className={`fixed inset-0 z-[100] bg-[#030005] flex flex-col items-center justify-center transition-opacity duration-1000 ${isFullyLoaded ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}>
                <div className="w-11/12 max-w-2xl flex flex-col items-center gap-6 px-4">
                    <h2 className="text-white text-2xl sm:text-3xl md:text-5xl font-black tracking-[0.18em] sm:tracking-[0.25em] uppercase mb-4 italic text-center max-w-full break-words leading-tight pr-2">
                        {brand.upper}
                    </h2>
                    
                    <div className="w-full max-w-md h-1 bg-white/10 rounded-full overflow-hidden relative">
                        <div 
                            className="absolute top-0 left-0 h-full bg-purple-500 shadow-[0_0_20px_#7c3aed] transition-[width] duration-300 ease-out"
                            style={{ width: `${loadProgress}%` }}
                        />
                    </div>
                    
                    <div className="flex justify-between w-full max-w-md text-xs font-mono tracking-widest text-purple-400 uppercase font-bold">
                        <span className="truncate pr-2">{brand.isCustomClient ? `Calibrating ${brand.shortName} Assets` : "Loading Engine Textures"}</span>
                        <span className="shrink-0">{loadProgress}%</span>
                    </div>
                </div>
            </div>

            <div className="sticky top-0 h-screen w-full overflow-hidden transform-gpu will-change-transform">
                {/* Fallback Background Image visually behind canvas */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url('${folderPath}/0001.webp')` }}
                />

                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover relative z-10 transform-gpu will-change-transform"
                    width={isMobile ? 1080 : 1920}
                    height={isMobile ? 1920 : 1080}
                />

                {/* Instant Loading - The overlay is removed to allow low-fps scroll right away */}

                {/* Vignette */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black pointer-events-none opacity-50 z-20" />

                {/* Text Overlays - Desktop & Mobile */}
                <div className="absolute inset-0 z-30 flex flex-col justify-between px-6 pt-24 pb-12 md:px-20 md:pt-32 md:pb-12 pointer-events-none">
                    {/* Top Text - Classic Inverted Design */}
                    <div className="flex flex-col items-start relative mix-blend-difference">
                        {/* Thin Technical Line */}
                        <div className="absolute left-0 top-2 h-[85%] w-[2px] bg-purple-500 opacity-80" />

                        <div className="pl-6 md:pl-10 flex flex-col justify-center">
                            <h2 className="text-white text-lg md:text-3xl font-light tracking-[0.8em] uppercase mb-4 md:mb-2 z-10 ml-2 md:ml-4">
                                BEYOND
                            </h2>
                            {/* Massive Premium Glass Text - Verdana Font */}
                            <h1
                                className="text-[17vw] md:text-[15vw] 2xl:text-[14rem] leading-[0.85] font-black uppercase tracking-tight text-glass-premium"
                                style={{ fontFamily: 'Verdana, sans-serif' }}
                            >
                                STOCK
                            </h1>
                            {/* Aligned Tagline (Desktop Only) */}
                            <p className="hidden md:block text-purple-200 font-mono text-xs md:text-sm tracking-[0.4em] uppercase mt-4 md:mt-6 ml-2 md:ml-4 opacity-80">
                                // Elevate Your Drive
                            </p>
                        </div>
                    </div>

                    {/* Bottom Section - Glassmorphism */}
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col items-start gap-4">
                            {/* Glass Card - Desktop Only (Hidden on Mobile) */}
                            <div className="hidden md:block backdrop-blur-md bg-white/5 border border-white/10 p-4 md:p-6 rounded-xl overflow-hidden relative group pointer-events-auto transition-all duration-300 hover:bg-white/10">
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10">
                                    <span className="text-purple-400 text-[10px] md:text-xs font-bold tracking-widest uppercase block mb-1">
                                        System Status
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-white font-mono text-sm md:text-base font-bold">
                                            ONLINE
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-[10px] md:text-xs mt-2 font-mono">
                                        {brand.locationTag}
                                    </p>
                                </div>
                            </div>

                            {/* Mobile-Only Tagline - Placed Below System Status */}
                            <p className="text-purple-200 font-mono text-[10px] tracking-[0.2em] uppercase block md:hidden opacity-80 pl-1">
                                // ELEVATE YOUR DRIVE
                            </p>
                        </div>

                        {/* Scroll Indicator - Tokyo Coordinates */}
                        <div className="hidden md:flex flex-col items-center gap-4 mix-blend-difference text-white">
                            <span className="text-[10px] uppercase tracking-widest font-bold rotate-90 origin-right translate-x-2 mb-16 whitespace-nowrap">
                                35°41'22"N 139°41'30"E
                            </span>
                            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
