import { Link, useParams } from "react-router-dom";

// Mock Data
const partsData: Record<string, { title: string; desc: string; details: string[]; image: string; variations: { id: string; title: string; subtitle: string; image: string }[] }> = {
    spoilers: {
        title: "Aerodynamic Spoilers",
        desc: "Maximize downforce and stability at high speeds.",
        image: "/part-spoiler.jpg",
        details: ["Carbon Fiber Construction", "Adjustable Wing Angle", "Wind Tunnel Tested", "Bolt-on Installation"],
        variations: [
            { id: "gt-wing", title: "GT Wing", subtitle: "Maximum Downforce", image: "/Spoilers - gt wing.jpg" },
            { id: "ducktail", title: "Ducktail", subtitle: "Sleek Street Style", image: "/Spoilers - ductail.jpg" },
            { id: "active-aero", title: "Active Aero", subtitle: "Dynamic Adjustment", image: "/Spoilers - active aero.jpg" },
        ]
    },
    engine: {
        title: "Peformance Engines",
        desc: "Unleash raw power with our tuning packages.",
        image: "/part-engine.jpg",
        details: ["ECU Remapping", "Turbocharger Upgrades", "Forged Internals", "High-flow Intake Systems"],
        variations: [
            { id: "stage-1-tune", title: "Stage 1 Tune", subtitle: "ECU & Intake", image: "/Engine - stage 1 tune.jpg" },
            { id: "big-turbo", title: "Big Turbo Kit", subtitle: "800HP+ Potential", image: "/Engine -  big turbo kit.jpg" },
            { id: "crate-engine", title: "Crate Engine", subtitle: "Pre-built 2JZ/RB26", image: "/Engine - crate engine.jpg" },
            { id: "cooling-pack", title: "Cooling Pack", subtitle: "Track Reliability", image: "/Engine - cooling pack.jpg" },
        ]
    },
    skirts: {
        title: "Side Skirts",
        desc: "Enhance the stance and aerodynamic flow.",
        image: "/part-skirts.jpg",
        details: ["Polyurethane Material", "Paint Match Available", "Aggressive Styling", "Ground Effects"],
        variations: [
            { id: "carbon-splitters", title: "Carbon Splitters", subtitle: "Track Focused", image: "/Skirts - carbon splitters.jpg" },
            { id: "widebody", title: "Widebody Extensions", subtitle: "Integrated Flow", image: "/Skirts - wide body.jpg" },
            { id: "led-underglow", title: "LED Underglow", subtitle: "Night Aesthetics", image: "/Skirts - led.jpg" },
        ]
    },
    wheels: {
        title: "Forged Wheels",
        desc: "Lightweight, durable, and stylish rims.",
        image: "/part-wheels.jpg",
        details: ["Monoblock Forged", "Multi-piece Options", "Custom Offsets", "Wide Range of Finishes"],
        variations: [
            { id: "monoblock-forged", title: "Monoblock Forged", subtitle: "Lightweight Performance", image: "/Wheels - forged.jpg" },
            { id: "3-piece-modular", title: "3-Piece Modular", subtitle: "Deep Dish Custom", image: "/Wheels - modular.jpg" },
            { id: "spyder-spoke", title: "Spyder Spoke", subtitle: "Aggressive Design", image: "/Wheels - spyder.jpg" },
            { id: "track-spec", title: "Track Spec", subtitle: "Center Lock Option", image: "/Wheels - track.jpg" },
        ]
    },
    wraps: {
        title: "Custom Wraps",
        desc: "Protect your paint and change your look.",
        image: "/part-wraps.jpg",
        details: ["3M & Avery Vinyl", "Full Color Change", "PPF Protection", "Custom Graphics"],
        variations: [
            { id: "matte-satin", title: "Matte/Satin", subtitle: "Stealth Look", image: "/Wrap - matte.jpg" },
            { id: "color-shift", title: "Color Shift", subtitle: "Iridescent Finish", image: "/Wrap - color shift.jpg" },
            { id: "full-ppf", title: "Full PPF", subtitle: "Invisible Protection", image: "/Wrap - full ppf.jpg" },
            { id: "liveries", title: "Liveries", subtitle: "Race Team Graphics", image: "/Wrap - liveries.jpg" },
        ]
    },
    interior: {
        title: "Custom Interiors",
        desc: "Transform your cockpit with premium materials.",
        image: "/part-interior.jpg",
        details: ["Alcantara & Leather Upholstery", "Carbon Fiber Trim", "Racing Bucket Seats", "Custom Stitching & Embroidery"],
        variations: [
            { id: "racing-seats", title: "Racing Seats", subtitle: "Recaro / Bride", image: "/Interiors - Racing seat.jpg" },
            { id: "carbon-dash", title: "Carbon Dash", subtitle: "Weight Reduction", image: "/Interiors - Carbon Dash.jpg" },
            { id: "alcantara-wrap", title: "Alcantara Wrap", subtitle: "Premium Touch", image: "/Interiors - Alcantra.jpg" },
            { id: "roll-cage", title: "Roll Cage", subtitle: "FIA Certified", image: "/Interiors - Roll cage.jpg" },
        ]
    },
};

export default function PartPage() {
    const { id } = useParams<{ id: string }>();
    const part = id ? partsData[id] : undefined;

    if (!part || !id) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Part Not Found</h1>
                    <Link to="/" className="text-purple-500 hover:text-purple-400 underline">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black z-0 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
                <Link to="/#modifications" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-12 group">
                    <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Modifications
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">
                            {part.title}
                        </h1>
                        <p className="text-2xl text-gray-300 font-light border-l-4 border-purple-600 pl-6">
                            {part.desc}
                        </p>

                        <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 mt-8">
                            <h3 className="text-xl font-bold mb-6 text-purple-300 uppercase tracking-widest">Specifications</h3>
                            <ul className="space-y-4">
                                {part.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-4 shadow-[0_0_8px_#a855f7]" />
                                        <span className="text-lg text-gray-200">{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Variations Grid */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            {part.variations.map((variant, i) => (
                                <Link to={`/parts/${id}/${variant.id}`} key={i} className="glass-card h-64 relative overflow-hidden rounded-xl hover:border-purple-500/50 transition-all cursor-pointer group/card border border-white/5 block">
                                    {/* Background Image */}
                                    <img
                                        src={variant.image}
                                        alt={variant.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                    />

                                    {/* Overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover/card:opacity-80 transition-opacity" />

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 p-6 z-10 w-full">
                                        <h4 className="font-bold text-white text-xl group-hover/card:text-purple-400 transition-colors shadow-sm">{variant.title}</h4>
                                        <p className="text-sm text-gray-300 mt-2 opacity-80 group-hover/card:opacity-100">{variant.subtitle}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-none uppercase tracking-widest transition-all hover:shadow-[0_0_20px_#7c3aed] mt-4 w-full md:w-auto">
                            Inquire Now
                        </button>
                    </div>

                    {/* Visual Placeholder for Part Image */}
                    <div className="relative h-[800px] w-full bg-zinc-900 rounded-2xl border border-white/5 overflow-hidden group sticky top-24">
                        {/* Background Image */}
                        <img
                            src={part.image}
                            alt={part.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                        <h2 className="text-9xl font-black text-white/10 absolute top-10 right-10 transform -rotate-12 select-none pointer-events-none">
                            {id.toUpperCase()}
                        </h2>

                        <div className="absolute bottom-0 left-0 p-12 z-10">
                            <div className="inline-block px-4 py-1 bg-purple-600/20 border border-purple-500/50 rounded-full text-purple-400 text-sm font-bold tracking-wider mb-4 backdrop-blur-md">
                                SERIES IV
                            </div>
                            <p className="text-4xl font-bold text-white mb-2">{part.title}</p>
                            <p className="text-gray-400 max-w-md">Premium grade components engineered for the streets of Tokyo and the tracks of the world.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
