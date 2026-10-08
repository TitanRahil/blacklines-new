import React from "react";
import { useBrand } from "../context/BrandContext";

interface Props {
    onOpenModal: () => void;
}

export default function BookNowSection({ onOpenModal }: Props) {
    const brand = useBrand();

    return (
        <section id="booking" className="py-12 sm:py-20 md:py-32 px-4 sm:px-6 md:px-20 bg-[#020004] relative overflow-hidden border-t border-white/[0.08]">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.18)_0%,rgba(124,58,237,0.04)_50%,transparent_70%)] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Centerpiece Luxury Booking Card */}
                <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0c0618]/95 via-[#080312]/95 to-[#040108]/98 border border-purple-500/30 p-5 sm:p-8 md:p-14 shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden">
                    {/* Top ambient technical border glow */}
                    <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center">
                        {/* Left / Narrative Block (7 cols) */}
                        <div className="lg:col-span-7 space-y-3 sm:space-y-5">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 font-mono text-[11px] sm:text-xs">
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse shrink-0" />
                                <span className="uppercase tracking-wider font-bold truncate">
                                    Private Reservations • {brand.name}
                                </span>
                            </div>

                            <div>
                                <span className="text-purple-400 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase block mb-1">
                                    Craftsmanship of {brand.name}
                                </span>
                                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                                    READY TO ELEVATE <br className="hidden sm:inline" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-white">
                                        {" "}YOUR VEHICLE?
                                    </span>
                                </h2>
                            </div>

                            <p className="text-gray-300 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-xl line-clamp-3 sm:line-clamp-none">
                                Whether commissioning aerodynamic bodywork, custom dyno remapping, or level 4 ceramic protection, the team at {brand.name} operates on a dedicated by-appointment basis to ensure showroom perfection for every client build.
                            </p>

                            {/* Value Checkpoints - 2x2 grid on mobile and desktop */}
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1 font-mono text-[10px] sm:text-xs text-gray-300">
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300 font-bold text-[9px] shrink-0">✓</span>
                                    <span className="truncate">Engineering Consultation</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300 font-bold text-[9px] shrink-0">✓</span>
                                    <span className="truncate">Cleanroom Facility</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300 font-bold text-[9px] shrink-0">✓</span>
                                    <span className="truncate">Dyno & Fitment Guarantee</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300 font-bold text-[9px] shrink-0">✓</span>
                                    <span className="truncate">24-Hour Response</span>
                                </div>
                            </div>
                        </div>

                        {/* Right / Direct Action Card (5 cols) */}
                        <div className="lg:col-span-5 flex flex-col items-stretch">
                            <div className="bg-[#100720]/80 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-md shadow-inner text-center space-y-3 sm:space-y-5">
                                <div>
                                    <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-gray-400 uppercase block mb-0.5">
                                        Atelier Availability
                                    </span>
                                    <div className="text-lg sm:text-xl md:text-2xl font-mono font-black text-white">
                                        PRIORITY INTAKE OPEN
                                    </div>
                                    <p className="text-[11px] sm:text-xs text-purple-300/80 font-mono mt-0.5">
                                        {brand.locationTag}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={onOpenModal}
                                    className="w-full py-3 sm:py-3.5 md:py-4 px-6 bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs sm:text-sm uppercase tracking-widest font-black rounded-xl transition-all shadow-[0_0_25px_rgba(124,58,237,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    BOOK NOW →
                                </button>

                                <div className="pt-2 border-t border-white/10 space-y-1 text-[10px] sm:text-[11px] font-mono text-gray-400">
                                    <p>No obligation to reserve consultation slot.</p>
                                    <p className="truncate">
                                        Direct inquiries:{" "}
                                        <a href={`mailto:${brand.email}`} className="text-purple-400 hover:text-white transition-colors underline">
                                            {brand.email}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
