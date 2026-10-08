import React, { useState } from "react";
import { useBrand } from "../context/BrandContext";

export default function AgencyBanner() {
    const brand = useBrand();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    // If client dismissed banner completely
    const [isDismissed, setIsDismissed] = useState(false);

    if (isDismissed) return null;

    return (
        <>
            {/* Floating Discreet Agency Pill */}
            <div className="fixed bottom-5 right-5 z-50 pointer-events-auto transition-all duration-300">
                {isMinimized ? (
                    <button
                        onClick={() => setIsMinimized(false)}
                        className="group flex items-center gap-2 bg-[#0a0512]/90 backdrop-blur-md border border-purple-500/30 px-3 py-1.5 rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:border-purple-400/60 transition-all text-xs font-mono text-purple-300"
                        title="Expand Concept Prototype Info"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Concept Demo</span>
                    </button>
                ) : (
                    <div className="flex items-center gap-3 bg-[#0a0414]/92 backdrop-blur-xl border border-purple-500/30 pl-3.5 pr-2 py-2 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.7)] group">
                        <div className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-mono tracking-wider text-purple-300 font-bold">
                                    {brand.isCustomClient ? `Prototype for ${brand.name}` : "Interactive Concept Demo"}
                                </span>
                                <span className="text-[9px] font-mono text-white/50 tracking-wide">
                                    Ready for Deployment & Launch
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5 ml-2">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-purple-600/80 hover:bg-purple-500 text-white rounded-lg transition-colors font-medium cursor-pointer shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                            >
                                Claim Build →
                            </button>
                            <button
                                onClick={() => setIsMinimized(true)}
                                className="p-1 text-white/40 hover:text-white transition-colors cursor-pointer rounded-md"
                                title="Minimize banner"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Concept Acquisition / Walkthrough Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="relative w-full max-w-lg bg-[#0d0718] border border-purple-500/30 rounded-2xl p-6 md:p-8 shadow-[0_20px_60px_rgba(124,58,237,0.25)] text-left"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="text-[10px] font-mono tracking-[0.25em] text-purple-400 uppercase block mb-1">
                                    // Custom Proposal & Technical Spec
                                </span>
                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
                                    {brand.isCustomClient ? `${brand.name} Concept` : "Automotive Atelier Concept"}
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-white/40 hover:text-white p-1 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Narrative */}
                        <div className="space-y-4 text-sm text-gray-300 font-light leading-relaxed mb-6">
                            <p>
                                This bespoke web architecture was engineered as a high-performance interactive prototype for <strong className="text-white font-medium">{brand.name}</strong>.
                            </p>

                            {/* Shareable Client URL Box */}
                            <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 space-y-2 font-mono text-xs">
                                <div className="flex items-center justify-between text-[11px] text-purple-300">
                                    <span className="font-bold uppercase tracking-wider">⚡ Active Prospect Demo Link</span>
                                    <span className="text-[10px] text-gray-400">100% Dynamic</span>
                                </div>
                                <div className="text-[11px] text-white/90 bg-black/50 p-2 rounded border border-white/10 break-all select-all">
                                    {typeof window !== "undefined"
                                        ? `${window.location.origin}${window.location.pathname}?client=${encodeURIComponent(brand.name)}&city=${encodeURIComponent(brand.city)}`
                                        : `?client=${brand.name}&city=${brand.city}`}
                                </div>
                                <p className="text-[10px] text-gray-400 leading-normal">
                                    Change any brand or city instantly by changing the URL parameters: <br />
                                    <span className="text-purple-300">?client=Your+Shop+Name</span> &amp; <span className="text-purple-300">?city=Your+City</span>
                                </p>
                            </div>

                            <p className="text-xs text-white/70 bg-white/[0.02] border border-white/10 rounded-xl p-3 font-mono">
                                • 60 FPS Scrollytelling Telemetry<br />
                                • Dynamic Client In-Page Build Dossiers<br />
                                • Interactive Instant Build Estimator &amp; Intake<br />
                                • White-Label Architecture Ready for Custom Deployment
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href={`mailto:hello@gravitydigital.co?subject=${encodeURIComponent(`Inquiry Regarding ${brand.name} Concept Website`)}&body=${encodeURIComponent(`Hi,\n\nI reviewed the concept prototype for ${brand.name} and would like to discuss implementing it for our studio.\n\nBest regards,\n`)}`}
                                className="flex-1 py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono tracking-widest uppercase font-bold text-center rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                            >
                                Inquire to Claim Build →
                            </a>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-mono tracking-widest uppercase rounded-xl transition-all"
                            >
                                Continue Browsing
                            </button>
                        </div>

                        <div className="mt-4 text-center">
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setIsDismissed(true);
                                }}
                                className="text-[10px] font-mono text-white/30 hover:text-white/60 underline cursor-pointer"
                            >
                                Dismiss banner for this session
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
