import React, { useState } from "react";
import { useBrand } from "../context/BrandContext";

interface Platform {
    id: string;
    name: string;
    shortLabel: string;
    icon: string;
    basePrice: number;
    baseDays: number;
}

interface ServiceTier {
    id: string;
    title: string;
    tagline: string;
    priceMultiplier: number;
    addedDays: number;
    badge: string;
}

interface AddOn {
    id: string;
    name: string;
    price: number;
    days: number;
}

const platforms: Platform[] = [
    { id: "jdm", name: "JDM Legends", shortLabel: "JDM", icon: "🇯🇵", basePrice: 2200, baseDays: 3 },
    { id: "euro", name: "Euro & Porsche", shortLabel: "Euro / Porsche", icon: "🇩🇪", basePrice: 2800, baseDays: 3 },
    { id: "exotic", name: "Exotics & Supercars", shortLabel: "Exotic / Supercar", icon: "🇮🇹", basePrice: 3800, baseDays: 4 },
    { id: "muscle", name: "American V8 / Track", shortLabel: "American V8", icon: "🇺🇸", basePrice: 2400, baseDays: 3 }
];

const serviceTiers: ServiceTier[] = [
    {
        id: "ceramic-ppf",
        title: "PPF & Ceramic Armor",
        tagline: "Paint correction, 8mil self-healing PPF & 10-yr ceramic",
        priceMultiplier: 1.0,
        addedDays: 2,
        badge: "Detailing"
    },
    {
        id: "dyno-tune",
        title: "Stage 2 Dyno Tuning",
        tagline: "High-flow intake, bespoke downpipes & ECU calibration",
        priceMultiplier: 1.25,
        addedDays: 2,
        badge: "Powertrain"
    },
    {
        id: "track-aero",
        title: "Carbon Aero & Chassis",
        tagline: "Dry carbon splitters, GT wing & laser corner balancing",
        priceMultiplier: 1.4,
        addedDays: 3,
        badge: "Aero & Track"
    },
    {
        id: "full-atelier",
        title: "Turn-Key Atelier Build",
        tagline: "Complete powertrain blueprinting, widebody & custom interior",
        priceMultiplier: 2.5,
        addedDays: 7,
        badge: "Full Build"
    }
];

const addOnsList: AddOn[] = [
    { id: "dyno-session", name: "AWD Dyno Baseline", price: 450, days: 0 },
    { id: "wheel-ceramic", name: "Wheels-Off Ceramic", price: 500, days: 1 },
    { id: "titanium-exhaust", name: "Titanium Exhaust Fab", price: 1850, days: 2 }
];

interface Props {
    onOpenModal: (prefill: { platform: string; service: string; estimatedTotal: string }) => void;
}

export default function CommissionConfigurator({ onOpenModal }: Props) {
    const brand = useBrand();

    const [selectedPlatform, setSelectedPlatform] = useState<Platform>(platforms[0]);
    const [selectedTier, setSelectedTier] = useState<ServiceTier>(serviceTiers[0]);
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>(["dyno-session"]);

    const toggleAddOn = (id: string) => {
        setSelectedAddOns(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    // Calculate dynamic estimates
    const addOnsTotal = selectedAddOns.reduce((sum, id) => {
        const item = addOnsList.find(a => a.id === id);
        return sum + (item ? item.price : 0);
    }, 0);

    const addOnsDays = selectedAddOns.reduce((sum, id) => {
        const item = addOnsList.find(a => a.id === id);
        return sum + (item ? item.days : 0);
    }, 0);

    const calculatedLow = Math.round((selectedPlatform.basePrice * selectedTier.priceMultiplier) + addOnsTotal);
    const calculatedHigh = Math.round(calculatedLow * 1.22);
    const calculatedDays = selectedPlatform.baseDays + selectedTier.addedDays + addOnsDays;

    const formattedRange = `$${calculatedLow.toLocaleString()} – $${calculatedHigh.toLocaleString()}`;

    return (
        <section id="configurator" className="py-16 md:py-20 px-6 md:px-16 bg-[#030005] relative overflow-hidden border-t border-white/[0.08]">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-1/3 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.12)_0%,transparent_70%)] pointer-events-none -translate-y-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header - Compact single-line title */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-5 border-b border-white/[0.08] gap-4">
                    <div>
                        <span className="text-purple-400 font-mono text-xs tracking-[0.25em] uppercase block mb-1.5">
                            Instant Calculator of {brand.name}
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                            BUILD ESTIMATE
                        </h2>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm font-light max-w-md">
                        Select your vehicle platform and package below to generate an immediate turnaround &amp; atelier investment projection from {brand.name}.
                    </p>
                </div>

                {/* Main Interactive Grid - Compact 2-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Left Column: Compact Selectors (7 cols) */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                        
                        {/* 1. Vehicle Platform Segmented Selector */}
                        <div>
                            <div className="flex items-center justify-between mb-2.5">
                                <span className="text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                    1. Vehicle Platform
                                </span>
                                <span className="text-[11px] font-mono text-gray-400">
                                    Selected: <span className="text-white font-semibold">{selectedPlatform.name}</span>
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {platforms.map(p => {
                                    const isSelected = selectedPlatform.id === p.id;
                                    return (
                                        <button
                                            key={p.id}
                                            type="button"
                                            onClick={() => setSelectedPlatform(p)}
                                            className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                                                isSelected
                                                    ? "bg-purple-950/50 border-purple-500 shadow-[0_0_20px_rgba(124,58,237,0.3)] text-white"
                                                    : "bg-[#08040f] border-white/10 text-gray-400 hover:border-white/25 hover:text-white hover:bg-[#0d0718]"
                                            }`}
                                        >
                                            <span className="text-lg">{p.icon}</span>
                                            <span className="text-xs font-bold tracking-tight">
                                                {p.shortLabel}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 2. Service Package (Compact 2x2 grid) */}
                        <div>
                            <div className="flex items-center justify-between mb-2.5">
                                <span className="text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                    2. Service Package
                                </span>
                                <span className="text-[11px] font-mono text-purple-300 font-semibold">
                                    +{selectedTier.addedDays} Days Bay Time
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {serviceTiers.map(tier => {
                                    const isSelected = selectedTier.id === tier.id;
                                    return (
                                        <button
                                            key={tier.id}
                                            type="button"
                                            onClick={() => setSelectedTier(tier)}
                                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                                                isSelected
                                                    ? "bg-purple-950/45 border-purple-500 shadow-[0_0_25px_rgba(124,58,237,0.25)]"
                                                    : "bg-[#08040f] border-white/10 hover:border-white/20 hover:bg-[#0c0617]"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-purple-300 font-semibold">
                                                    {tier.badge}
                                                </span>
                                                <span className={`text-[10px] font-mono uppercase font-bold ${
                                                    isSelected ? "text-purple-300" : "text-gray-400"
                                                }`}>
                                                    {isSelected ? "● Selected" : "Select"}
                                                </span>
                                            </div>
                                            <h4 className="text-white font-bold text-sm mb-1">
                                                {tier.title}
                                            </h4>
                                            <p className="text-gray-400 text-xs font-light leading-snug line-clamp-2">
                                                {tier.tagline}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 3. Optional Add-ons (Single Row of Pills) */}
                        <div>
                            <span className="text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold flex items-center gap-2 mb-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                3. Optional Add-ons
                            </span>

                            <div className="flex flex-wrap gap-2">
                                {addOnsList.map(item => {
                                    const isChecked = selectedAddOns.includes(item.id);
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => toggleAddOn(item.id)}
                                            className={`px-3 py-2 rounded-lg border text-xs font-mono flex items-center gap-2 cursor-pointer transition-all ${
                                                isChecked
                                                    ? "bg-purple-950/50 border-purple-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.2)]"
                                                    : "bg-[#08040f] border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200"
                                            }`}
                                        >
                                            <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
                                                isChecked ? "bg-purple-600 text-white font-bold" : "border border-white/20"
                                            }`}>
                                                {isChecked ? "✓" : ""}
                                            </span>
                                            <span>{item.name}</span>
                                            <span className="text-purple-300 font-bold">+${item.price}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Live Output Summary Card (5 cols) */}
                    <div className="lg:col-span-5 xl:col-span-4">
                        <div className="bg-[#090412]/95 backdrop-blur-xl border border-purple-500/35 rounded-2xl p-5 sm:p-6 shadow-[0_15px_50px_rgba(0,0,0,0.7)] text-left relative overflow-hidden">
                            {/* Card Header Badge */}
                            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[10px] font-mono tracking-widest text-purple-300 uppercase font-bold">
                                        Live Calculation
                                    </span>
                                </div>
                                <span className="text-[10px] font-mono text-gray-400">
                                    {brand.shortName}
                                </span>
                            </div>

                            {/* Main Price Output */}
                            <div className="mb-5">
                                <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1">
                                    Estimated Project Investment
                                </span>
                                <div className="text-3xl font-mono font-black text-white tracking-tight">
                                    {formattedRange}
                                </div>
                                <p className="text-[10px] text-gray-500 mt-1 font-mono">
                                    Includes parts, precision labor & calibration.
                                </p>
                            </div>

                            {/* Turnaround & Bay Info */}
                            <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-white/10 mb-4">
                                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                                    <span className="text-[10px] font-mono text-gray-400 uppercase block mb-0.5">
                                        Est. Bay Time
                                    </span>
                                    <span className="text-xs font-mono font-bold text-white">
                                        {calculatedDays} Working Days
                                    </span>
                                </div>
                                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                                    <span className="text-[10px] font-mono text-gray-400 uppercase block mb-0.5">
                                        Allocation
                                    </span>
                                    <span className="text-xs font-mono font-bold text-purple-300">
                                        Dedicated Bay
                                    </span>
                                </div>
                            </div>

                            {/* Active Spec Recap */}
                            <div className="space-y-1.5 mb-5 text-[11px] font-mono text-gray-300">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Platform:</span>
                                    <span className="text-white font-medium">{selectedPlatform.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Package:</span>
                                    <span className="text-purple-300 font-medium truncate max-w-[170px] text-right">{selectedTier.title}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Add-ons:</span>
                                    <span className="text-white font-medium">{selectedAddOns.length} active</span>
                                </div>
                            </div>

                            {/* Submit Call-to-action */}
                            <button
                                type="button"
                                onClick={() =>
                                    onOpenModal({
                                        platform: selectedPlatform.name,
                                        service: selectedTier.title,
                                        estimatedTotal: formattedRange
                                    })
                                }
                                className="w-full py-3.5 px-5 bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs uppercase tracking-widest font-black rounded-xl transition-all shadow-[0_0_20px_rgba(124,58,237,0.5)] cursor-pointer hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]"
                            >
                                Lock In Estimate →
                            </button>

                            <p className="text-[10px] font-mono text-center text-gray-500 mt-2.5">
                                Locks in priority booking for 14 days. Zero obligation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
