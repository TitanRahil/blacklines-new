import { useCallback, useEffect, useRef, useState } from "react";

export default function SequenceHero() {
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

    // Strict Scroll Lock during loading
    useEffect(() => {
        if (!isFullyLoaded) {
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "unset";
            document.body.style.overflow = "unset";
        }
    }, [isFullyLoaded]);

    const targetFrame = useRef(0);
    const currentFrame = useRef(-1);
    const smoothFrame = useRef(0);

    // We use a ref to store ImageBitmaps (pure GPU textures) instead of heavy DOM Image elements
    const imagesRef = useRef<(ImageBitmap | null)[]>([]);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const img = imagesRef.current[index];

        // Since it's an ImageBitmap, its existence implies it is fully decoded and ready to draw
        if (canvas && img && img.width > 0) {
            // Optimize composite performance and remove redundant clearRect.
            // desynchronized: true bypasses composition queues for ultra-low latency rendering.
            const context = canvas.getContext("2d", { alpha: false, desynchronized: true });
            if (!context) return;

            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);

            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            // Clear the canvas explicitly because different aspect ratios might leave trails if ratio != 1
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        }
    }, []);

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
                    console.log("Blacklines: Media Query Change -> Switching to:", target);
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
        // Helper to map scroll position to responsive frame index with end-zone clamp
        const getFrameFromScroll = () => {
            if (!containerRef.current) return 0;
            const container = containerRef.current;
            const rect = container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const maxScroll = rect.height - viewportHeight;
            if (maxScroll <= 0) return 0;

            let progress = Math.abs(rect.top) / maxScroll;
            if (rect.top > 0) progress = 0;
            progress = Math.max(0, Math.min(1, progress));

            // Complete full animation by 85% of scroll distance.
            // Leaves an exit buffer on the final frame so the sequence never crawls 1-by-1 at the tail.
            const ANIMATION_END_PERCENT = 0.85;
            const animProgress = progress / ANIMATION_END_PERCENT;

            if (animProgress >= 0.96) {
                return frameCount - 1;
            }

            // Power 0.9 curve provides instant pickup on initial scroll
            const curvedProgress = Math.pow(animProgress, 0.9);
            return Math.min(
                frameCount - 1,
                Math.floor(curvedProgress * frameCount)
            );
        };

        const resizeCanvasHandler = () => {
            if (canvasRef.current && containerRef.current) {
                const frameIndex = getFrameFromScroll();
                targetFrame.current = frameIndex;
                smoothFrame.current = frameIndex;
            } else {
                targetFrame.current = 0;
                smoothFrame.current = 0;
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
    }, [renderFrame, frameCount]);

    // 2. Handle Image Loading whenever folderPath changes
    useEffect(() => {
        // Reset state for new load
        setLoadedCount(0);
        imagesRef.current = new Array(frameCount);
        currentFrame.current = -1;

        const currentPath = folderPath;
        let isCancelled = false;

        // Smart 2-Pass Loading: Load highly spaced frames first (low fps preview)
        // Then fill in the rest for buttery smooth playback.
        const loadOrder: number[] = [];
        const step = isMobile ? 8 : 12;
        for (let i = 1; i <= frameCount; i += step) loadOrder.push(i);
        for (let i = 1; i <= frameCount; i++) if ((i - 1) % step !== 0) loadOrder.push(i);

        loadOrder.forEach((i) => {
            const frameStr = i.toString().padStart(4, "0");
            const url = `${currentPath}/${frameStr}.webp`;

            // Using the ultra-optimized Fetch API + Blob approach to completely bypass the DOM element overhead.
            // createImageBitmap converts the compressed WebP bytes directly into a GPU-ready pixel texture buffer.
            fetch(url, { priority: i <= 20 ? "high" : "auto" } as RequestInit)
                .then(res => res.blob())
                .then(blob => createImageBitmap(blob, { premultiplyAlpha: 'none' }))
                .then(bitmap => {
                    if (isCancelled) {
                        bitmap.close();
                        return;
                    }
                    imagesRef.current[i - 1] = bitmap;
                    setLoadedCount(prev => prev + 1);
                })
                .catch(() => {
                    // Preloader continues even on a single frame load failure (e.g. 404)
                    if (!isCancelled) {
                        setLoadedCount(prev => prev + 1);
                    }
                });
        });

        // Memory Management: Explicitly close old ImageBitmaps if the component unmounts
        // or re-renders an entirely new sequence to prevent VRAM memory leaks.
        return () => {
            isCancelled = true;
            imagesRef.current.forEach(bitmap => {
                if (bitmap) bitmap.close();
            });
        };
    }, [folderPath, frameCount, isMobile]);

    // 3. Render Loop Interpolator
    // Checks target frame and tries to render the best available loaded frame towards target
    useEffect(() => {
        let animationFrameId: number;

        const loop = () => {
            if (canvasRef.current) {
                // Lenis inherently smooths the scroll input! 
                // Manual frame-lerping is completely deleted to eliminate double-smoothing "heavy" delays.
                const target = targetFrame.current;
                const current = currentFrame.current;

                if (target !== current) {
                    let bestFrame = -1;
                    
                    // Look back from target to find the most recently loaded frame!
                    // If moving forward:
                    if (target > current) {
                        for (let i = target; i >= current; i--) {
                            const img = imagesRef.current[i];
                            if (img) {
                                bestFrame = i;
                                break;
                            }
                        }
                    } else {
                        // If moving backward:
                        for (let i = target; i <= current; i++) {
                            const img = imagesRef.current[i];
                            if (img) {
                                bestFrame = i;
                                break;
                            }
                        }
                    }

                    if (bestFrame !== -1 && bestFrame !== current) {
                        try {
                            renderFrame(bestFrame);
                            currentFrame.current = bestFrame;
                        } catch(e) {}
                    }
                }
            }
            animationFrameId = requestAnimationFrame(loop);
        };
        loop();
        return () => cancelAnimationFrame(animationFrameId);
    }, [renderFrame]);

    // 4. Scroll Handler (Updates Target only)
    useEffect(() => {
        if (!canvasRef.current) return;

        const handleScroll = () => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const rect = container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const parentTop = rect.top;
            const maxScroll = rect.height - viewportHeight;
            if (maxScroll <= 0) return;

            let progress = Math.abs(parentTop) / maxScroll;
            if (parentTop > 0) progress = 0;
            progress = Math.max(0, Math.min(1, progress));

            // Complete full animation by 85% of scroll distance.
            // Leaves an exit buffer on the final frame so the sequence never crawls 1-by-1 at the tail.
            const ANIMATION_END_PERCENT = 0.85;
            const animProgress = progress / ANIMATION_END_PERCENT;

            if (animProgress >= 0.96) {
                targetFrame.current = frameCount - 1;
                return;
            }

            // Power 0.9 curve provides instant pickup on initial scroll
            const curvedProgress = Math.pow(animProgress, 0.9);
            targetFrame.current = Math.min(
                frameCount - 1,
                Math.floor(curvedProgress * frameCount)
            );
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [frameCount]);

    // Calculate actual progress from 0 to 1
    const actualProgress = loadedCount / requiredFrames;
    
    // Apply a quadratic ease-out function (1 - (1 - x)^2) to make the initial loading 
    // psychologically seem much faster, but takes the exact same total time to reach 100%.
    const easedProgress = 1 - Math.pow(1 - actualProgress, 2);
    const loadProgress = Math.min(100, Math.floor(easedProgress * 100));

    return (
        <div ref={containerRef} className={`relative ${isMobile ? 'h-[180vh]' : 'h-[280vh]'} bg-black`}>
            
            {/* Massive Full-Screen Preloader */}
            <div className={`fixed inset-0 z-[100] bg-[#030005] flex flex-col items-center justify-center transition-opacity duration-1000 ${isFullyLoaded ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}>
                <div className="w-11/12 max-w-md flex flex-col items-center gap-6">
                    <h2 className="text-white text-3xl md:text-5xl font-black tracking-[0.4em] uppercase mb-4 italic">
                        BLACKLINES
                    </h2>
                    
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
                        <div 
                            className="absolute top-0 left-0 h-full bg-purple-500 shadow-[0_0_20px_#7c3aed] transition-[width] duration-300 ease-out"
                            style={{ width: `${loadProgress}%` }}
                        />
                    </div>
                    
                    <div className="flex justify-between w-full text-xs font-mono tracking-widest text-purple-400 uppercase font-bold">
                        <span>Loading Engine Textures</span>
                        <span>{loadProgress}%</span>
                    </div>
                </div>
            </div>

            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Fallback Background Image visually behind canvas */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url('${folderPath}/0001.webp')` }}
                />

                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover relative z-10"
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
                            {/* Glass Card - Dark on Mobile, Glass on Desktop */}
                            <div className="backdrop-blur-md bg-black/80 md:bg-white/5 border border-white/10 p-4 md:p-6 rounded-xl overflow-hidden relative group pointer-events-auto transition-all duration-300 md:hover:bg-white/10">
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
                                        EST. 2024 // TOKYO
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
