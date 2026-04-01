interface ServiceType {
    title: string;
    description: string;
    icon: string;
    features: string[];
}

const serviceDetails: ServiceType[] = [
    {
        title: "Drywall Installation",
        description: "Professional hanging for new builds and renovations. We ensure structural precision and optimal board layout to minimize seams.",
        features: ["New home construction", "Basement finishing", "Additions & extensions", "Large-scale commercial hanging"],
        icon: "/public_images/wrench_icon.png"
    },
    {
        title: "Drywall Repair",
        description: "Expert restoration for damaged surfaces. From water damage to accidental holes, we make the imperfections disappear completely.",
        features: ["Water damage restoration", "Stress crack repair", "Patching & hole repair", "Texture matching"],
        icon: "/public_images/hammer_icon.png"
    },
    {
        title: "Drywall Finishing & Taping",
        description: "The art of the perfect surface. We provide smooth, high-quality taping and mudding ready for any paint or wallcovering.",
        features: ["Level 4 & Level 5 finishing", "Joint reinforcement", "Corner bead installation", "Sanding & dust control"],
        icon: "/public_images/toolbox_icon.png"
    },
    {
        title: "Taping & Mudding",
        description: "Multi-stage compound application that ensures seamless transitions between boards for a monolithic wall appearance.",
        features: ["Hand & tool taping", "Base coat application", "Skim coating", "Surface smoothing"],
        icon: "/public_images/drywall_icon.png"
    },
    {
        title: "Ceiling Drywall & Repairs",
        description: "Specialized overhead work including repair, installation, and modernizing dated ceiling textures.",
        features: ["Popcorn ceiling removal", "Sagging ceiling repair", "Coffered ceiling drywall", "Overhead patching"],
        icon: "/public_images/roofing_icon.png"
    },
    {
        title: "Commercial Drywall Services",
        description: "High-volume, efficient services tailored for office fit-outs, retail spaces, and industrial properties.",
        features: ["Steel stud framing", "Fire-rated assemblies", "Soundproofing (STC)", "High-wall installations"],
        icon: "/public_images/door_icon.png"
    }
];

export default function ServiceDetail() {
    return (
        <section className="bg-[#111111] border-b border-b-[#333333] text-white py-24 px-6">
            <div className="max-w-7xl mx-auto">

                <div className="flex items-center gap-4 mb-16">
                    <div className="h-px w-8 bg-[#C8102E]"></div>
                    <span className="uppercase tracking-widest text-xs sub-font font-semibold text-[#C8102E]">Service Details</span>
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {serviceDetails.map((service, index) => (
                        <div key={index} className="p-10 border border-[#333333] bg-[#171717] group transition-all duration-500 hover:bg-[#212121] hover:border-l-[#C8102E] hover:border-l-2 hover:border-t-[#C8102E] relative">
                            <div className="w-12 h-12 bg-red-900/20 border border-[#C8102E] rounded-sm mb-8 flex items-center justify-center transition-transform duration-300 group-hover:-rotate-12">
                                <img src={service.icon} alt={service.title} className="w-6 h-6"/>
                            </div>

                            <h3 className="text-xl main-font font-bold mb-4">{service.title}</h3>
                            <p className="text-[#7A7A7A] text-sm sub-font leading-relaxed mb-8">{service.description}</p>

                            <ul className="space-y-3">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 sub-font text-xs text-[#7A7A7A]">
                                        <span className="text-[#C8102E] mt-0.5">—</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}