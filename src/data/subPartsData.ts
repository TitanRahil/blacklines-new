export interface SubPartItem {
    title: string;
    subtitle: string;
    description: string;
    price: string;
    features: string[];
    compatibility: string[];
    image: string;
    specs: Record<string, string>;
}

export const subPartsData: Record<string, SubPartItem> = {
    // Spoilers
    "gt-wing": {
        title: "GT Wing",
        subtitle: "Maximum Downforce",
        description: "This carbon GT Wing is engineered for serious track duty. With a 1700mm span and full adjustability, it generates up to 300kg of downforce at 180km/h.",
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
        subtitle: "ECU & High-Flow Intake",
        description: "Unlock the hidden potential of your engine. Our Stage 1 map optimizes fuel, boost pressure, and ignition timing for a safe, reliable power bump without internal mechanical changes.",
        price: "$899",
        features: ["OBDII Flash Tool", "Improved Throttle Response", "+40-60HP Gain (Typical)", "Maintains Factory Engine Safety Limits"],
        compatibility: ["Toyota 2JZ-GTE", "Nissan RB26DETT", "BMW S58", "Honda K20C1"],
        image: "/Engine - stage 1 tune.jpg",
        specs: { "Power Gain": "+15-20%", "Torque Gain": "+20%", "Fuel Req": "93 Octane / 98 RON" }
    },
    "big-turbo": {
        title: "Big Turbo Kit",
        subtitle: "Precision 6870 (800HP+ Potential)",
        description: "For builds demanding serious horsepower. This kit replaces small factory twins with a massive single turbo for earth-shattering top-end power delivery.",
        price: "$4,200",
        features: ["Precision 6870 Gen 2 Turbo", "T4 Twin Scroll Stainless Manifold", "44mm External Wastegate", "Billet Oil & Water Feed Lines"],
        compatibility: ["Toyota Supra (2JZ)", "Nissan Skyline GT-R (RB26)", "Mitsubishi Evo (4G63)"],
        image: "/Engine -  big turbo kit.jpg",
        specs: { "Turbo": "Precision 6870 Gen 2", "Manifold": "T4 Twin Scroll", "Max Output": "1100HP Rated" }
    },
    "crate-engine": {
        title: "Crate Engine",
        subtitle: "Hand-Built 2JZ-GTE / RB26DETT",
        description: "A complete, turn-key competition engine package hand-built by our master engine builders in Shibuya. Blueprint balanced and broken-in on our in-house dyno.",
        price: "$15,000+",
        features: ["Brand-New OEM Block", "Forged H-Beam Rods & Forged Pistons", "ARP 2000 Head Studs & Multi-Layer Steel Gasket", "Full Dyno Run-In & Calibration Certificate"],
        compatibility: ["Toyota JZ Chassis", "Nissan RB Chassis"],
        image: "/Engine - crate engine.jpg",
        specs: { "Displacement": "3.0L / 2.6L", "Rated Power": "800HP – 1,000HP", "Assembly": "Tokyo Atelier Cleanroom" }
    },
    "cooling-pack": {
        title: "Cooling Pack",
        subtitle: "Endurance Radiator & Oil Coolers",
        description: "Keep fluid temperatures in check during demanding track sessions. Includes triple-core aluminum radiator, Setrab oil cooling matrix, and high-density intercooler.",
        price: "$2,100",
        features: ["Triple-Core Billet Aluminum Radiator", "Dual Setrab 25-Row Oil Coolers", "High Density Bar & Plate Intercooler", "Silicone Multi-Ply Hoses & AN Fittings"],
        compatibility: ["Universal Fitment", "Vehicle-Specific Bracket Kits Available"],
        image: "/Engine - cooling pack.jpg",
        specs: { "Temp Reduction": "-15°C Under Load", "Core Thickness": "52mm High-Flow", "Pressure Tested": "50 PSI" }
    },

    // Skirts
    "carbon-splitters": {
        title: "Carbon Splitters",
        subtitle: "Track Focused Ground Effects",
        description: "Directs high-speed airflow around vehicle rocker panels to prevent high pressure underneath the floor. Essential for front splitter and rear diffuser synergy.",
        price: "$850",
        features: ["Pre-preg Dry Carbon Fiber Weave", "Aerodynamic Shark Fins & Vortex Generators", "UV-Resistant High-Gloss Automotive Clear", "Direct Underbody Mounting Hardware Included"],
        compatibility: ["BMW F80 / G80 M3", "Toyota Supra A90", "Nissan GT-R R35"],
        image: "/Skirts - carbon splitters.jpg",
        specs: { "Material": "Pre-Preg Carbon", "Weave": "2x2 Twill", "Finish": "High-Gloss Automotive Clear" }
    },
    "widebody": {
        title: "Widebody Extensions",
        subtitle: "Integrated Wide Stance",
        description: "Aggressively widens wheel track stance to accommodate massive wide slick tires and negative-offset wheels while integrating with factory lines.",
        price: "$3,500",
        features: ["Aerospace Composite / Dry Carbon Options", "+50mm Front / +80mm Rear Track Expansion", "Precision 3D CAD Laser-Scanned Contours", "Full Mounting Brackets & Fasteners"],
        compatibility: ["Toyota GR86 / Subaru BRZ", "Nissan 370Z / 400Z", "Mazda RX-7 FD3S"],
        image: "/Skirts - wide body.jpg",
        specs: { "Track Widened": "+50mm Front / +80mm Rear", "Material": "Carbon Composite", "Fitment": "CAD Factory Match" }
    },
    "led-underglow": {
        title: "LED Underglow Kit",
        subtitle: "Midnight Tokyo Aesthetics",
        description: "Brings classic midnight aesthetic with modern addressable digital RGB LEDs. Over 16 million colors with smartphone Bluetooth app control.",
        price: "$250",
        features: ["IP68 Submersible Waterproof Sealed", "Bluetooth iOS / Android App Controller", "Dynamic Chasing & Pulse Patterns", "Rigid Extruded Aluminum Protective Housings"],
        compatibility: ["Universal 12V Automotive Power"],
        image: "/Skirts - led.jpg",
        specs: { "LED Type": "WS2812B Addressable", "Control": "Bluetooth 5.0 Low Latency", "Voltage": "12V DC" }
    },

    // Wheels
    "monoblock-forged": {
        title: "Monoblock Forged",
        subtitle: "Ultra-Lightweight Circuit Spec",
        description: "Precision CNC milled from a single monolithic 10,000-ton forged 6061-T6 aluminum billet. Minimizes unsprung rotating mass for razor-sharp steering feedback.",
        price: "$1,200 / Wheel",
        features: ["10,000-Ton Forged Aerospace Billet", "Anti-Slip Knurled Bead Seats", "Engineered for 6-Piston Big Brake Kits", "Bespoke Laser-Etched Center Caps"],
        compatibility: ["5x114.3", "5x120", "Centerlock Applications"],
        image: "/Wheels - forged.jpg",
        specs: { "Material": "6061-T6 Aluminum", "Weight (18x9.5)": "8.4kg", "Load Rating": "850kg per corner" }
    },
    "3-piece-modular": {
        title: "3-Piece Modular",
        subtitle: "Deep Dish Stepped Lip Custom",
        description: "Limitless personalization for stance and widebody applications. Customize stepped outer lips, inner barrels, and center face designs down to the millimeter.",
        price: "$1,500 / Wheel",
        features: ["Spun Aluminum Outer Lip & Barrel", "High-Strength Aerospace Titanium Assembly Hardware", "Custom Millimeter-Precise Offsets (ET)", "Serviceable & Re-Barrellable"],
        compatibility: ["Custom PCD", "Custom Offset to 1mm precision"],
        image: "/Wheels - modular.jpg",
        specs: { "Construction": "3-Piece Modular", "Lip Depth": "Up to 8.5 inches", "Hardware": "Aerospace Titanium" }
    },
    "spyder-spoke": {
        title: "Spyder Spoke",
        subtitle: "Geometric High-Rigidity Design",
        description: "A motorsport mesh geometry engineered for maximum brake ventilation and structural rigidity during sustained high-G lateral loading.",
        price: "$950 / Wheel",
        features: ["Flow-Formed Barrel Densification", "Aggressive Concave Profile Depths", "Spoke Weight-Reduction Pockets", "Satin Bronze, Gunmetal & Gloss Black Finishes"],
        compatibility: ["5x112", "5x114.3", "5x120"],
        image: "/Wheels - spyder.jpg",
        specs: { "Construction": "Flow-Formed Aluminum", "Load Rating": "790kg", "Diameter Options": "18 – 20 inch" }
    },
    "track-spec": {
        title: "Track Spec",
        subtitle: "Center-Lock & Knurled Bead Seat",
        description: "Engineered purely for lap times. Minimal spoke mass, maximum caliper clearance, and available in center-lock fitment for GT3 race vehicles.",
        price: "$1,800 / Wheel",
        features: ["Magnesium Alloy Matrix Option", "True Center-Lock Direct Hub Interface", "I-Beam Optimized Spoke Geometry", "Aggressive Knurled Bead Seats to Prevent Tire Slip"],
        compatibility: ["Porsche 991/992 GT3", "Lamborghini Huracán Super Trofeo", "Ferrari 488 Challenge"],
        image: "/Wheels - track.jpg",
        specs: { "Material": "Forged Magnesium / 6061-T6", "Weight (18x10.5)": "7.1kg", "Hub Interface": "Center-Lock / 5-Lug" }
    },

    // Wraps
    "matte-satin": {
        title: "Matte / Satin Wrap",
        subtitle: "Stealth Midnight Texture",
        description: "Transforms vehicle surface finish into a stealth midnight satin sheen. Shields underlying OEM paint against UV rays and micro-marring.",
        price: "$3,500+",
        features: ["Premium Cast 3M 2080 / Avery Supreme Film", "Self-Healing Surface Polymer Layer", "5-Year UV & Weathering Durability", "Full Body Panel Edge-Tucked Disassembly Install"],
        compatibility: ["Universal All Vehicle Models"],
        image: "/Wrap - matte.jpg",
        specs: { "Material": "Dual-Cast Polyvinyl", "Thickness": "3.5 mil", "Finish": "Satin / Matte Sheen" }
    },
    "color-shift": {
        title: "Color Shift Wrap",
        subtitle: "Iridescent Multi-Chroma Finish",
        description: "Dynamic color transition films that shift chromatic tones based on ambient light angle—ranging from deep royal purple to midnight emerald.",
        price: "$4,200+",
        features: ["High-Gloss Multi-Layer Metallic Pearlescent", "Preserves Factory Paint Resale Value", "Seamless Knife-less Tape Precision Cutting", "100% Residue-Free Removability"],
        compatibility: ["Universal All Vehicle Models"],
        image: "/Wrap - color shift.jpg",
        specs: { "Material": "Multi-Layer Chroma Cast Vinyl", "Optical Effect": "Bespoke Iridescent Shift", "Brand": "KPMF / 3M" }
    },
    "full-ppf": {
        title: "Full PPF",
        subtitle: "8mil Self-Healing Armor",
        description: "Optically clear, high-impact polyurethane armor. Protects high-speed track machines from stone chips, gravel rash, and debris.",
        price: "$5,500+",
        features: ["8mil High-Impact Aliphatic Polyurethane", "Heat-Activated Instant Self-Healing Layer", "Hydrophobic Ceramic Top-Coat Infusion", "10-Year Anti-Yellowing Manufacturer Warranty"],
        compatibility: ["Universal All Vehicle Models"],
        image: "/Wrap - full ppf.jpg",
        specs: { "Thickness": "8.0 mil", "Optical Clarity": "99.4%", "Impact Absorption": "Class 1 High-Velocity" }
    },
    "liveries": {
        title: "Custom Liveries",
        subtitle: "Handcrafted Race Team Graphics",
        description: "Bespoke motorsport livery design and installation. From nostalgic JGTC tribute graphics to custom privateer race team branding.",
        price: "$2,000+",
        features: ["In-House 1-on-1 Vector Livery Design Consultation", "1440 DPI High-Definition Roland Wide-Format Print", "Protective Matte or Gloss Cast Laminate Overcoat", "Available as Full Wrap or Targeted Spot Graphics"],
        compatibility: ["Circuit / Time Attack / Show Vehicles"],
        image: "/Wrap - liveries.jpg",
        specs: { "Resolution": "1440 DPI Eco-Solvent", "Laminate": "UV-Proof Cast Film", "Design": "1-of-1 Bespoke" }
    },

    // Interior
    "racing-seats": {
        title: "Racing Seats",
        subtitle: "Recaro / Bride FIA Certified",
        description: "Fixed-back motorsport bucket seats engineered to lock driver posture in place under sustained 1.5G+ cornering forces.",
        price: "$1,200 / Seat",
        features: ["FIA 8855-1999 Official Competition Homologation", "Ultra-Rigid Carbon Kevlar Monocoque Shell", "Flame-Retardant High-Friction Technical Fabric", "Deep Anatomical Bolsters & HANS Device Compatibility"],
        compatibility: ["Universal (Chassis-Specific Seat Base Rails)"],
        image: "/Interiors - Racing seat.jpg",
        specs: { "Weight": "6.2kg per seat", "Shell": "Carbon Kevlar Composite", "Mounting": "Multi-Hole Side Mounts" }
    },
    "carbon-dash": {
        title: "Carbon Dash",
        subtitle: "Weight Reduction & Glare Shield",
        description: "Direct-replacement lightweight pre-preg dry carbon fiber instrument dashboard. Sheds significant mass from high up in the chassis.",
        price: "$2,800",
        features: ["100% Pre-Preg Autoclave-Cured Dry Carbon Fiber", "Factory Instrument Cluster & Defroster Duct Mounts", "Satin Matte Anti-Glare Top Finish", "One-Quarter Weight of OEM Dashboard Assembly"],
        compatibility: ["Toyota Supra (JZA80)", "Nissan Skyline (R32/R33/R34)", "Mazda RX-7 (FD3S)"],
        image: "/Interiors - Carbon Dash.jpg",
        specs: { "Material": "Pre-Preg Dry Carbon", "Weight": "1.75kg Total", "Weave": "2x2 Twill Matte" }
    },
    "alcantara-wrap": {
        title: "Alcantara Wrap",
        subtitle: "Hand-Stitched Tactile Touchpoints",
        description: "Re-upholster steering wheels, shift boots, door cards, and headliners in authentic Italian Alcantara with contrast French double-stitching.",
        price: "$1,500+",
        features: ["Genuine Italian Alcantara® S.p.A. Material", "Bespoke Contrast Stitching Thread Color Options", "Superior Tactile Grip for Racing Gloves", "Breathable, Anti-Microbial, and Fade-Resistant"],
        compatibility: ["All Interior Vehicle Cockpits"],
        image: "/Interiors - Alcantra.jpg",
        specs: { "Material": "Genuine Italian Alcantara®", "Origin": "Milan, Italy", "Grip Coefficient": "High Motorsport Friction" }
    },
    "roll-cage": {
        title: "Roll Cage",
        subtitle: "Chassis Stiffening & FIA Spec",
        description: "Precision bent and TIG-welded roll cages engineered for driver safety and torsional chassis stiffness in sanctioned competitions.",
        price: "$3,500+",
        features: ["Seamless 4130 Chromoly / DOM Steel Tubing", "Full Hand TIG Welded with Gusset Plate Reinforcements", "Compliant with SCCA, Formula Drift, and FIA Regulations", "Finished in Durable Custom Color Powder-Coat"],
        compatibility: ["Chassis-Specific 3D CAD Laser Measured"],
        image: "/Interiors - Roll cage.jpg",
        specs: { "Tube Spec": "1.75\" OD x .095\" Wall", "Alloy": "4130 Chromoly / DOM Steel", "Welding": "100% Precision TIG" }
    }
};

export const defaultSubPart: SubPartItem = {
    title: "Performance Component",
    subtitle: "High Engineering Standards",
    description: "This premium component is engineered to meet the highest standards of atelier motorsport craftsmanship. Contact us for detailed specifications and availability for your specific platform.",
    price: "Inquire for Price",
    features: ["Motorsport Grade Materials", "Rigorous Testing", "Atelier Warranty", "Professional Install Recommended"],
    compatibility: ["Universal / Multi-fit support"],
    image: "/hero.jpg",
    specs: { "Grade": "Premium", "Availability": "Made to Order" }
};
