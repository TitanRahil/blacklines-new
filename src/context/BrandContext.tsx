import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export interface BrandConfig {
    name: string;           // e.g. "Apex Atelier" or "Obsidian Detailing"
    upper: string;          // e.g. "APEX ATELIER" or "OBSIDIAN DETAILING"
    shortName: string;      // e.g. "Apex" or "Obsidian"
    city: string;           // e.g. "Tokyo" or "Miami"
    locationTag: string;    // e.g. "PRIVATE FACILITY // BY APPOINTMENT" or "MIAMI ATELIER"
    email: string;          // e.g. "concierge@apexatelier.com"
    isCustomClient: boolean;
    clientRaw: string | null;
}

const DEFAULT_BRAND_NAME = "Apex Atelier";
const DEFAULT_CITY = "Los Angeles";
const DEFAULT_LOCATION_TAG = "EST. 2024 // PRIVATE FACILITY • USA";

const BrandContext = createContext<BrandConfig>({
    name: DEFAULT_BRAND_NAME,
    upper: DEFAULT_BRAND_NAME.toUpperCase(),
    shortName: "Apex",
    city: DEFAULT_CITY,
    locationTag: DEFAULT_LOCATION_TAG,
    email: "concierge@apexatelier.com",
    isCustomClient: false,
    clientRaw: null,
});

function sanitizeBrandName(raw: string): string {
    let decoded = raw;
    try {
        decoded = decodeURIComponent(raw);
    } catch {
        // fallback to raw
    }
    const cleaned = decoded.replace(/[+_-]/g, " ").trim();
    // Capitalize each word properly if provided in lowercase
    return cleaned
        .split(" ")
        .filter(Boolean)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

function slugify(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    const brandConfig = useMemo<BrandConfig>(() => {
        // Combine both location.search and any query params embedded after hash
        let searchStr = location.search;
        if (!searchStr && location.hash && location.hash.includes("?")) {
            searchStr = location.hash.substring(location.hash.indexOf("?"));
        }
        if (!searchStr && typeof window !== "undefined" && window.location.href.includes("?")) {
            searchStr = window.location.href.substring(window.location.href.indexOf("?"));
        }

        const params = new URLSearchParams(searchStr);
        // Support all intuitive aliases: ?client=, ?brand=, ?name=, ?studio=, ?shop=, ?prospect=
        const clientParam =
            params.get("client") ||
            params.get("brand") ||
            params.get("name") ||
            params.get("studio") ||
            params.get("shop") ||
            params.get("prospect");

        // Support location aliases: ?city=, ?location=, ?place=
        const cityParam = params.get("city") || params.get("location") || params.get("place");

        if (clientParam && clientParam.trim().length > 0) {
            const sanitizedName = sanitizeBrandName(clientParam);
            const words = sanitizedName.split(" ");
            const shortName = words[0] || sanitizedName;
            const city = cityParam ? sanitizeBrandName(cityParam) : "Metropolitan Facility";
            const locationTag = cityParam
                ? `EST. 2024 // ${city.toUpperCase()} ATELIER`
                : "EST. 2024 // PRIVATE FACILITY • BY APPOINTMENT";
            const slug = slugify(sanitizedName);
            const email = `concierge@${slug || "apexatelier"}.com`;

            return {
                name: sanitizedName,
                upper: sanitizedName.toUpperCase(),
                shortName,
                city,
                locationTag,
                email,
                isCustomClient: true,
                clientRaw: clientParam.trim(),
            };
        }

        return {
            name: DEFAULT_BRAND_NAME,
            upper: DEFAULT_BRAND_NAME.toUpperCase(),
            shortName: "Apex",
            city: DEFAULT_CITY,
            locationTag: "EST. 2024 // PRIVATE FACILITY • USA",
            email: "concierge@apexatelier.com",
            isCustomClient: false,
            clientRaw: null,
        };
    }, [location.search, location.hash]);

    useEffect(() => {
        if (brandConfig.isCustomClient) {
            document.title = `${brandConfig.name} // Bespoke Automotive Atelier`;
        } else {
            document.title = "Apex Atelier // High-Performance Automotive Engineering";
        }
    }, [brandConfig]);

    return (
        <BrandContext.Provider value={brandConfig}>
            {children}
        </BrandContext.Provider>
    );
};

export const useBrand = () => useContext(BrandContext);
