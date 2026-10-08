import { Link, useParams } from "react-router-dom";
import { subPartsData, defaultSubPart } from "../data/subPartsData";

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
