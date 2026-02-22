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

    const [loadedCount, setLoadedCount] = useState(0);
    const [isMobile, setIsMobile] = useState(getInitialMobileState);
    const [folderPath, setFolderPath] = useState(() => getInitialMobileState() ? "/mobile-imgs" : "/imgs");
    const frameCount = 200;
    const [isReady, setIsReady] = useState(false);

    // We use a ref to store images so renderFrame can access them instantly without dependency cycle re-renders
    const imagesRef = useRef<HTMLImageElement[]>([]);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const img = imagesRef.current[index];

        if (canvas && img && img.complete && img.naturalWidth > 0) {
            const context = canvas.getContext("2d");
            if (!context) return;

            // Clear screen
            context.clearRect(0, 0, canvas.width, canvas.height);

            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);

            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

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
                const target = isSmall ? "/mobile-imgs" : "/imgs";
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

        // Separate Handler for Canvas sizing (Pixel fidelity)
        const resizeCanvasHandler = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;

                // FIX: Calculate correct frame based on current scroll position instead of resetting to 0
                // This prevents flickering on mobile when URL bar resizes
                if (containerRef.current) {
                    const container = containerRef.current;
                    const rect = container.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    const maxScroll = rect.height - viewportHeight;

                    // We need to calculate progress relative to the container's position in the viewport
                    // Since the component is sticky, rect.top changes as we scroll until it sticks? 
                    // No, the parent is the container, the sticky is inside.
                    // Wait, existing logic: parentTop = rect.top.
                    // If rect.top is negative, we are scrolling into it.

                    // However, during a resize, rect.top might shift slightly.
                    // Let's use the exact same math as handleScroll.

                    let progress = Math.abs(rect.top) / maxScroll;

                    // If rect.top is positive (not reached yet), progress is 0.
                    if (rect.top > 0) progress = 0;

                    progress = Math.max(0, Math.min(1, progress));

                    const frameIndex = Math.min(
                        frameCount - 1,
                        Math.floor(progress * frameCount)
                    );
                    renderFrame(frameIndex);
                } else {
                    renderFrame(0);
                }
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
    }, [renderFrame]);

    // 2. Handle Image Loading whenever folderPath changes
    useEffect(() => {
        // Reset state for new load
        setLoadedCount(0);
        setIsReady(false);
        imagesRef.current = [];

        const currentPath = folderPath;
        const loadedImages: HTMLImageElement[] = [];
        let isCancelled = false;

        // Pre-allocate array and start loading all images in parallel
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const frameStr = i.toString().padStart(3, "0");
            img.src = `${currentPath}/ezgif-frame-${frameStr}.jpg`;

            img.onload = () => {
                if (isCancelled) return;
                setLoadedCount((prev) => prev + 1);
                // Force render the first frame as soon as it loads to prevent black screen
                if (i === 1) {
                    requestAnimationFrame(() => {
                        renderFrame(0);
                        setIsReady(true);
                    });
                }
            };

            img.onerror = () => {
                if (isCancelled) return;
                setLoadedCount((prev) => prev + 1);
            };

            loadedImages.push(img);
        }
        imagesRef.current = loadedImages;

        return () => {
            isCancelled = true;
        };
    }, [folderPath, renderFrame]);

    // 3. Scroll Handler
    useEffect(() => {
        if (!canvasRef.current) return;

        const handleScroll = () => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const rect = container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const parentTop = rect.top;
            const maxScroll = rect.height - viewportHeight;

            let progress = Math.abs(parentTop) / maxScroll;
            progress = Math.max(0, Math.min(1, progress));

            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(progress * frameCount)
            );

            requestAnimationFrame(() => renderFrame(frameIndex));
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [renderFrame, frameCount]);

    return (
        <div ref={containerRef} className={`relative ${isMobile ? 'h-[250vh]' : 'h-[400vh]'} bg-black`}>
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Fallback Background Image to prevent black void before first frame loads */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-700"
                    style={{
                        backgroundImage: `url('${folderPath}/ezgif-frame-001.jpg')`,
                        opacity: isReady ? 0 : 1 // Hide only when first frame is ready
                    }}
                />

                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover relative z-10"
                    width={1920}
                    height={1080}
                />

                {/* Loading Overlay - Only block for the first 17% (approx 35 frames) to allow quick start */}
                {loadedCount < 35 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50 transition-opacity duration-500 backdrop-blur-sm">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-purple-400 font-bold tracking-widest text-sm">
                                INITIALIZING SYSTEM... {Math.round((loadedCount / 35) * 100)}%
                            </p>
                        </div>
                    </div>
                )}

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
