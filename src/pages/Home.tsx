import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import SequenceHero from "../components/SequenceHero";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { CyberScramble } from "../components/CyberScramble";
import { subPartsData } from "../data/subPartsData";
import { useBrand } from "../context/BrandContext";
import CommissionConfigurator from "../components/CommissionConfigurator";
import BookNowSection from "../components/BookNowSection";
import CommissionModal, { CommissionPrefill } from "../components/CommissionModal";

const partners = [
    "RAYS VOLK RACING",
    "TOMEI POWERED",
    "MOTEC MOTORSPORT",
    "HKS PERFORMANCE",
    "ENDLESS BRAKES",
    "ÖHLINS RACING",
    "BREMBO RACING",
    "GARRETT TURBO",
    "RECARO SEATS",
    "WORK WHEELS",
    "HALTECH ECU",
    "KW SUSPENSION"
];

interface CategoryVariation {
    id: string;
    title: string;
    subtitle: string;
    image: string;
}

interface CategoryItem {
    id: string;
    name: string;
    desc: string;
    detail: string;
    image: string;
    details: string[];
    variations: CategoryVariation[];
}

const categories: CategoryItem[] = [
    {
        name: "Aerodynamic Spoilers",
        id: "spoilers",
        desc: "High-downforce dry carbon wings and active aerodynamic elements engineered in wind tunnels.",
        image: "/part-spoiler.jpg",
        detail: "Pre-Preg Carbon • Adjustable Angle",
        details: [
            "Pre-Preg Dry Carbon Fiber Airfoil Construction",
            "Wind Tunnel Tested for High Downforce & Low Induced Drag",
            "Adjustable Angle of Attack (0° to 15° Track Adjustments)",
            "Chassis-Mounted 7075 Billet Aluminum Uprights"
        ],
        variations: [
            { id: "gt-wing", title: "GT Wing", subtitle: "Maximum Downforce (Up to 300kg)", image: "/Spoilers - gt wing.jpg" },
            { id: "ducktail", title: "Ducktail", subtitle: "Sleek Street Style & Low Drag", image: "/Spoilers - ductail.jpg" },
            { id: "active-aero", title: "Active Aero", subtitle: "Dynamic Speed-Adaptive Deployment", image: "/Spoilers - active aero.jpg" },
        ]
    },
    {
        name: "Performance Engines",
        id: "engine",
        desc: "Turn-key crate engines, big single turbo conversions, and bespoke ECU dyno calibrations.",
        image: "/part-engine.jpg",
        detail: "Forged Internals • Twin-Scroll Turbos",
        details: [
            "Bespoke ECU Remapping on In-House AWD Dyno",
            "Precision Gen-2 Turbochargers with Dual Ball Bearings",
            "Forged Connecting Rods, Pistons, and ARP Hardware",
            "High-Efficiency Dual-Pass Intercooler & Oil Cooling Systems"
        ],
        variations: [
            { id: "stage-1-tune", title: "Stage 1 Tune", subtitle: "ECU & High-Flow Intake (+40-60HP)", image: "/Engine - stage 1 tune.jpg" },
            { id: "big-turbo", title: "Big Turbo Kit", subtitle: "Precision 6870 (800HP+ Potential)", image: "/Engine -  big turbo kit.jpg" },
            { id: "crate-engine", title: "Crate Engine", subtitle: "Hand-Built 2JZ-GTE / RB26DETT", image: "/Engine - crate engine.jpg" },
            { id: "cooling-pack", title: "Cooling Pack", subtitle: "Endurance Radiator & Oil Coolers", image: "/Engine - cooling pack.jpg" },
        ]
    },
    {
        name: "Side Skirts & Diffusers",
        id: "skirts",
        desc: "Track-spec ground effects and widebody extensions designed for high-speed laminar airflow.",
        image: "/part-skirts.jpg",
        detail: "Polyurethane & Carbon • Track Fitment",
        details: [
            "Impact-Resistant Polyurethane & Carbon Composite",
            "Factory Color-Matched High-Gloss Automotive Finish",
            "Engineered Ground Effects Channels for Vortex Control",
            "Seamless Flow with Widebody Quarter-Panel Extensions"
        ],
        variations: [
            { id: "carbon-splitters", title: "Carbon Splitters", subtitle: "Track-Focused Ground Clearance", image: "/Skirts - carbon splitters.jpg" },
            { id: "widebody", title: "Widebody Extensions", subtitle: "Seamless Integrated Flared Stance", image: "/Skirts - wide body.jpg" },
            { id: "led-underglow", title: "LED Underglow", subtitle: "Subtle Midnight Tokyo Aesthetics", image: "/Skirts - led.jpg" },
        ]
    },
    {
        name: "Forged Monoblock Wheels",
        id: "wheels",
        desc: "Aerospace-grade 6061-T6 aluminum wheels machined to exact brake clearances and custom offsets.",
        image: "/part-wheels.jpg",
        detail: "Ultra-Lightweight • Bespoke Finishes",
        details: [
            "Precision 10,000-Ton Forged 6061-T6 Aerospace Aluminum",
            "Millimeter-Accurate Custom Offsets and Bolt Patterns",
            "Maximum Unsprung Weight Reduction with High Torsional Rigidity",
            "Over 50 Anodized, Polished, and Powder-Coated Color Options"
        ],
        variations: [
            { id: "monoblock-forged", title: "Monoblock Forged", subtitle: "Ultra-Lightweight Circuit Spec", image: "/Wheels - forged.jpg" },
            { id: "3-piece-modular", title: "3-Piece Modular", subtitle: "Deep Dish Stepped Lip Custom", image: "/Wheels - modular.jpg" },
            { id: "spyder-spoke", title: "Spyder Spoke", subtitle: "Geometric High-Rigidity Design", image: "/Wheels - spyder.jpg" },
            { id: "track-spec", title: "Track Spec", subtitle: "Center-Lock & Knurled Bead Seat", image: "/Wheels - track.jpg" },
        ]
    },
    {
        name: "Wraps & Livery Studio",
        id: "wraps",
        desc: "Self-healing paint protection films, bespoke color-shifting vinyl, and iconic racing liveries.",
        image: "/part-wraps.jpg",
        detail: "3M & Avery Vinyl • Track PPF",
        details: [
            "Premium Cast 3M 2080 and Avery Supreme Wrapping Vinyl",
            "8mil Self-Healing Hydrophobic Paint Protection Film (PPF)",
            "Precision CAD Computer-Cut Body Panel Templates",
            "Hand-Drawn Custom Team Liveries & High-Resolution Print"
        ],
        variations: [
            { id: "matte-satin", title: "Matte / Satin", subtitle: "Stealth Midnight Texture", image: "/Wrap - matte.jpg" },
            { id: "color-shift", title: "Color Shift", subtitle: "Iridescent Multi-Chroma Finish", image: "/Wrap - color shift.jpg" },
            { id: "full-ppf", title: "Full PPF", subtitle: "8mil Self-Healing Armor", image: "/Wrap - full ppf.jpg" },
            { id: "liveries", title: "Custom Liveries", subtitle: "Handcrafted Race Team Graphics", image: "/Wrap - liveries.jpg" },
        ]
    },
    {
        name: "Bespoke Cockpits",
        id: "interior",
        desc: "FIA-certified bucket seats, bespoke Alcantara re-trims, dry carbon dashes, and welded roll cages.",
        image: "/part-interior.jpg",
        detail: "Hand-Stitched Alcantara • FIA Spec",
        details: [
            "Authentic Italian Alcantara & Top-Grain Nappa Leather",
            "Matte Dry Carbon Fiber Center Consoles & Dash Overlays",
            "FIA Homologated Fixed-Back Carbon Kevlar Bucket Seats",
            "TIG-Welded Chromoly Steel Safety Roll Cages"
        ],
        variations: [
            { id: "racing-seats", title: "Racing Seats", subtitle: "Recaro / Bride FIA Certified", image: "/Interiors - Racing seat.jpg" },
            { id: "carbon-dash", title: "Carbon Dash", subtitle: "Weight Reduction & Glare Shield", image: "/Interiors - Carbon Dash.jpg" },
            { id: "alcantara-wrap", title: "Alcantara Wrap", subtitle: "Hand-Stitched Tactile Touchpoints", image: "/Interiors - Alcantra.jpg" },
            { id: "roll-cage", title: "Roll Cage", subtitle: "Chassis Stiffening & FIA Spec", image: "/Interiors - Roll cage.jpg" },
        ]
    },
];

interface BuildSpecItem {
    label: string;
    value: string;
}

interface BuildCategorySpec {
    category: string;
    items: string[];
}

interface FeaturedBuildItem {
    id: string;
    name: string;
    project: string;
    image: string;
    imageOffset: string;
    finish: string;
    accent: string;
    specs: BuildSpecItem[];
    description: string;
    story: string;
    telemetry: BuildSpecItem[];
    technicalSpecs: BuildCategorySpec[];
}

const featuredBuilds: FeaturedBuildItem[] = [
    {
        id: "nightshade",
        name: "Toyota Supra MK4",
        project: "Project Nightshade",
        image: "/build-supra.png",
        imageOffset: "-top-[24%] h-[140%]",
        finish: "Midnight Purple III",
        accent: "purple",
        specs: [
            { label: "Power Output", value: "1,000 HP" },
            { label: "Powertrain", value: "3.4L 2JZ-GTE" },
            { label: "Top Speed", value: "340+ km/h" }
        ],
        description: "An unyielding tribute to Tokyo's Bayshore route, engineered with a stroked 2JZ-GTE, Precision 7675 turbo, and full carbon GT aero.",
        story: "A midnight purple beast designed to rule the Tokyo expressways. Built with a no-compromise approach to top speed and aerodynamic stability, 'Nightshade' represents the absolute pinnacle of the JZA80 platform.",
        telemetry: [
            { label: "Dyno Output", value: "1,000+ HP" },
            { label: "0-100 km/h", value: "2.8s" },
            { label: "Build Time", value: "14 Months" }
        ],
        technicalSpecs: [
            {
                category: "Engine & Drivetrain",
                items: [
                    "3.4L 2JZ-GTE Stroker Billet Crankshaft",
                    "Precision 7675 Gen-2 Dual Ball-Bearing Turbo",
                    "MoTeC M150 Standalone Engine Management",
                    "Titan Motorsports Billet Intake Manifold",
                    "Twin TiAL 44mm External Wastegates"
                ]
            },
            {
                category: "Aero & Composites",
                items: [
                    "Hand-Laid Pre-Preg Widebody Quarter Panels",
                    "1700mm High-Downforce Dry Carbon Wing",
                    "Multi-Stage Midnight Purple III Metallic Paint",
                    "Varis Carbon Fiber Diffuser with Underbody Strakes"
                ]
            },
            {
                category: "Footwork & Brakes",
                items: [
                    "Öhlins DFV Custom Valved Coilovers",
                    "RAYS Volk Racing TE37SL (19x10.5 / 19x12)",
                    "Endless Racing Monoblock 6-Piston Brakes",
                    "Michelin Pilot Sport Cup 2 Semi-Slick Tires"
                ]
            }
        ]
    },
    {
        id: "azure",
        name: "Nissan Skyline GT-R",
        project: "Project Azure",
        image: "/build-skyline.jpg",
        imageOffset: "-top-[18%] h-[135%]",
        finish: "Bayside Track Spec",
        accent: "blue",
        specs: [
            { label: "Power Output", value: "800 HP" },
            { label: "Powertrain", value: "RB26DETT N1" },
            { label: "Cornering Grip", value: "1.45 G" }
        ],
        description: "The quintessential R34 track weapon, featuring an authentic N1 engine block, HKS twin-scroll turbines, and Aragosta Type-S suspension.",
        story: "The quintessential R34 track weapon wrapped in a stunning Bayside Blue-inspired metallic finish. 'Azure' is tuned for razor-sharp throttle response and cornering G-forces that defy physics.",
        telemetry: [
            { label: "Dyno Output", value: "800 HP" },
            { label: "0-100 km/h", value: "3.1s" },
            { label: "Build Time", value: "11 Months" }
        ],
        technicalSpecs: [
            {
                category: "Engine & Drivetrain",
                items: [
                    "RB26DETT Reinforced N1 Engine Block",
                    "HKS GT-SS Twin Ball-Bearing Turbochargers",
                    "Tomei Full Titanium Expreme Ti Exhaust",
                    "Haltech Elite 2500 Engine Management",
                    "Tomei Poncam High-Lift Camshafts & Cam Gears"
                ]
            },
            {
                category: "Aero & Composites",
                items: [
                    "Nismo Z-Tune Front Bumper & Flared Fenders",
                    "V-Spec II Dry Carbon Hood with NACA Duct",
                    "Top Secret Carbon Underbody Diffuser",
                    "Ganador Aero Carbon Side Mirrors"
                ]
            },
            {
                category: "Footwork & Brakes",
                items: [
                    "Aragosta Type-S Inverted Monotube Coilovers",
                    "Advan Racing GT Premium (18x10.5 ET15)",
                    "Brembo GT 6-Piston 380mm Monobloc Brakes",
                    "Attesa E-TS Pro Digital AWD Torque Controller"
                ]
            }
        ]
    },
    {
        id: "han",
        name: "Mazda RX-7 FD3S",
        project: "Project Han",
        image: "/build-rx7.jpg",
        imageOffset: "-top-[22%] h-[138%]",
        finish: "Veilside Fortune",
        accent: "orange",
        specs: [
            { label: "Power Output", value: "650 HP" },
            { label: "Powertrain", value: "13B-REW Rotary" },
            { label: "Steering Angle", value: "+65°" }
        ],
        description: "A rotary masterpiece with bridge-ported housings, GReddy T78 turbocharger, and a full Veilside Fortune widebody silhouette.",
        story: "A tribute to Japanese drift culture, this rotary rocket features the iconic Veilside Fortune widebody and a competition setup engineered to slide sideways at 100mph with pinpoint driver control.",
        telemetry: [
            { label: "Dyno Output", value: "650 HP" },
            { label: "0-100 km/h", value: "3.4s" },
            { label: "Build Time", value: "9 Months" }
        ],
        technicalSpecs: [
            {
                category: "Engine & Drivetrain",
                items: [
                    "13B-REW Bridge-Ported Twin Rotor",
                    "GReddy T78-33D Big Single Turbo Conversion",
                    "V-Mount High-Flow Intercooler & Dual Radiators",
                    "Exedy Multi-Plate Carbon-Ceramic Clutch",
                    "Haltech Elite Rotary Calibration with Anti-Lag"
                ]
            },
            {
                category: "Aero & Composites",
                items: [
                    "Authentic Veilside Fortune Widebody Silhouette",
                    "Custom Two-Tone Sunset Orange & Midnight Black",
                    "RE Amemiya Fixed Sleek HID Headlights",
                    "Carbon Fiber Integrated Rear Wing"
                ]
            },
            {
                category: "Footwork & Brakes",
                items: [
                    "KW Clubsport 3-Way Adjustable Coilovers",
                    "Work Meister S1 3-Piece Wheels (19x11 / 19x12.5)",
                    "Wisefab Competition Steering Angle Lock Kit",
                    "Project Mu Forged Monoblock Calipers & Slotted Rotors"
                ]
            }
        ]
    }
];

interface FaqItemData {
    q: string;
    a: string;
    tag: string;
}

const getFaqs = (brandName: string, brandCity: string): FaqItemData[] => [
    {
        q: "Do you ship internationally?",
        a: "Yes. We ship worldwide to over 50 countries via DHL Express and specialized air freight. Every shipment is fully insured, crated in custom reinforced packaging, and includes complete customs documentation.",
        tag: "Logistics"
    },
    {
        q: "Do you offer installation and dyno tuning services?",
        a: `Our dedicated workshop in ${brandCity} features an AWD Dyno Dynamics cell and certified master technicians. For clients abroad, we coordinate with vetted partner garages across North America, Europe, and Australia.`,
        tag: "Workshop"
    },
    {
        q: "What is your warranty coverage?",
        a: `All ${brandName} carbon composite components and forged wheels carry a lifetime structural warranty against delamination and cracking, along with a 2-year warranty on UV-resistant clear coats.`,
        tag: "Warranty"
    },
    {
        q: "Can I commission custom offsets or paint colors for wheels?",
        a: "Every forged wheel set is made to order from 6061-T6 aerospace aluminum. We offer bespoke offsets down to the millimeter, custom center bores, and over 50 hand-polished and powder-coated finishes.",
        tag: "Bespoke"
    },
    {
        q: "What is your return policy for components?",
        a: "We offer a 30-day inspection period for uninstalled, pristine parts in their original packaging. One-off bespoke commissions and made-to-order engine builds are non-returnable once production starts.",
        tag: "Policy"
    },
];

function FaqItem({ faq, index }: { faq: FaqItemData; index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            className="border-b border-white/[0.08] transition-colors cursor-pointer group py-6"
        >
            <div className="flex items-center justify-between gap-6">
                <div className="flex items-baseline gap-6">
                    <span className="font-mono text-xs text-purple-400/60 tracking-wider">
                        0{index + 1}
                    </span>
                    <h3 className={`text-lg md:text-xl font-medium transition-colors ${isOpen ? "text-purple-300" : "text-white group-hover:text-purple-200"}`}>
                        {faq.q}
                    </h3>
                </div>

                <div className={`w-7 h-7 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 shrink-0 ${isOpen ? "rotate-45 border-purple-500/50 bg-purple-500/20 text-purple-300" : "text-gray-400 group-hover:border-white/30"}`}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                </div>
            </div>

            <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <p className="text-gray-400 font-light leading-relaxed pl-10 text-sm md:text-base max-w-3xl">
                        {faq.a}
                    </p>
                </div>
            </div>
        </div>
    );
}

function AtelierClock() {
    const brand = useBrand();
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const isTokyo = brand.city.toLowerCase() === "tokyo";
            const options: Intl.DateTimeFormatOptions = {
                timeZone: isTokyo ? "Asia/Tokyo" : undefined,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            };
            setTime(new Intl.DateTimeFormat("en-US", options).format(now) + (isTokyo ? " JST" : " LOCAL"));
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, [brand.city]);

    if (!time) return null;

    return (
        <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400/90 pt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span>{brand.shortName} Atelier Time: {time}</span>
        </div>
    );
}

export default function Home() {
    const brand = useBrand();
    const faqs = useMemo(() => getFaqs(brand.name, brand.city), [brand.name, brand.city]);
    const [activeCategory, setActiveCategory] = useState<CategoryItem | null>(null);
    const [activeVariationId, setActiveVariationId] = useState<string | null>(null);
    const [activeBuild, setActiveBuild] = useState<FeaturedBuildItem | null>(null);
    const [isCommissionModalOpen, setIsCommissionModalOpen] = useState(false);
    const [commissionPrefill, setCommissionPrefill] = useState<CommissionPrefill | null>(null);

    const handleOpenCommissionModal = (prefill?: CommissionPrefill) => {
        setCommissionPrefill(prefill || null);
        setIsCommissionModalOpen(true);
    };

    // Prevent background page scrolling & lock Lenis when any modal is open
    useEffect(() => {
        const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;

        if (activeCategory || activeBuild || isCommissionModalOpen) {
            lenis?.stop();
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    setActiveCategory(null);
                    setActiveBuild(null);
                    setIsCommissionModalOpen(false);
                }
            };
            window.addEventListener("keydown", handleKeyDown);

            return () => {
                lenis?.start();
                document.documentElement.style.overflow = "";
                document.body.style.overflow = "";
                window.removeEventListener("keydown", handleKeyDown);
            };
        } else {
            lenis?.start();
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }
    }, [activeCategory, activeBuild, isCommissionModalOpen]);

    const handleOpenCategory = (cat: CategoryItem) => {
        setActiveCategory(cat);
        setActiveVariationId(null);
    };

    return (
        <main className="min-h-screen bg-[#030005] text-white selection:bg-purple-600 selection:text-white">
            <SequenceHero />

            {/* Technical Partner Ticker */}
            <div className="border-y border-purple-500/20 bg-[#07020e]/85 backdrop-blur-sm py-4 overflow-hidden relative shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030005] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030005] to-transparent z-10 pointer-events-none" />

                <div className="animate-marquee items-center gap-14 whitespace-nowrap">
                    {[...partners, ...partners].map((partner, idx) => (
                        <div key={idx} className="flex items-center gap-14">
                            <span className="font-mono text-xs md:text-[13px] tracking-[0.28em] uppercase text-zinc-300 hover:text-purple-300 transition-colors duration-300 cursor-default font-medium">
                                {partner}
                            </span>
                            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.7)]" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Catalog Section */}
            <section id="modifications" className="py-24 md:py-36 px-6 md:px-20 relative bg-[#030005] overflow-hidden">
                {/* Subtle Ambient Radial Lighting */}
                <div className="absolute top-10 left-1/3 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.18)_0%,rgba(88,28,135,0.06)_45%,transparent_70%)] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Editorial Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6 border-b border-white/[0.08] pb-10">
                        <div>
                            <span className="text-purple-400 font-mono text-xs tracking-[0.3em] uppercase block mb-3">
                                The Catalog of {brand.name}
                            </span>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
                                <CyberScramble text="PERFORMANCE CATALOG" />
                            </h2>
                        </div>

                        <p className="text-gray-400 text-sm md:text-base max-w-md font-light leading-relaxed">
                            Explore {brand.name}&apos;s bespoke hardware and craftsmanship disciplines. Click any category to inspect technical specifications, wind-tunnel data, and available variations without leaving the page.
                        </p>
                    </div>

                    {/* Catalog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((cat, index) => (
                            <RevealOnScroll key={cat.id} width="100%" delay={index * 80}>
                                <button
                                    type="button"
                                    onClick={() => handleOpenCategory(cat)}
                                    className="w-full text-left cursor-pointer group relative h-[440px] rounded-xl border border-white/[0.12] hover:border-purple-500/60 transition-all duration-500 flex flex-col justify-end overflow-hidden bg-[#0a0512] hover:-translate-y-1 shadow-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]"
                                >
                                    {/* Bright, Crisp Image */}
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        loading="lazy"
                                        className="absolute inset-0 w-full h-full object-cover brightness-[1.12] contrast-[1.05] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-[1.2]"
                                    />

                                    {/* Minimal Bottom-Only Gradient (Leaves Top 60% Fully Bright) */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                    {/* Content Bar */}
                                    <div className="relative z-10 p-7 bg-gradient-to-t from-black via-black/90 to-transparent">
                                        <span className="font-mono text-[11px] tracking-wider text-purple-400 uppercase block mb-1">
                                            {cat.detail}
                                        </span>
                                        <h3 className="text-2xl font-bold text-white group-hover:text-purple-200 transition-colors uppercase italic mb-2">
                                            {cat.name}
                                        </h3>
                                        <p className="text-gray-300 text-xs leading-relaxed font-light mb-5">
                                            {cat.desc}
                                        </p>

                                        <div className="flex items-center justify-between pt-3 border-t border-white/[0.12] text-xs font-semibold tracking-wider uppercase text-white/90 group-hover:text-purple-300 transition-colors">
                                            <span>Inspect Specifications</span>
                                            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-purple-400 group-hover:bg-purple-600/30 transition-all">
                                                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* In-Page Specification Modal Popup */}
            {activeCategory && (
                <div
                    data-lenis-prevent="true"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md transition-opacity animate-fade-in overscroll-contain"
                    onClick={() => setActiveCategory(null)}
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                >
                    {(() => {
                        const currentSubPart = activeVariationId ? subPartsData[activeVariationId] : null;
                        const displayTitle = currentSubPart ? currentSubPart.title : activeCategory.name;
                        const displaySubtitle = currentSubPart ? currentSubPart.subtitle : activeCategory.detail;
                        const displayImage = currentSubPart ? currentSubPart.image : activeCategory.image;
                        const displayDesc = currentSubPart ? currentSubPart.description : activeCategory.desc;
                        const displayPrice = currentSubPart?.price;

                        return (
                            <div
                                data-lenis-prevent="true"
                                className="relative w-full max-w-5xl xl:max-w-6xl max-h-[88vh] bg-[#080310] border border-white/15 rounded-2xl shadow-[0_0_80px_rgba(124,58,237,0.35)] flex flex-col overflow-hidden text-white overscroll-contain"
                                onClick={(e) => e.stopPropagation()}
                                onWheel={(e) => e.stopPropagation()}
                                onTouchMove={(e) => e.stopPropagation()}
                            >
                                {/* Top Header Bar */}
                                <div className="px-6 py-4 md:px-8 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
                                    <div>
                                        <span className="text-[11px] font-mono tracking-[0.25em] text-purple-400 uppercase block mb-0.5">
                                            {currentSubPart ? `// SPECIFICATION: ${currentSubPart.title.toUpperCase()}` : `// ARCHITECTURE: ${activeCategory.name.toUpperCase()}`}
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-white">
                                                {displayTitle}
                                            </h3>
                                            {displayPrice && (
                                                <span className="text-xs font-mono font-semibold text-purple-300 border border-purple-500/40 bg-purple-950/60 px-2.5 py-0.5 rounded">
                                                    {displayPrice}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setActiveCategory(null)}
                                        className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-gray-300 hover:text-white hover:border-purple-500 hover:bg-purple-600/20 transition-all cursor-pointer"
                                        aria-label="Close specification dialog"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Modal Body with Left Subsection for Editions */}
                                <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
                                    {/* Left Subsection: Available Editions & Variations */}
                                    <div
                                        data-lenis-prevent="true"
                                        className="w-full md:w-72 lg:w-80 shrink-0 border-b md:border-b-0 md:border-r border-white/10 bg-[#05010a]/95 flex flex-col p-4 md:p-5 overflow-y-auto overscroll-contain"
                                        onWheel={(e) => e.stopPropagation()}
                                        onTouchMove={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10 shrink-0">
                                            <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                                Available Editions
                                            </span>
                                            <span className="text-[10px] font-mono text-gray-400">
                                                {1 + activeCategory.variations.length} Options
                                            </span>
                                        </div>

                                        <div className="space-y-2">
                                            {/* Base Overview Card */}
                                            <button
                                                type="button"
                                                onClick={() => setActiveVariationId(null)}
                                                className={`w-full p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 text-left group ${activeVariationId === null
                                                    ? "border-purple-500 bg-purple-950/50 shadow-[0_0_20px_rgba(124,58,237,0.3)] text-white"
                                                    : "border-white/10 bg-white/[0.02] text-gray-300 hover:border-purple-500/40 hover:bg-white/[0.05]"
                                                }`}
                                            >
                                                <img
                                                    src={activeCategory.image}
                                                    alt={activeCategory.name}
                                                    className="w-12 h-12 rounded-lg object-cover brightness-[1.1] contrast-[1.05] shrink-0 border border-white/10"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                                                        Overview
                                                    </h4>
                                                    <p className="text-[10px] text-gray-400 font-light truncate">
                                                        {activeCategory.detail}
                                                    </p>
                                                    <span className="text-[9px] font-mono text-purple-400 uppercase tracking-wider mt-0.5 block font-semibold">
                                                        {activeVariationId === null ? "● Active View" : "Select Edition"}
                                                    </span>
                                                </div>
                                            </button>

                                            {/* Variation Cards */}
                                            {activeCategory.variations.map((variation) => {
                                                const isSelected = activeVariationId === variation.id;
                                                const varSubPart = subPartsData[variation.id];
                                                return (
                                                    <button
                                                        key={variation.id}
                                                        type="button"
                                                        onClick={() => setActiveVariationId(variation.id)}
                                                        className={`w-full p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 text-left group ${isSelected
                                                            ? "border-purple-500 bg-purple-950/50 shadow-[0_0_20px_rgba(124,58,237,0.3)] text-white"
                                                            : "border-white/10 bg-white/[0.02] text-gray-300 hover:border-purple-500/40 hover:bg-white/[0.05]"
                                                        }`}
                                                    >
                                                        <img
                                                            src={variation.image}
                                                            alt={variation.title}
                                                            className="w-12 h-12 rounded-lg object-cover brightness-[1.1] contrast-[1.05] shrink-0 border border-white/10"
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex items-center justify-between gap-1">
                                                                <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                                                                    {variation.title}
                                                                </h4>
                                                                {varSubPart?.price && (
                                                                    <span className="text-[10px] font-mono font-semibold text-purple-300 shrink-0">
                                                                        {varSubPart.price}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-[10px] text-gray-400 font-light truncate">
                                                                {variation.subtitle}
                                                            </p>
                                                            <span className="text-[9px] font-mono text-purple-400 uppercase tracking-wider mt-0.5 block font-semibold">
                                                                {isSelected ? "● Active Spec" : "Select Edition"}
                                                            </span>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Right Main Inspection Area */}
                                    <div
                                        data-lenis-prevent="true"
                                        className="flex-1 min-w-0 p-5 md:p-7 overflow-y-auto space-y-6 bg-[#0a0512] overscroll-contain"
                                        onWheel={(e) => e.stopPropagation()}
                                        onTouchMove={(e) => e.stopPropagation()}
                                    >
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                            {/* Preview Image (5 cols) */}
                                            <div className="lg:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black/50 shadow-xl">
                                                <img
                                                    key={displayImage}
                                                    src={displayImage}
                                                    alt={displayTitle}
                                                    className="w-full h-full object-cover brightness-[1.12] contrast-[1.05] transition-all duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                                                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono">
                                                    <span className="text-purple-300 font-semibold">{displaySubtitle}</span>
                                                    {displayPrice && <span className="text-white/80">{displayPrice}</span>}
                                                </div>
                                            </div>

                                            {/* Overview and Tolerances (7 cols) */}
                                            <div className="lg:col-span-7 space-y-4">
                                                <div>
                                                    <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block mb-1">
                                                        {currentSubPart ? "Component Overview" : "Platform Overview"}
                                                    </span>
                                                    <p className="text-gray-200 text-sm leading-relaxed font-light">
                                                        {displayDesc}
                                                    </p>
                                                </div>

                                                <div className="pt-1">
                                                    <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block mb-2 font-semibold">
                                                        {currentSubPart ? "Engineering Highlights:" : "Key Engineering Tolerances:"}
                                                    </span>
                                                    <ul className="space-y-1.5 text-sm text-gray-300">
                                                        {(currentSubPart ? currentSubPart.features : activeCategory.details).map((bullet, bIdx) => (
                                                            <li key={bIdx} className="flex items-start gap-2.5">
                                                                <span className="text-purple-400 mt-1 font-mono text-xs">▸</span>
                                                                <span className="font-light">{bullet}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Technical Spec Matrix (if subpart selected) */}
                                        {currentSubPart?.specs && Object.keys(currentSubPart.specs).length > 0 && (
                                            <div className="pt-3 border-t border-white/[0.08]">
                                                <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block mb-3 font-semibold">
                                                    Technical Tolerances & Specifications:
                                                </span>
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                                    {Object.entries(currentSubPart.specs).map(([key, val]) => (
                                                        <div key={key} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
                                                            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block truncate">
                                                                {key}
                                                            </span>
                                                            <span className="text-xs font-mono font-bold text-white block mt-0.5 truncate">
                                                                {val}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Verified Platform Compatibility */}
                                        {currentSubPart?.compatibility && currentSubPart.compatibility.length > 0 && (
                                            <div className="pt-3 border-t border-white/[0.08]">
                                                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-2">
                                                    Verified Platform Compatibility:
                                                </span>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {currentSubPart.compatibility.map((car, cIdx) => (
                                                        <span key={cIdx} className="px-2.5 py-1 rounded text-xs font-mono bg-purple-950/40 text-purple-200 border border-purple-500/30">
                                                            {car}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Modal Footer CTA */}
                                <div className="px-6 py-4 md:px-8 border-t border-white/10 bg-black/60 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                                    <span className="text-xs text-gray-400 font-mono">
                                        Tokyo Workshop Crated & Shipped Worldwide
                                    </span>
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <button
                                            type="button"
                                            onClick={() => setActiveCategory(null)}
                                            className="px-5 py-2.5 rounded-lg border border-white/15 text-xs font-semibold tracking-wider uppercase text-gray-300 hover:text-white hover:border-white/30 transition-all cursor-pointer"
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const cat = activeCategory;
                                                const sub = currentSubPart;
                                                setActiveCategory(null);
                                                handleOpenCommissionModal({
                                                    platform: sub ? sub.compatibility[0] || "Custom Platform" : "Universal Platform",
                                                    service: sub ? `${cat.name} (${sub.title})` : cat.name,
                                                    estimatedTotal: sub?.price || "Custom Quote"
                                                });
                                            }}
                                            className="px-6 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_#7c3aed] transition-all cursor-pointer whitespace-nowrap"
                                        >
                                            Inquire with Workshop
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            )}

            {/* Featured Builds Section */}
            <section id="builds" className="py-24 md:py-36 px-6 md:px-20 bg-[#020004] relative overflow-hidden">
                <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.18)_0%,rgba(88,28,135,0.06)_45%,transparent_70%)] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-10">
                        <div>
                            <span className="text-purple-400 font-mono text-xs tracking-[0.3em] uppercase block mb-3">
                                Bespoke Commissions of {brand.name}
                            </span>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
                                <CyberScramble text="HALL OF LEGENDS" />
                            </h2>
                        </div>
                        <p className="text-gray-400 font-light text-sm md:text-base max-w-md">
                            Signature vehicle transformations forged at the {brand.name} {brand.city} atelier. Built without compromise for track and street.
                        </p>
                    </div>

                    {/* Commissions Showcase */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredBuilds.map((build, idx) => (
                            <RevealOnScroll key={build.id} direction="left" width="100%" delay={idx * 150}>
                                <button
                                    type="button"
                                    onClick={() => setActiveBuild(build)}
                                    className="w-full text-left cursor-pointer group relative h-[600px] rounded-2xl overflow-hidden border border-white/[0.1] hover:border-purple-500/50 transition-all duration-500 bg-[#07030a] flex flex-col justify-between hover:-translate-y-1 shadow-2xl"
                                >
                                    {/* Elevated Car Viewport - Upper half dedicated entirely to the vehicle */}
                                    <div className="relative h-[56%] w-full overflow-hidden bg-[#090412]">
                                        <img
                                            src={build.image}
                                            alt={build.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover object-[center_40%] brightness-[1.08] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#07030a] via-transparent to-black/25 pointer-events-none" />

                                        {/* Top Identification Badge */}
                                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10">
                                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                            <span className="text-[10px] font-mono tracking-widest uppercase text-white/90 font-bold">
                                                {build.project}
                                            </span>
                                        </div>

                                        {/* Hover Inspect Indicator */}
                                        <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded bg-purple-600/80 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold">
                                            Inspect Spec ↗
                                        </div>
                                    </div>

                                    {/* Bottom Dossier Specs - Protected zone with zero car overlap */}
                                    <div className="p-6 md:p-7 relative z-10 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#07030a] to-[#040106]">
                                        <div>
                                            <div className="flex justify-between items-baseline mb-1.5">
                                                <h3 className="text-2xl font-black text-white uppercase italic tracking-wide group-hover:text-purple-200 transition-colors">
                                                    {build.name}
                                                </h3>
                                                <span className="text-xs font-mono text-purple-400 font-semibold">
                                                    {build.finish}
                                                </span>
                                            </div>
                                            <p className="text-gray-400 text-xs font-light leading-relaxed mb-4 line-clamp-2">
                                                {build.description}
                                            </p>
                                        </div>

                                        {/* Performance Specs */}
                                        <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/[0.08] mb-4 text-center">
                                            {build.specs.map((spec, sIdx) => (
                                                <div key={sIdx}>
                                                    <span className="text-[9px] font-mono tracking-wider text-gray-500 uppercase block truncate">
                                                        {spec.label}
                                                    </span>
                                                    <span className="text-xs md:text-sm font-mono font-bold text-white block mt-0.5">
                                                        {spec.value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Inspect Blueprint Prompt */}
                                        <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider uppercase text-purple-300/80 group-hover:text-purple-300 transition-colors">
                                            <span>Inspect Build Sheet</span>
                                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* In-Page Hall of Fame Blueprint Dossier Modal Popup */}
            {activeBuild && (
                <div
                    data-lenis-prevent="true"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md transition-opacity animate-fade-in overscroll-contain"
                    onClick={() => setActiveBuild(null)}
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                >
                    <div
                        data-lenis-prevent="true"
                        className="relative w-full max-w-5xl xl:max-w-6xl max-h-[88vh] bg-[#080310] border border-white/15 rounded-2xl shadow-[0_0_80px_rgba(124,58,237,0.35)] flex flex-col overflow-hidden text-white overscroll-contain"
                        onClick={(e) => e.stopPropagation()}
                        onWheel={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                    >
                        {/* Top Header Bar */}
                        <div className="px-6 py-4 md:px-8 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
                            <div>
                                <span className="text-[11px] font-mono tracking-[0.25em] text-purple-400 uppercase block mb-0.5">
                                    // COMMISSION DOSSIER & BLUEPRINT • {brand.upper}
                                </span>
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-white">
                                        {activeBuild.name}
                                    </h3>
                                    <span className="text-xs font-mono font-semibold text-purple-300 border border-purple-500/40 bg-purple-950/60 px-2.5 py-0.5 rounded">
                                        {activeBuild.project}
                                    </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveBuild(null)}
                                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-gray-300 hover:text-white hover:border-purple-500 hover:bg-purple-600/20 transition-all cursor-pointer"
                                aria-label="Close build dossier"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body with Left Subsection for Blueprints */}
                        <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
                            {/* Left Subsection: Commission Blueprints */}
                            <div
                                data-lenis-prevent="true"
                                className="w-full md:w-72 lg:w-80 shrink-0 border-b md:border-b-0 md:border-r border-white/10 bg-[#05010a]/95 flex flex-col p-4 md:p-5 overflow-y-auto overscroll-contain"
                                onWheel={(e) => e.stopPropagation()}
                                onTouchMove={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10 shrink-0">
                                    <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                        Legend Blueprints
                                    </span>
                                    <span className="text-[10px] font-mono text-gray-400">
                                        {featuredBuilds.length} Builds
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    {featuredBuilds.map((b) => {
                                        const isSelected = activeBuild.id === b.id;
                                        return (
                                            <button
                                                key={b.id}
                                                type="button"
                                                onClick={() => setActiveBuild(b)}
                                                className={`w-full p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 text-left group ${isSelected
                                                    ? "border-purple-500 bg-purple-950/50 shadow-[0_0_20px_rgba(124,58,237,0.3)] text-white"
                                                    : "border-white/10 bg-white/[0.02] text-gray-300 hover:border-purple-500/40 hover:bg-white/[0.05]"
                                                }`}
                                            >
                                                <img
                                                    src={b.image}
                                                    alt={b.name}
                                                    className="w-14 h-14 rounded-lg object-cover brightness-[1.1] contrast-[1.05] shrink-0 border border-white/10"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                                                        {b.name}
                                                    </h4>
                                                    <p className="text-[10px] text-gray-400 font-light truncate">
                                                        {b.project}
                                                    </p>
                                                    <div className="flex items-center justify-between mt-0.5">
                                                        <span className="text-[9px] font-mono text-purple-400 font-semibold truncate">
                                                            {b.finish}
                                                        </span>
                                                        <span className="text-[9px] font-mono text-gray-400 uppercase">
                                                            {isSelected ? "● Active" : "Select"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Right Main Inspection Area */}
                            <div
                                data-lenis-prevent="true"
                                className="flex-1 min-w-0 p-5 md:p-7 overflow-y-auto space-y-6 bg-[#0a0512] overscroll-contain"
                                onWheel={(e) => e.stopPropagation()}
                                onTouchMove={(e) => e.stopPropagation()}
                            >
                                {/* Main Preview & Story Breakdown */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                    {/* Car Viewport (5 cols) */}
                                    <div className="lg:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-[#07030a] shadow-xl">
                                        <img
                                            src={activeBuild.image}
                                            alt={activeBuild.name}
                                            className="w-full h-full object-cover object-center brightness-[1.12] contrast-[1.05]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono">
                                            <span className="text-purple-300 font-semibold">{activeBuild.finish}</span>
                                            <span className="text-white/80">{brand.city} Dyno Verified</span>
                                        </div>
                                    </div>

                                    {/* Story & Dyno Telemetry (7 cols) */}
                                    <div className="lg:col-span-7 space-y-4">
                                        <div>
                                            <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block mb-1">
                                                The Atelier Build Narrative
                                            </span>
                                            <p className="text-gray-200 text-sm leading-relaxed font-light">
                                                {activeBuild.story}
                                            </p>
                                        </div>

                                        {/* Performance Benchmarks */}
                                        <div className="pt-1">
                                            <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block mb-2 font-semibold">
                                                Performance Benchmarks:
                                            </span>
                                            <div className="grid grid-cols-3 gap-2">
                                                {activeBuild.specs.map((spec, sIdx) => (
                                                    <div key={sIdx} className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-center">
                                                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block truncate">
                                                            {spec.label}
                                                        </span>
                                                        <span className="text-xs font-mono font-bold text-white block mt-0.5">
                                                            {spec.value}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Telemetry Benchmarks */}
                                        <div className="grid grid-cols-3 gap-2 pt-1">
                                            {activeBuild.telemetry.map((tel, tIdx) => (
                                                <div key={tIdx} className="p-2 rounded-lg bg-purple-950/30 border border-purple-500/20 text-center">
                                                    <span className="text-[9px] font-mono text-purple-300 uppercase tracking-wider block truncate">
                                                        {tel.label}
                                                    </span>
                                                    <span className="text-xs font-mono font-bold text-purple-100 block mt-0.5">
                                                        {tel.value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Full Technical Specifications Categorized */}
                                <div className="pt-4 border-t border-white/10 space-y-4">
                                    <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block font-semibold">
                                        Complete Blueprint Sheet & Build Architecture:
                                    </span>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {activeBuild.technicalSpecs.map((group, gIdx) => (
                                            <div key={gIdx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
                                                        {group.category}
                                                    </h4>
                                                </div>
                                                <ul className="space-y-1.5 text-xs text-gray-300 font-light">
                                                    {group.items.map((item, iIdx) => (
                                                        <li key={iIdx} className="flex items-start gap-2 border-b border-white/[0.04] pb-1.5 last:border-0 last:pb-0">
                                                            <span className="text-purple-400 font-mono text-[10px] mt-0.5">▸</span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer CTA */}
                        <div className="px-6 py-4 md:px-8 border-t border-white/10 bg-black/60 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                            <span className="text-xs text-gray-400 font-mono">
                                Shibuya Dyno Validated • Built for Track & Street
                            </span>
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <button
                                    type="button"
                                    onClick={() => setActiveBuild(null)}
                                    className="px-5 py-2.5 rounded-lg border border-white/15 text-xs font-semibold tracking-wider uppercase text-gray-300 hover:text-white hover:border-white/30 transition-all cursor-pointer"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const currentBuild = activeBuild;
                                        setActiveBuild(null);
                                        handleOpenCommissionModal({
                                            platform: currentBuild.name,
                                            service: currentBuild.project,
                                            estimatedTotal: "By Commission"
                                        });
                                    }}
                                    className="px-6 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_#7c3aed] transition-all cursor-pointer whitespace-nowrap"
                                >
                                    Inquire with Workshop
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Interactive Build Estimator */}
            <CommissionConfigurator onOpenModal={handleOpenCommissionModal} />

            {/* Book Now Section */}
            <BookNowSection onOpenModal={() => handleOpenCommissionModal()} />

            {/* About / Atelier Section */}
            <section id="about" className="py-24 md:py-36 px-6 md:px-20 bg-[#030005] relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                        <div>
                            <span className="text-purple-400 font-mono text-xs tracking-[0.3em] uppercase block mb-3">
                                Philosophy & Atelier
                            </span>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-8 leading-[1.05]">
                                <CyberScramble text="PURPOSE-BUILT" /> <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">
                                    FOR SPEED & ART
                                </span>
                            </h2>
                            <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed font-light">
                                {brand.name} was established on a singular premise: automotive modification is an art form that demands mathematical precision. From our facility in {brand.city}, we fuse time-honored Japanese tuning traditions with aerospace-grade composite craftsmanship.
                            </p>
                            <p className="text-gray-400 text-base mb-10 leading-relaxed font-light border-l border-purple-600/60 pl-6">
                                We do not mass-produce. Every manifold is TIG-welded by hand, every carbon fiber layup is cured under vacuum, and every powertrain package is validated on our in-house all-wheel-drive dyno cell.
                            </p>

                            {/* Minimalist Metrics */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/[0.08]">
                                <div>
                                    <span className="text-3xl font-black text-white font-mono block">1,000+</span>
                                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Dyno Hours</span>
                                </div>
                                <div>
                                    <span className="text-3xl font-black text-white font-mono block">50+</span>
                                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Countries</span>
                                </div>
                                <div>
                                    <span className="text-3xl font-black text-white font-mono block">100%</span>
                                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Dry Carbon</span>
                                </div>
                                <div>
                                    <span className="text-3xl font-black text-white font-mono block">0</span>
                                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Shortcuts</span>
                                </div>
                            </div>
                        </div>

                        {/* Workshop Visual */}
                        <div className="relative">
                            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/11] rounded-2xl border border-white/[0.12] overflow-hidden group shadow-2xl bg-[#07030a]">
                                <img
                                    src="/logo-imj.webp"
                                    alt={`${brand.name} Engineering Architecture`}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover object-center brightness-[1.04] contrast-[1.04] transition-all duration-700 group-hover:scale-105 group-hover:brightness-[1.1]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 shadow-lg">
                                    <span className="text-purple-400 font-mono text-xs tracking-wider uppercase block mb-0.5 font-bold">
                                        {brand.city} Advanced Aerodynamics &amp; Telemetry
                                    </span>
                                    <span className="text-white font-medium text-xs sm:text-sm font-mono">
                                        {brand.locationTag}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact & Location Strip */}
                    <div className="mt-24 pt-16 border-t border-white/[0.08] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div>
                                <span className="text-purple-400 font-mono text-xs tracking-[0.3em] uppercase block mb-2">
                                    Direct Inquiries
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase">
                                    Connect With Our Engineers
                                </h3>
                                <p className="text-gray-400 text-sm mt-1 font-light">
                                    Private commission consults and technical fitment verification by appointment.
                                </p>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="border-b border-white/[0.06] pb-3">
                                    <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Workshop Address</span>
                                    <p className="text-white text-base font-light">
                                        {brand.isCustomClient ? `${brand.city} Metropolitan Area • Private Facility (By Appointment)` : "1-chōme-21-1 Jinnan, Shibuya City, Tokyo 150-0041, Japan"}
                                    </p>
                                </div>
                                <div className="border-b border-white/[0.06] pb-3">
                                    <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Electronic Inquiries</span>
                                    <a href={`mailto:${brand.email}`} className="text-white text-base font-light hover:text-purple-400 transition-colors">
                                        {brand.email}
                                    </a>
                                </div>
                                <div>
                                    <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Direct Workshop Phone</span>
                                    <p className="text-white text-base font-light">
                                        {brand.isCustomClient ? "Private Client Concierge Line" : "+81 3-5550-1337 (09:00 – 18:00 JST)"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Map embed */}
                        <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#07030a] h-[360px]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7479754723107!2d139.6990596152588!3d35.66933528019708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ca298813bc3%3A0xe67cb56453f2c58!2sShibuya%20City%2C%20Tokyo%2C%20Japan!5e0!3m2!1sen!2sus!4v1652230000000!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="opacity-70 hover:opacity-90 transition-opacity duration-700 filter invert-[0.9] hue-rotate-[180deg] contrast-[1.2]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Common Questions FAQ Section */}
            <section id="faq" className="py-24 md:py-36 px-6 md:px-20 bg-[#020004] relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="mb-14 border-b border-white/[0.08] pb-8">
                        <span className="text-purple-400 font-mono text-xs tracking-[0.3em] uppercase block mb-3">
                            Questions & Support
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="divide-y divide-white/[0.08]">
                        {faqs.map((faq, i) => (
                            <RevealOnScroll key={i} width="100%" delay={i * 60} direction="right">
                                <FaqItem faq={faq} index={i} />
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Elevated Automotive Footer */}
            <footer className="pt-20 pb-12 bg-[#020004] border-t border-white/[0.08] relative">
                <div className="max-w-7xl mx-auto px-6 md:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        {/* Brand Column */}
                        <div className="md:col-span-2 space-y-4">
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl md:text-3xl font-black italic tracking-tighter text-white">
                                    {brand.upper}
                                </span>
                                <div className="h-1.5 w-1.5 bg-purple-500 rounded-full" />
                            </div>
                            <span className="text-gray-400 font-mono text-xs tracking-[0.25em] uppercase block">
                                {brand.isCustomClient ? `Atelier Engineering • ${brand.city}` : "Motorsport Engineering • Shibuya, Tokyo"}
                            </span>
                            <p className="text-gray-400 text-sm max-w-sm leading-relaxed font-light">
                                Handcrafted aerodynamic composites, competition engine packages, and bespoke vehicle builds.
                            </p>
                            <AtelierClock />
                        </div>

                        {/* Navigation Column */}
                        <div>
                            <h5 className="font-mono text-xs font-semibold uppercase tracking-widest text-purple-400 mb-4">
                                Catalog
                            </h5>
                            <ul className="space-y-2.5 text-sm text-gray-400 font-light">
                                <li><a href="#modifications" className="hover:text-white transition-colors">Aerodynamic Spoilers</a></li>
                                <li><a href="#modifications" className="hover:text-white transition-colors">Performance Tuning</a></li>
                                <li><a href="#modifications" className="hover:text-white transition-colors">Forged Monoblock Wheels</a></li>
                                <li><a href="#modifications" className="hover:text-white transition-colors">Side Skirts & Diffusers</a></li>
                                <li><a href="#modifications" className="hover:text-white transition-colors">Custom Wraps & PPF</a></li>
                                <li><a href="#modifications" className="hover:text-white transition-colors">Custom Cockpits</a></li>
                            </ul>
                        </div>

                        {/* Commissions Column */}
                        <div>
                            <h5 className="font-mono text-xs font-semibold uppercase tracking-widest text-purple-400 mb-4">
                                Commissions
                            </h5>
                            <ul className="space-y-2.5 text-sm text-gray-400 font-light">
                                <li><Link to="/builds/nightshade" className="hover:text-white transition-colors">Project Nightshade</Link></li>
                                <li><Link to="/builds/azure" className="hover:text-white transition-colors">Project Azure</Link></li>
                                <li><Link to="/builds/han" className="hover:text-white transition-colors">Project Han</Link></li>
                                <li><a href="#about" className="hover:text-white transition-colors">Workshop Facility</a></li>
                                <li><a href="#faq" className="hover:text-white transition-colors">Client Support</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Legal Bar */}
                    <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
                        <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                            <span>{brand.name} Inc.</span>
                        </div>
                        <p>&copy; {new Date().getFullYear()} All Rights Reserved. Crafted for the global motorsport community.</p>
                    </div>
                </div>
            </footer>

            {/* High-Ticket Intake & Commission Modal */}
            <CommissionModal
                isOpen={isCommissionModalOpen}
                onClose={() => setIsCommissionModalOpen(false)}
                prefillData={commissionPrefill}
            />
        </main>
    );
}
