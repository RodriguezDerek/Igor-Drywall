import { Link } from "react-router-dom";

interface Service {
    id: string,
    img: string,
    title: string,
    text: string
}

export default function ServiceSection() {

    const services: Service[] = [
        { 
            id: "01", 
            img: "/public_images/home_icon.png", 
            title: "Drywall Installation", 
            text: "Professional hanging and framing — ensuring structural integrity and precision alignment for interior walls in both homes and commercial buildings."
        },
        { 
            id: "02", 
            img: "/public_images/bolt_icon.png", 
            title: "Drywall Repair", 
            text: "Seamless patching and restoration — fixing cracks, holes, and moisture damage to return surfaces to their original, flawless condition efficiently."
        },
        { 
            id: "03", 
            img: "/public_images/wrench_icon.png", 
            title: "Drywall Finishing", 
            text: "Level 4 and 5 surface preparation — creating ultra-smooth, paint-ready textures through meticulous sanding and high-quality compound application."
        },
        { 
            id: "04", 
            img: "/public_images/toolbox_icon.png", 
            title: "Taping & Mudding", 
            text: "Expert joint reinforcement — applying multi-layer compound and tape to eliminate visible seams and provide a perfectly flat, durable foundation."
        },
        { 
            id: "05", 
            img: "/public_images/door_icon.png", 
            title: "Skim Coats", 
            text: "Full-surface veneer plastering — applying a thin, consistent layer of mud to hide imperfections and provide a premium, gallery-grade wall finish."
        },
        { 
            id: "06", 
            img: "/public_images/hammer_icon.png", 
            title: "Commercial Drywall Services", 
            text: "Large-scale partition systems — delivering high-volume installation and fire-rated assemblies for offices, retail spaces, and industrial complexes."
        },
    ];

    return (
        <section className="bg-[#131313] text-white py-20 px-6 md:px-12 lg:px-24 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-0.5 w-8 bg-[#C8102E]"></div>
                            <span className="text-xs uppercase tracking-widest text-[#C8102E] sub-font font-bold">What We Do</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl main-font font-bold leading-tight">Six Specialties, <br />
                            <span className="italic text-[#C8102E]">One Trusted Platform</span>
                        </h2>
                    </div>

                    <Link to="/services" className="flex items-center gap-2 border border-[#333333] px-6 py-3 rounded-sm sub-font cursor-pointer hover:bg-[#161616] hover:border-[#C8102E] transition-all duration-300 text-sm font-medium h-fit">View All Services →</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#333333]">
                    {services.map((service) => (
                        <div key={service.id} className="p-10 border-r border-b bg-[#1E1E1E] border-[#333333] relative group transition-all duration-200 hover:bg-[#161616] hover:border-[#C8102E]">
                            <span className="text-sm text-[#333333] main-font font-bold block mb-6">{service.id}</span>
                            <img src={service.img} className="mb-6 w-9 h-9" alt={service.title} />
                            <h3 className="text-xl font-serif mb-4 leading-tight main-font font-bold">{service.title}</h3>
                            <p className="text-[#A8A8A8] text-sm leading-relaxed mb-6 sub-font">{service.text}</p>
                            
                            <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                                <Link to="/services" className="text-[#C8102E] text-xs font-bold flex items-center gap-2 uppercase tracking-tighter sub-font">
                                    Learn More <span className="text-lg">→</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}