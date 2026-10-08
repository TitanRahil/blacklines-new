import React, { useState, useEffect } from "react";
import { useBrand } from "../context/BrandContext";

export interface CommissionPrefill {
    platform: string;
    service: string;
    estimatedTotal: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    prefillData?: CommissionPrefill | null;
}

export default function CommissionModal({ isOpen, onClose, prefillData }: Props) {
    const brand = useBrand();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [selectedService, setSelectedService] = useState("");
    const [timeframe, setTimeframe] = useState("Immediate (Next 14 Days)");
    const [notes, setNotes] = useState("");

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [refCode, setRefCode] = useState("");

    useEffect(() => {
        if (prefillData) {
            setSelectedService(prefillData.service || "");
            if (prefillData.platform && !vehicle) {
                setVehicle(prefillData.platform);
            }
        }
    }, [prefillData, vehicle]);

    // Handle Escape key & scroll lock
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
        lenis?.stop();
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            lenis?.start();
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const generatedRef = `AT-${Math.floor(1000 + Math.random() * 9000)}-${brand.shortName.toUpperCase().slice(0, 3)}`;
        setRefCode(generatedRef);
        setIsSubmitted(true);
    };

    const handleReset = () => {
        setIsSubmitted(false);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl bg-[#090312] border border-purple-500/30 rounded-2xl p-6 md:p-8 shadow-[0_20px_70px_rgba(124,58,237,0.3)] text-left max-h-[90vh] overflow-y-auto overscroll-contain"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-start pb-5 border-b border-white/10 mb-6">
                    <div>
                        <span className="text-[10px] font-mono tracking-[0.25em] text-purple-400 uppercase block mb-1">
                            // Client Intake & Bay Reservation
                        </span>
                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
                            Reserve Commission With {brand.shortName}
                        </h3>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-white/40 hover:text-white p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                        aria-label="Close modal"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {prefillData && prefillData.estimatedTotal && (
                            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between text-xs font-mono">
                                <span className="text-gray-300">
                                    Selected Spec: <strong className="text-white">{prefillData.service}</strong>
                                </span>
                                <span className="text-purple-300 font-bold">
                                    Est. {prefillData.estimatedTotal}
                                </span>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5 font-semibold">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    placeholder="e.g. Marcus Vance"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5 font-semibold">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="marcus@example.com"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5 font-semibold">
                                    Direct Phone / WhatsApp *
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder="+1 (555) 019-2834"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5 font-semibold">
                                    Vehicle (Year, Make, Model) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={vehicle}
                                    onChange={e => setVehicle(e.target.value)}
                                    placeholder="e.g. 2024 Porsche 992 GT3 RS"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5 font-semibold">
                                    Primary Discipline
                                </label>
                                <select
                                    value={selectedService}
                                    onChange={e => setSelectedService(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-[#120824] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none transition-colors cursor-pointer"
                                >
                                    <option value="">Select Service Tier</option>
                                    <option value="Level 4 Ceramic Coating & Full PPF">Level 4 Ceramic Coating & Full PPF</option>
                                    <option value="Stage 2 Performance & Dyno Calibration">Stage 2 Performance & Dyno Calibration</option>
                                    <option value="Carbon Aerodynamics & Track Setup">Carbon Aerodynamics & Track Setup</option>
                                    <option value="Full Turn-Key Atelier Transformation">Full Turn-Key Atelier Transformation</option>
                                    <option value="Bespoke Consultation / Custom Project">Bespoke Consultation / Custom Project</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5 font-semibold">
                                    Desired Intake Window
                                </label>
                                <select
                                    value={timeframe}
                                    onChange={e => setTimeframe(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-[#120824] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none transition-colors cursor-pointer"
                                >
                                    <option value="Immediate (Next 14 Days)">Immediate (Next 14 Days)</option>
                                    <option value="Within 30 Days">Within 30 Days</option>
                                    <option value="Q2 2026 Reservation">Q2 2026 Reservation</option>
                                    <option value="Flexible / Off-Season Build">Flexible / Off-Season Build</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5 font-semibold">
                                Project Objectives & Specific Requests
                            </label>
                            <textarea
                                rows={3}
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                                placeholder="Detail power targets, paint correction requirements, or specific track tracks..."
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none transition-colors resize-none"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full py-4 px-6 bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs uppercase tracking-widest font-black rounded-xl transition-all shadow-[0_0_25px_rgba(124,58,237,0.5)] cursor-pointer hover:shadow-[0_0_35px_rgba(168,85,247,0.7)]"
                            >
                                Transmit Commission Application to {brand.shortName} Atelier →
                            </button>
                            <p className="text-[11px] font-mono text-center text-gray-500 mt-2.5">
                                Secure direct dispatch to engineering directors. 24-hour response guarantee.
                            </p>
                        </div>
                    </form>
                ) : (
                    /* Submission Success Confirmation */
                    <div className="py-6 text-center space-y-6 animate-fadeIn">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <div>
                            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                                // Commission Dossier Transmitted Successfully
                            </span>
                            <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                                Priority Intake Queued
                            </h3>
                            <p className="text-gray-300 text-sm max-w-md mx-auto mt-2 font-light">
                                Thank you, <strong className="text-white font-medium">{fullName}</strong>. Your vehicle spec for the <strong className="text-white font-medium">{vehicle}</strong> has been logged in the {brand.shortName} atelier management system.
                            </p>
                        </div>

                        {/* Dossier Code Card */}
                        <div className="max-w-md mx-auto p-4 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs space-y-1.5 text-left">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Dossier Reference:</span>
                                <span className="text-purple-300 font-bold">{refCode}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Assigned Facility:</span>
                                <span className="text-white">{brand.city} Atelier</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Service SLA:</span>
                                <span className="text-emerald-400">Under 24 Hours Verification</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase tracking-widest font-bold rounded-xl transition-all cursor-pointer"
                        >
                            Return to Atelier Showcase
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
