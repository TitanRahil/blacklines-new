import { Link, useParams } from "react-router-dom";

// Mock Data for Sub-parts (In a real app, this would be fetched based on IDs)
const subPartsData: Record<string, {
    title: string;
    subtitle: string;
    description: string;
    price: string;
    features: string[];
    compatibility: string[];
    image: string;
    specs: Record<string, string>;
}> = {
    // Spoilers
    "gt-wing": {
        title: "GT Wing",
        subtitle: "Maximum Downforce",
        description: "The Blacklines GT Wing is engineered for serious track duty. With a 1700mm span and full adjustability, it generates up to 300kg of downforce at 180km/h.",
        price: "$1,850",
        features: ["Dry Carbon Fiber Airfoil", "7075 Aluminum Uprights", "Adjustable Angle of Attack (0-15°)", "Titanium Hardware"],
        compatibility: ["Universal Mount", "Toyota Supra A90", "Nissan GT-R R35", "Porsche 911 (991/992)"],
        image: "/Spoilers - gt wing.jpg",
        specs: { "Material": "Pre-preg Carbon Fiber", "Weight": "3.2kg", "Span": "1700mm", "Chord": "320mm" }
    },
    "ducktail": {
        title: "Ducktail Spoiler",
        subtitle: "Sleek Street Style",
        description: "A seamless integration of style and aerodynamics. The Ducktail spoiler extends the body lines while reducing drag and increasing rear-end stability.",
        price: "$650",
        features: ["Vacuum Infused Fiberglass", "Direct Bolt-on", "Paint Matched Options", "Integrated 3rd Brake Light"],
        compatibility: ["Subaru BRZ / Toyota 86", "BMW M3/M4 (G80/G82)", "Mazda RX-7 FD"],
        image: "/Spoilers - ductail.jpg",
        specs: { "Material": "FRP / Carbon", "Weight": "1.5kg", "Install Type": "Adhesive/Bolt" }
    },
    "active-aero": {
        title: "Active Aero Wing",
        subtitle: "Dynamic Adjustment",
        description: "Intelligent aerodynamics that adapt to your speed. Automatically deploys at 80km/h and acts as an airbrake under heavy deceleration.",
        price: "$3,200",
        features: ["ECU Controlled Deployment", "Carbon Fiber Blade", "Airbrake Functionality", "Plug & Play Harness"],
        compatibility: ["Nissan GT-R R35", "Toyota Supra MK5", "McLaren 720S"],
        image: "/Spoilers - active aero.jpg",
        specs: { "Deployment Speed": "80km/h", "Downforce": "Variable", "Response Time": "0.2s" }
    },

    // Engine
    "stage-1-tune": {
        title: "Stage 1 Tune",
        subtitle: "ECU & Intake",
        description: "Unlock the hidden potential of your engine. Our Stage 1 map optimizes fuel and ignition timing for a safe, reliable power bump without mechanical changes.",
        price: "$899",
        features: ["OBDII Flash Tool", "Improved Throttle Response", "+40-60HP Gain (Typical)", "Keep Factory Safety Limits"],
        compatibility: ["Toyota 2JZ-GTE", "Nissan RB26DETT", "BMW S58", "Honda K20C1"],
        image: "/Engine - stage 1 tune.jpg",
        specs: { "Power Gain": "+15-20%", "Torque Gain": "+20%", "Fuel Req": "93 Octane / 98 RON" }
    },
    "big-turbo": {
        title: "Big Turbo Kit",
        subtitle: "800HP+ Potential",
        description: "For those who demand 4-digit horsepower. This kit replaces small factory twins with a massive single turbo for earth-shattering top-end power.",
        price: "$4,200",
        features: ["Precision 6870 Gen 2 Turbo", "Stainless Steel Manifold", "44mm External Wastegate", "Oil & Water Lines"],
        compatibility: ["Toyota Supra (2JZ)", "Nissan Skyline GT-R (RB26)", "Mitsubishi Evo (4G63)"],
        image: "/Engine -  big turbo kit.jpg",
        specs: { "Turbo": "Precision 6870", "Manifold": "T4 Twin Scroll", "Max HP": "1100HP" }
    },
    "crate-engine": {
        title: "Crate Engine",
        subtitle: "Pre-built 2JZ/RB26",
        description: "A complete, turn-key engine solution built by our master technicians. Blueprint balanced and ready to drop in for instant reliability and power.",
        price: "$15,000+",
        features: ["New OEM Block", "Forged Pistons & Rods", "Head Studs & MLS Gasket", "Dyno Broken-in"],
        compatibility: ["Toyota JZ Chassis", "Nissan RB Chassis"],
        image: "/Engine - crate engine.jpg",
        specs: { "Displacement": "3.0L / 2.6L", "Rated Power": "800HP / 1000HP", "Warranty": "1 Year" }
    },
    "cooling-pack": {
        title: "Cooling Pack",
        subtitle: "Track Reliability",
        description: "Keep your temperatures in check during endurance sessions. Includes upgraded radiator, oil cooler, and intercooler.",
        price: "$2,100",
        features: ["Triple-Core Aluminum Radiator", "Setrab Oil Cooler Core", "High Density Intercooler", "Silicone Hoses"],
        compatibility: ["Universal Fitment", "Vehicle Specific Kits Available"],
        image: "/Engine - cooling pack.jpg",
        specs: { "Temp Reduction": "-15°C", "Core Thickness": "52mm", "Pressure Tested": "50 PSI" }
    },

    // Skirts
    "carbon-splitters": {
        title: "Carbon Splitters",
        subtitle: "Track Focused",
        description: "Direct airflow around the sides of the car to prevent high pressure from building up underneath. Essential for maximizing front splitter efficiency.",
        price: "$850",
        features: ["Pre-preg Carbon Fiber", "Aerodynamic Shark Fins", "Protective Clear Coat", "Easy Installation"],
        compatibility: ["BMW F80/F82", "Tesla Model 3", "Audi RS3"],
        image: "/Skirts - carbon splitters.jpg",
        specs: { "Material": "Carbon Fiber", "Weave": "2x2 Twill", "Finish": "Gloss" }
    },
    "widebody": {
        title: "Widebody Extensions",
        subtitle: "Integrated Flow",
        description: "Aggressively widen your stance to fit massive wheels and tires. Designed to blend seamlessly with factory body lines.",
        price: "$3,500",
        features: ["FRP or Carbon Options", "+50mm Front / +80mm Rear", "Included Hardware", "CAD Designed"],
        compatibility: ["Toyota GR86", "Nissan 370Z", "Subaru WRX"],
        image: "/Skirts - wide body.jpg",
        specs: { "Width Added": "50-80mm", "Material": "FRP", "Paint Prep": "Primed" }
    },
    "led-underglow": {
        title: "LED Underglow Kit",
        subtitle: "Night Aesthetics",
        description: "Bring back the neon era with modern addressable LEDs. Millions of colors, smartphone control, and music sync capabilities.",
        price: "$250",
        features: ["IP68 Waterproof", "Bluetooth App Control", "Chasing Patterns", "Durable Aluminum Channel"],
        compatibility: ["Universal 12V"],
        image: "/Skirts - led.jpg",
        specs: { "LED Type": "WS2812B", "Control": "Bluetooth/RF", "Voltage": "12V" }
    },

    // Wheels
    "monoblock-forged": {
        title: "Monoblock Forged",
        subtitle: "Lightweight Performance",
        description: "Milled from a single block of aerospace-grade 6061-T6 aluminum. The ultimate balance of strength and weight reduction for unsprung mass.",
        price: "$1,200 / Wheel",
        features: ["10,000 Ton Forging Pressure", "Knurled Bead Seat", "Brake Clearance Optimized", "Custom Finishes"],
        compatibility: ["5x114.3", "5x120", "Centerlock Options"],
        image: "/Wheels - forged.jpg",
        specs: { "Material": "6061-T6 Aluminum", "Weight (18x9.5)": "8.4kg", "Load Rating": "850kg" }
    },
    "3-piece-modular": {
        title: "3-Piece Modular",
        subtitle: "Deep Dish Custom",
        description: "Limitless customization. Choose your lip size, barrel width, and face design. Perfect for widebody builds needing aggressive negative offsets.",
        price: "$1,500 / Wheel",
        features: ["Spun Aluminum Lip", "Titanium Assembly Bolts", "Serviceable Parts", "Widest Widths Available"],
        compatibility: ["Custom PCD", "Custom Offset"],
        image: "/Wheels - modular.jpg",
        specs: { "Construction": "3-Piece", "Lip Depth": "Up to 8 inches", "Hardware": "Titanium/Steel" }
    },
    "spyder-spoke": {
        title: "Spyder Spoke",
        subtitle: "Aggressive Design",
        description: "A modern mesh design inspired by GT racing. Provides excellent brake cooling and structural rigidity.",
        price: "$950 / Wheel",
        features: ["Flow Formed Construction", "Concave Profiles", "Lightweight pockets", "Gloss Black / Bronze"],
        compatibility: ["5x112", "5x108", "5x114.3"],
        image: "/Wheels - spyder.jpg",
        specs: { "Construction": "Flow Formed", "Load Rating": "790kg", "Diameter": "18-20 inch" }
    },
    "track-spec": {
        title: "Track Spec",
        subtitle: "Center Lock Option",
        description: "Pure function. Designed solely for lap times with minimal mass and maximum brake clearance. Available in center-lock for Porsche and exotic applications.",
        price: "$1,800 / Wheel",
        features: ["Magnesium Alloy Option", "Center Lock Compatible", "I-Beam Spokes", "Knurled Beads"],
        compatibility: ["Porsche 991 GT3", "Lamborghini Huracan", "Ferrari 488"],
        image: "/Wheels - track.jpg",
        specs: { "Material": "Forged Alum / Mag", "Weight": "7.1kg", "Center Bore": "Specific" }
    },

    // Wraps
    "matte-satin": {
        title: "Matte / Satin Wrap",
        subtitle: "Stealth Look",
        description: "Transform your vehicle's finish to a sinister flat or satin sheen. Hides micro-scratches and gives a premium, understated look.",
        price: "$3,500+",
        features: ["3M / Avery Dennison Film", "Self-Healing Properties", "5-Year Durability", "Full Disassembly Install"],
        compatibility: ["All Vehicles"],
        image: "/Wrap - matte.jpg",
        specs: { "Material": "Cast Vinyl", "Thickness": "3.5 mil", "Finish": "Matte/Satin" }
    },
    "color-shift": {
        title: "Color Shift Wrap",
        subtitle: "Iridescent Finish",
        description: "Head-turning colors that change depending on the viewing angle and lighting. From purple to gold, blue to green.",
        price: "$4,200+",
        features: ["High Gloss Finish", "Unique Visual Impact", "Protects OEM Paint", "Removable"],
        compatibility: ["All Vehicles"],
        image: "/Wrap - color shift.jpg",
        specs: { "Material": "Multi-layer Vinyl", "Effect": "Iridescent", "Brand": "KPMF / 3M" }
    },
    "full-ppf": {
        title: "Full PPF",
        subtitle: "Invisible Protection",
        description: "Paint Protection Film (PPF) is practically invisible armor for your car. Protects against stone chips, scratches, and road debris.",
        price: "$5,500+",
        features: ["8mm Polyurethane", "Self-Healing Heat Activation", "Hydrophobic Top Coat", "10-Year Warranty"],
        compatibility: ["All Vehicles"],
        image: "/Wrap - full ppf.jpg",
        specs: { "Thickness": "8-10 mil", "Clarity": "99%", "Protection": "mpact/Scratch" }
    },
    "liveries": {
        title: "Custom Livery",
        subtitle: "Race Team Graphics",
        description: "Design and installation of full race car liveries. Replicas, original designs, or sponsor branding.",
        price: "$2,000+",
        features: ["Vector Design Service", "High Quality Print", "Laminated for Durability", "Spot Graphics or Full Wrap"],
        compatibility: ["Track / Show Cars"],
        image: "/Wrap - liveries.jpg",
        specs: { "Print": "1440 DPI", "Laminate": "Gloss/Matte", "Design": "Custom" }
    },

    // Interior
    "racing-seats": {
        title: "Racing Seats",
        subtitle: "Recaro / Bride",
        description: "Hold yourself in place during high-G cornering. FIA certified bucket seats offer safety and connection to the chassis.",
        price: "$1,200 / Seat",
        features: ["FIA 8855-1999 Approved", "Composite/Carbon Shell", "Fire Retardant Fabric", "Deep Bolsters"],
        compatibility: ["Universal (Requires Rails)"],
        image: "/Interiors - Racing seat.jpg",
        specs: { "Weight": "6.5kg", "Shell": "FRP/Carbon", "Mounting": "Side Mount" }
    },
    "carbon-dash": {
        title: "Carbon Dash",
        subtitle: "Weight Reduction",
        description: "Replace your heavy factory dashboard with a lightweight dry carbon fiber unit. Saves weight up high where it matters most.",
        price: "$2,800",
        features: ["Pre-preg Carbon Fiber", "OEM Mounting Points", "Matte Finish (Glare Reduction)", "1/4 weight of stock"],
        compatibility: ["BMW E46 M3", "Nissan S13/S14/S15", "Mitsubishi Evo"],
        image: "/Interiors - Carbon Dash.jpg",
        specs: { "Material": "Dry Carbon", "Weight": "1.8kg", "Weave": "Plain/Twill" }
    },
    "alcantara-wrap": {
        title: "Alcantara Wrap",
        subtitle: "Premium Touch",
        description: "Upgrade your steering wheel, shifter, and headliner to genuine Italian Alcantara. Enhances grip and luxury feel.",
        price: "$1,500+",
        features: ["Genuine Alcantara®", "Custom Stitching Colors", "Soft Touch", "Non-slip Grip"],
        compatibility: ["All Interiors"],
        image: "/Interiors - Alcantra.jpg",
        specs: { "Material": "Suede/Alcantara", "Origin": "Italy", "Durability": "High" }
    },
    "roll-cage": {
        title: "Roll Cage",
        subtitle: "FIA Certified",
        description: "Safety is paramount. Custom fabricated 4-point, 6-point, or full cages for track days and competition use.",
        price: "$3,500+",
        features: ["DOM Steel / Chromoly", "TIG Welded", "SCCA / Formula D Legal", "Gusseting Plates"],
        compatibility: ["Custom Fab"],
        image: "/Interiors - Roll cage.jpg",
        specs: { "Tube Diameter": "1.75 inch", "Wall Thickness": ".095 inch", "Material": "4130 Chromoly" }
    }
};

// Fallback for items not explicitly defined above to prevent crashes
const defaultSubPart = {
    title: "Performance Component",
    subtitle: "High Engineering Standards",
    description: "This premium component is engineered to meet the highest standards of Blacklines Motorsport. Contact us for detailed specifications and availability for your specific platform.",
    price: "Inquire for Price",
    features: ["Motorsport Grade Materials", "Rigorous Testing", "Blacklines Warranty", "Professional Install Recommended"],
    compatibility: ["Universal / Multi-fit support"],
    specs: { "Grade": "Premium", "Availability": "Made to Order" }
};

export default function SubPartPage() {
    const { partId, subPartId } = useParams<{ partId: string; subPartId: string }>();

    // Simple look up or fallback
    const data = (subPartId && subPartsData[subPartId]) ? subPartsData[subPartId] : { ...defaultSubPart, image: "/hero.jpg" };

    // If we have a fallback but distinct images, try to find the image from the previous page's context? 
    // For simplicity in this static demo, we will use the ID to generate a placeholder title if missing.
    if (!subPartsData[subPartId || ""]) {
        data.title = subPartId?.replace(/-/g, " ").toUpperCase() || "COMPONENT";
        // Attempt to re-use the image passed in state if we were using a real router state, 
        // but here we might just have to rely on a generic or the one from the URL if we structured it.
        // For this demo, I'll ensure the PartPage links passed correct IDs that match above keys for the main ones.
    }

    return (
        <main className="min-h-screen bg-[#030005] text-white selection:bg-purple-600 selection:text-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6 md:px-20">
                {/* Navigation */}
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-12 uppercase tracking-widest">
                    <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
                    <span>/</span>
                    <Link to={`/parts/${partId}`} className="hover:text-purple-400 transition-colors">{partId}</Link>
                    <span>/</span>
                    <span className="text-white">{data.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Image Section */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
                            <img
                                src={data.image}
                                alt={data.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-8">
                            <h3 className="text-purple-500 font-bold tracking-widest uppercase mb-2">{data.subtitle}</h3>
                            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 text-glow leading-none">{data.title}</h1>
                            <p className="text-2xl text-gray-200 font-light leading-relaxed">{data.price}</p>
                        </div>

                        <p className="text-gray-400 text-lg mb-10 leading-relaxed border-l-2 border-purple-800 pl-6">
                            {data.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div>
                                <h4 className="text-white font-bold uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Key Features</h4>
                                <ul className="space-y-2">
                                    {data.features.map((item, i) => (
                                        <li key={i} className="flex items-start text-gray-400 text-sm">
                                            <span className="mr-2 text-purple-500">▹</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-bold uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Specifications</h4>
                                <ul className="space-y-2">
                                    {Object.entries(data.specs || {}).map(([key, val], i) => (
                                        <li key={i} className="flex justify-between text-sm border-b border-white/5 pb-1">
                                            <span className="text-gray-500">{key}</span>
                                            <span className="text-gray-300">{val}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <button className="w-full py-5 bg-white text-black font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all duration-300 clip-path-slant">
                            Add to Build Configuration
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-20 mt-24 pt-12 border-t border-white/5">
                <h2 className="text-2xl font-bold mb-8 text-white">Compatible Vehicles</h2>
                <div className="flex flex-wrap gap-4">
                    {data.compatibility.map((car, i) => (
                        <div key={i} className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:bg-white/10 hover:border-purple-500/50 transition-colors cursor-default">
                            {car}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
