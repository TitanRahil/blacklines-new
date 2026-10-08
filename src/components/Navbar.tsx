import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { useBrand } from "../context/BrandContext";

export default function Navbar() {
    const brand = useBrand();
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const isPast = window.scrollY > 50;
            setScrolled(prev => (prev !== isPast ? isPast : prev));
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen]);

    const handleHashScroll = (e: React.MouseEvent, to: string) => {
        setIsMobileMenuOpen(false); // Close mobile menu on click
        if (to.includes("#")) {
            const targetId = to.split("#")[1];
            // If we are already on the home page, scroll manually
            if (location.pathname === "/") {
                const element = document.getElementById(targetId);
                if (element) {
                    // We let the Link default behavior update the URL, but force visual scroll
                    // Note: If URL is already .../#target, Link won't trigger route change, so we MUST scroll here.
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
        }
    };

    const navLinks = [
        { name: "Catalog", link: "/#modifications" },
        { name: "Builds", link: "/#builds" },
        { name: "Estimator", link: "/#configurator" },
        { name: "Book Now", link: "/#booking" },
        { name: "Atelier", link: "/#about" },
        { name: "FAQ", link: "/#faq" }
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled || isMobileMenuOpen
                ? "py-4 bg-[#030005]/80 backdrop-blur-xl border-purple-900/20"
                : "py-8 bg-gradient-to-b from-black/80 to-transparent border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-20 flex justify-between items-center">
                {/* Logo Section */}
                <Link to="/" className="group relative z-10 block pr-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-lg sm:text-xl md:text-2xl font-black italic tracking-tight text-white pr-2 whitespace-nowrap truncate max-w-[220px] sm:max-w-[320px] md:max-w-[260px] lg:max-w-[360px] xl:max-w-[480px]">
                            {brand.upper}
                        </span>
                        <div className="h-2 w-2 bg-purple-600 rounded-full shadow-[0_0_10px_#7c3aed] group-hover:scale-125 transition-transform shrink-0 self-center" />
                    </div>
                    <span className="text-[0.62rem] font-bold tracking-[0.3em] text-gray-400 block -mt-0.5 pl-0.5 group-hover:text-purple-400 transition-colors uppercase whitespace-nowrap">
                        {brand.isCustomClient ? "ATELIER SPEC" : "MOTORSPORT ATELIER"}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 lg:gap-10 bg-black/20 backdrop-blur-md px-6 lg:px-9 py-3 rounded-full border border-white/5 shadow-2xl">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            to={item.link}
                            onClick={(e) => handleHashScroll(e, item.link)}
                            className="relative text-xs font-bold uppercase tracking-[0.15em] text-gray-300 hover:text-white transition-colors group/link overflow-hidden"
                        >
                            <span className="relative z-10">{item.name}</span>
                            {/* Hover Underline */}
                            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-purple-500 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left" />
                            {/* Subtle Glow */}
                            <span className="absolute inset-0 bg-purple-500/20 blur-lg opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                        </Link>
                    ))}
                </div>

                {/* Right Side Action */}
                <div className="hidden md:block">
                    <Link
                        to="/#configurator"
                        onClick={(e) => handleHashScroll(e, "/#configurator")}
                        className="relative px-6 py-2.5 overflow-hidden group bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors rounded-sm"
                    >
                        <div className="absolute inset-0 w-0 bg-purple-600 transition-all duration-[250ms] ease-out group-hover:w-full opacity-10" />
                        <span className="relative text-xs font-bold uppercase tracking-widest text-white group-hover:text-purple-300 transition-colors">
                            Estimate Build
                        </span>
                    </Link>
                </div>

                {/* Mobile Menu Icon */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden relative z-50 p-2 text-white hover:text-purple-400 transition-colors"
                    aria-label="Toggle menu"
                >
                    <div className="w-8 h-8 flex flex-col justify-center items-end gap-1.5">
                        <span className={`h-0.5 w-8 bg-current transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                        <span className={`h-0.5 w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                        <span className={`h-0.5 w-4 bg-current transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2 w-8" : ""}`} />
                    </div>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`fixed left-0 right-0 top-[80px] bg-[#030005]/95 backdrop-blur-xl z-40 md:hidden transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? "max-h-[500px] opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
            >
                {/* Content Container */}
                <div className="relative px-6 py-8">
                    {/* Background ambient glow */}
                    <div className="absolute top-0 right-0 w-full h-full bg-purple-900/10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent opacity-50 pointer-events-none" />

                    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto relative z-10">
                        {navLinks.map((item, index) => (
                            <Link
                                key={item.name}
                                to={item.link}
                                onClick={(e) => handleHashScroll(e, item.link)}
                                className={`text-2xl font-black uppercase tracking-[0.2em] text-white hover:text-purple-400 transition-all duration-500 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div
                            className={`w-full h-px bg-white/10 transition-all duration-500 delay-300 ${isMobileMenuOpen ? "scale-x-100" : "scale-x-0"}`}
                        />

                        <Link
                            to="/#modifications"
                            onClick={(e) => handleHashScroll(e, "/#modifications")}
                            className={`relative w-full py-3 bg-white/5 border border-white/10 flex justify-center items-center overflow-hidden group transition-all duration-500 delay-400 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
                                }`}
                        >
                            <span className="relative z-10 text-xs font-bold uppercase tracking-[0.3em] text-white group-hover:text-purple-300">
                                Configure Your Build
                            </span>
                            <div className="absolute inset-0 bg-purple-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>
                    </div>

                    {/* Bottom Fade Gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#030005] pointer-events-none" />
                </div>
            </div>
        </nav>
    );
}
