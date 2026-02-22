import { useState } from "react";
import { Link } from "react-router-dom";
import SequenceHero from "../components/SequenceHero";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { CyberScramble } from "../components/CyberScramble";

const categories = [
    { name: "Spoilers", id: "spoilers", desc: "Aerodynamics & Downforce", image: "/part-spoiler.jpg" },
    { name: "Engine", id: "engine", desc: "Performance Tuning", image: "/part-engine.jpg" },
    { name: "Side Skirts", id: "skirts", desc: "Stance & Style", image: "/part-skirts.jpg" },
    { name: "Wheels", id: "wheels", desc: "Forged & Cast Rims", image: "/part-wheels.jpg" },
    { name: "Wraps", id: "wraps", desc: "Custom Vinyl & PPF", image: "/part-wraps.jpg" },
    { name: "Interior", id: "interior", desc: "Custom Cabins & Upholstery", image: "/part-interior.jpg" },
];

function FaqItem({ faq }: { faq: { q: string; a: string } }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            className={`glass-card p-6 md:p-8 transition-all duration-300 cursor-pointer group rounded-xl border-l-4 ${isOpen
                ? "border-l-purple-500 bg-purple-800/30 shadow-[0_0_20px_rgba(147,51,234,0.15)] border-white/10"
                : "border-l-purple-900/50 hover:border-l-purple-500"
                }`}
        >
            <div className="flex justify-between items-center bg-transparent">
                <h3 className={`text-xl font-bold transition-colors ${isOpen ? "text-purple-300" : "text-white"}`}>
                    {faq.q}
                </h3>
                <span className={`text-2xl font-light transform transition-transform duration-300 ${isOpen ? "rotate-45 text-purple-400" : "text-purple-700"}`}>
                    +
                </span>
            </div>

            <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out bg-transparent ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
            >
                <div className="overflow-hidden bg-transparent">
                    <p className="text-gray-300 leading-relaxed font-light">
                        {faq.a}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <main className="min-h-screen bg-[#030005] text-white selection:bg-purple-600 selection:text-white">
            <SequenceHero />

            {/* Modifications Grid */}
            <section id="modifications" className="py-16 md:py-32 px-6 md:px-20 relative bg-[#030005] overflow-hidden">
                {/* Ambient Light */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-end justify-between mb-10 md:mb-20">
                        <div>
                            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400">
                                <CyberScramble text="MODIFICATIONS" />
                            </h2>
                            <div className="h-1.5 w-32 bg-purple-600 shadow-[0_0_20px_#7c3aed]" />
                        </div>
                        <p className="hidden md:block text-gray-400 text-right max-w-sm border-r-2 border-purple-900 pr-6">
                            Browse our catalog of premium parts designed for performance and aesthetics.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((cat, index) => (
                            <RevealOnScroll key={cat.id} width="100%" delay={index * 100}>
                                <Link
                                    to={`/parts/${cat.id}`}
                                    className="group relative h-96 overflow-hidden rounded-2xl border border-white/10 hover:border-purple-500 transition-all duration-500 flex flex-col justify-end purple-glow-box"
                                >
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0510] via-purple-900/20 to-transparent" />

                                    <div className="relative z-10 p-8 w-full border-t border-white/5 bg-black/40 backdrop-blur-sm">
                                        <h3 className="text-3xl font-black mb-1 text-white group-hover:text-purple-300 transition-colors uppercase italic">
                                            {cat.name}
                                        </h3>
                                        <p className="text-purple-400 text-sm font-bold tracking-widest uppercase">
                                            {cat.desc}
                                        </p>
                                    </div>
                                </Link>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Builds Section */}
            <section id="builds" className="py-16 md:py-32 px-6 md:px-20 bg-[#05020a] relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="mb-20 text-center">
                        <span className="text-purple-500 font-bold tracking-[0.3em] text-sm uppercase mb-4 block">Engineered for Excellence</span>
                        <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 text-white text-glow">
                            <CyberScramble text="FEATURED BUILDS" />
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Build 1 */}
                        <RevealOnScroll direction="left" width="100%" delay={0}>
                            <Link to="/builds/nightshade" className="group relative h-[600px] block cursor-pointer overflow-hidden rounded-2xl border border-purple-900/30 hover:border-purple-500 transition-all duration-500 hover:-translate-y-2 shadow-2xl">
                                <img
                                    src="/build-supra.png"
                                    alt="Midnight Purple Supra MK4"
                                    className="absolute inset-0 w-full h-full object-cover object-[center_70%] transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#05020a] via-transparent to-transparent opacity-90" />
                                <div className="absolute bottom-0 left-0 p-10 w-full">
                                    <div className="inline-block px-3 py-1 bg-purple-600 text-white text-xs font-bold uppercase tracking-wider mb-4 rounded-sm">
                                        Nightshade
                                    </div>
                                    <h3 className="text-4xl font-black text-white mb-2 leading-none uppercase italic">Toyota Supra</h3>
                                    <div className="h-0.5 w-full bg-white/20 mt-4 group-hover:bg-purple-500 transition-colors" />
                                    <div className="flex justify-between mt-4 text-sm text-gray-300 font-mono">
                                        <span>1000HP</span>
                                        <span>2JZ-GTE</span>
                                    </div>
                                </div>
                            </Link>
                        </RevealOnScroll>

                        {/* Build 2 */}
                        <RevealOnScroll direction="left" width="100%" delay={200}>
                            <Link to="/builds/azure" className="group relative h-[600px] block cursor-pointer overflow-hidden rounded-2xl border border-purple-900/30 hover:border-purple-500 transition-all duration-500 hover:-translate-y-2 shadow-2xl md:mt-16">
                                <img
                                    src="/build-skyline.jpg"
                                    alt="R34 GTR Track Spec"
                                    className="absolute inset-0 w-full h-full object-cover object-[center_70%] transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#05020a] via-transparent to-transparent opacity-90" />
                                <div className="absolute bottom-0 left-0 p-10 w-full">
                                    <div className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider mb-4 rounded-sm">
                                        Azure
                                    </div>
                                    <h3 className="text-4xl font-black text-white mb-2 leading-none uppercase italic">Nissan R34 GTR</h3>
                                    <div className="h-0.5 w-full bg-white/20 mt-4 group-hover:bg-blue-500 transition-colors" />
                                    <div className="flex justify-between mt-4 text-sm text-gray-300 font-mono">
                                        <span>800HP</span>
                                        <span>RB26DETT</span>
                                    </div>
                                </div>
                            </Link>
                        </RevealOnScroll>

                        {/* Build 3 */}
                        <RevealOnScroll direction="left" width="100%" delay={400}>
                            <Link to="/builds/han" className="group relative h-[600px] block cursor-pointer overflow-hidden rounded-2xl border border-purple-900/30 hover:border-purple-500 transition-all duration-500 hover:-translate-y-2 shadow-2xl md:mt-32">
                                <img
                                    src="/build-rx7.jpg"
                                    alt="RX7 FD Drift Spec"
                                    className="absolute inset-0 w-full h-full object-cover object-[center_70%] transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#05020a] via-transparent to-transparent opacity-90" />
                                <div className="absolute bottom-0 left-0 p-10 w-full">
                                    <div className="inline-block px-3 py-1 bg-orange-600 text-white text-xs font-bold uppercase tracking-wider mb-4 rounded-sm">
                                        Han
                                    </div>
                                    <h3 className="text-4xl font-black text-white mb-2 leading-none uppercase italic">Mazda RX-7</h3>
                                    <div className="h-0.5 w-full bg-white/20 mt-4 group-hover:bg-orange-500 transition-colors" />
                                    <div className="flex justify-between mt-4 text-sm text-gray-300 font-mono">
                                        <span>650HP</span>
                                        <span>13B-REW</span>
                                    </div>
                                </div>
                            </Link>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-32 px-6 md:px-20 bg-[#080510] relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black mb-16 text-center text-white">
                        <CyberScramble text="COMMON" /> <span className="text-purple-500"><CyberScramble text="QUESTIONS" /></span>
                    </h2>

                    <div className="space-y-6">
                        {[
                            { q: "Do you ship internationally?", a: "Yes, we ship premium JDM parts to over 50 countries worldwide with insured tracking." },
                            { q: "Do you offer installation services?", a: "We have a dedicated workshop in Tokyo and partner garages in major US and EU cities." },
                            { q: "What is your warranty policy?", a: "All Blacklines Motorsport parts come with a lifetime structural warranty and 1-year finish warranty." },
                            { q: "Are custom colors available for wheels?", a: "Absolutely. We offer over 50 powder-coated finishes and custom color matching for all forged wheels." },
                            { q: "Can I return parts if they don't fit?", a: "We offer a 30-day return policy for uninstalled parts. Restocking fees may apply for custom orders." },
                        ].map((faq, i) => (
                            <RevealOnScroll key={i} width="100%" delay={i * 100} direction="right">
                                <FaqItem faq={faq} />
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className="py-32 px-6 md:px-20 bg-[#030005] relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
                    <div>
                        <div className="inline-block px-4 py-1.5 bg-purple-900/30 border border-purple-500/50 rounded-full text-purple-300 text-xs font-bold tracking-widest mb-8">
                            EST. 2024
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-[0.9]">
                            <CyberScramble text="REDEFINING" /> <br />
                            <CyberScramble
                                text="CAR CULTURE"
                                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-white text-glow"
                            />
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed font-light">
                            Blacklines Motorsport wasn't just built to sell parts; it was created to curate a lifestyle.
                            Born from the neon-lit streets of Tokyo and engineered for the global stage, we bridge the gap between
                            raw performance and artistic expression.
                        </p>
                        <p className="text-gray-400 text-lg mb-10 leading-relaxed font-light border-l-2 border-purple-800 pl-6">
                            Every spoiler, skirt, and engine component we offer is a testament to our obsession with perfection.
                            We don't just modify cars; we forge legends.
                        </p>
                        <Link
                            to="/about"
                            className="inline-flex items-center text-white font-bold tracking-widest hover:text-purple-400 transition-colors group uppercase text-sm"
                        >
                            LEARN MORE ABOUT US
                            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-3xl transform rotate-6 blur-2xl opacity-20 animate-pulse" />
                        <div className="relative w-full aspect-[4/5] md:aspect-square bg-[#0a0510] rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center group hover:border-purple-500/50 transition-colors duration-500">
                            <img
                                src="/A_premium_motorsport_202601252335.jpg"
                                alt="Blacklines Motorsport Workshop"
                                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                            />
                        </div>
                        <div className="mt-6 pl-2">
                            <div className="text-purple-500 font-bold tracking-[0.5em] text-sm uppercase mb-2">The Workshop</div>
                            <div className="text-2xl font-bold text-white">Precision Engineering</div>
                        </div>
                    </div>
                </div>

                {/* Contact & Map Section */}
                <div className="max-w-7xl mx-auto mt-24 pt-24 border-t border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="flex flex-col justify-center space-y-10">
                        <div>
                            <h3 className="text-3xl font-black text-white mb-8 uppercase tracking-wider relative inline-block">
                                Visit Our <span className="text-purple-500">HQ</span>
                                <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-purple-600/50" />
                            </h3>
                            <div className="space-y-8">
                                <div className="flex items-start gap-6 group">
                                    <div className="p-4 bg-white/5 rounded-2xl text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 border border-white/5 group-hover:border-purple-500/50 shadow-lg">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-purple-400 font-bold tracking-[0.2em] uppercase mb-2">Location</p>
                                        <p className="text-xl text-white font-light">1-chōme-21-1 Jinnan</p>
                                        <p className="text-gray-400 font-mono text-sm mt-1">Shibuya City, Tokyo 150-0041, JP</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="p-4 bg-white/5 rounded-2xl text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 border border-white/5 group-hover:border-purple-500/50 shadow-lg">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-purple-400 font-bold tracking-[0.2em] uppercase mb-2">Email Us</p>
                                        <p className="text-xl text-white font-light transition-colors hover:text-purple-400 cursor-pointer">contact@blacklines.jp</p>
                                        <p className="text-gray-400 font-mono text-sm mt-1">Business Inquiries Only</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="p-4 bg-white/5 rounded-2xl text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 border border-white/5 group-hover:border-purple-500/50 shadow-lg">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-purple-400 font-bold tracking-[0.2em] uppercase mb-2">Call Us</p>
                                        <p className="text-xl text-white font-light">+81 3-5550-1337</p>
                                        <p className="text-gray-400 font-mono text-sm mt-1">Mon-Fri, 9am - 6pm JST</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="h-[450px] w-full rounded-3xl overflow-hidden border border-white/10 relative grayscale hover:grayscale-0 transition-all duration-700 bg-[#0a0510] group">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7479754723107!2d139.6990596152588!3d35.66933528019708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ca298813bc3%3A0xe67cb56453f2c58!2sShibuya%20City%2C%20Tokyo%2C%20Japan!5e0!3m2!1sen!2sus!4v1652230000000!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                        ></iframe>
                        {/* Overlay to ensure clicks create interaction properly but allows scrolling */}
                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(3,0,5,0.8)] border border-white/5 rounded-3xl" />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-black text-center border-t border-purple-900/20">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <div className="h-3 w-3 bg-purple-600 rounded-full animate-pulse" />
                    <span className="text-purple-400 font-bold tracking-widest uppercase text-sm">Online System Operational</span>
                </div>
                <p className="text-gray-600 text-sm">
                    &copy; {new Date().getFullYear()} BLACKLINES MOTORSPORT. TOKYO • JAPAN.
                </p>
            </footer>
        </main>
    );
}
