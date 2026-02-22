import { Link, useParams } from "react-router-dom";

// Mock Data for Builds
const buildsData: Record<string, {
    name: string;
    project: string;
    image: string;
    description: string;
    specs: { category: string; items: string[] }[];
}> = {
    nightshade: {
        name: "Toyota Supra MK4",
        project: "PROJECT: NIGHTSHADE",
        image: "/build-supra.png",
        description: "A midnight purple beast designed to rule the Tokyo expressways. Built with a no-compromise approach to top speed and aerodynamic stability, 'Nightshade' represents the pinnacle of the JZA80 platform.",
        specs: [
            { category: "Engine", items: ["3.4L 2JZ-GTE Stroker", "Precision 7675 Turbo", "Motec M150 ECU", "Titan Motorsports Intake"] },
            { category: "Exterior", items: ["Custom Widebody Kit", "Carbon Fiber GT Wing", "Midnight Purple III Paint", "Varis Diffuser"] },
            { category: "Suspension & Wheels", items: ["Ohlins DFV Coilovers", "RAYS Volk TE37SL (19x10.5/12)", "Endless 6-Pot Brakes"] },
        ]
    },
    azure: {
        name: "Nissan Skyline R34 GT-R",
        project: "PROJECT: AZURE",
        image: "/build-skyline.jpg",
        description: "The ultimate track weapon wrapped in a stunning Bayside Blue-inspired metallic finish. 'Azure' is tuned for razor-sharp response and cornering G-forces that defy physics.",
        specs: [
            { category: "Engine", items: ["RB26DETT N1 Block", "HKS GT-SS Turbos", "Tomei Ti Exhaust", "Haltech Elite 2500"] },
            { category: "Exterior", items: ["Nismo Z-Tune Bumper", "V-Spec II Carbon Hood", "Top Secret Diffuser", "Ganador Mirrors"] },
            { category: "Suspension & Wheels", items: ["Aragosta Type-S Coilovers", "Advan GT Premium (18x10.5)", "Brembo GT Kit"] },
        ]
    },
    han: {
        name: "Mazda RX-7 FD",
        project: "PROJECT: HAN",
        image: "/build-rx7.jpg",
        description: "A tribute to drift culture, this rotary rocket features the iconic Veilside Fortune kit and a setup designed to slide sideways at 100mph with perfect control.",
        specs: [
            { category: "Engine", items: ["13B-REW Bridge Power", "GReddy T78 Turbo", "V-Mount Intercooler", "Exedy Twin-Plate Clutch"] },
            { category: "Exterior", items: ["Veilside Fortune Widebody", "Custom Orange/Black Livery", "RE Amemiya Sleek Lights"] },
            { category: "Suspension & Wheels", items: ["KW Clubsport 3-Way", "Work Meister S1 (19x11/12)", "Wisefab Angle Kit"] },
        ]
    }
};

export default function BuildPage() {
    const { id } = useParams<{ id: string }>();
    const build = id ? buildsData[id] : undefined;

    if (!build || !id) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Build Not Found</h1>
                    <Link to="/#featured-builds" className="text-purple-500 hover:text-purple-400 underline">
                        Return to Builds
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white selection:bg-purple-600 selection:text-white pb-20">
            {/* Full Screen Hero with Parallax-like effect */}
            <div className="relative h-[80vh] w-full overflow-hidden">
                <img
                    src={build.image}
                    alt={build.name}
                    className="w-full h-full object-cover object-[center_70%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 z-10">
                    <div className="max-w-7xl mx-auto">
                        <p className="text-purple-400 font-bold tracking-[0.3em] mb-2 animate-fade-in-up">{build.project}</p>
                        <h1 className="text-6xl md:text-9xl font-black uppercase text-white mb-6 text-glow animate-fade-in-up delay-100">
                            {build.name}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-20 mt-12">
                <Link to="/#featured-builds" className="inline-flex items-center text-gray-500 hover:text-white transition-colors mb-12 group">
                    <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Builds
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Description Column */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-purple-600 pl-6">The Story</h2>
                        <p className="text-xl text-gray-300 leading-relaxed text-justify">
                            {build.description}
                        </p>

                        <div className="mt-12 p-8 bg-zinc-900/50 border border-white/5 rounded-2xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm uppercase tracking-wider">Total Power</p>
                                    <p className="text-4xl font-bold text-white">850<span className="text-purple-500 text-2xl">+</span> HP</p>
                                </div>
                                <div className="w-px h-12 bg-white/10" />
                                <div>
                                    <p className="text-gray-500 text-sm uppercase tracking-wider">0-60 MPH</p>
                                    <p className="text-4xl font-bold text-white">2.8<span className="text-purple-500 text-2xl">s</span></p>
                                </div>
                                <div className="w-px h-12 bg-white/10" />
                                <div>
                                    <p className="text-gray-500 text-sm uppercase tracking-wider">Build Time</p>
                                    <p className="text-4xl font-bold text-white">14<span className="text-purple-500 text-2xl">mo</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Specs Column */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 text-white">Technical Specifications</h3>
                        <div className="space-y-8">
                            {build.specs.map((spec, idx) => (
                                <div key={idx} className="group">
                                    <h4 className="text-purple-400 font-bold uppercase tracking-wider mb-3 text-sm flex items-center">
                                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-3 group-hover:shadow-[0_0_10px_#9333ea] transition-shadow" />
                                        {spec.category}
                                    </h4>
                                    <ul className="space-y-2">
                                        {spec.items.map((item, i) => (
                                            <li key={i} className="text-gray-400 border-b border-white/5 pb-2 last:border-0 hover:text-white transition-colors cursor-default">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-12 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all duration-300">
                            Inquire About This Build
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
