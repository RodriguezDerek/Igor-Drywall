interface Value {
    number: string;
    title: string;
    description: string;
}

const values: Value[] = [
    {
        number: "01",
        title: "Precision Finishing",
        description: "We specialize in Level 5 finishes. Our team ensures every joint, corner, and surface is perfectly smooth and ready for the most demanding lighting conditions.",
    },
    {
        number: "02",
        title: "Dust Containment",
        description: "We treat your space like our own. Our crews use advanced HEPA filtration and strict masking protocols to keep your job site or home clean throughout the sanding process.",
    },
    {
        number: "03",
        title: "Structural Integrity",
        description: "Proper hanging is the foundation of a great finish. We use premium materials and precise fastening patterns to prevent pops, cracks, and future sagging.",
    },
    {
        number: "04",
        title: "Schedule Reliability",
        description: "We understand that drywall is the gateway to all other interior trades. We hit our milestones so your painters and trim carpenters can stay on track.",
    },
    {
        number: "05",
        title: "Transparent Estimating",
        description: "No hidden fees or 'material surprises.' Our quotes are based on detailed takeoffs, ensuring you know the exact cost before the first board is hung.",
    },
    {
        number: "06",
        title: "Trade Accountability",
        description: "We take full ownership of our work. If a defect is found, we don't argue—we fix it. Our reputation is built on standing behind every square foot we finish.",
    }
];

export default function CoreValues() {
    return (
        <section className="bg-[#131313] border-b border-b-[#333333] text-white py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10 space-y-4">
                    <p className="text-[#C8102E] uppercase tracking-[0.3em] text-[10px] sub-font font-bold">What We Stand For</p>
                    <h2 className="text-5xl md:text-6xl main-font font-semibold">Our Core Values</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#1A1A1A]">
                    {values.map((value, index) => (
                        <div key={index} className={`p-12 border border-[#1A1A1A] relative group transition-all duration-300 hover:bg-[#171717]`}>
                            <div className="space-y-8">
                                <span className="text-[#444444] main-font text-sm">[ {value.number} ]</span>
                                
                                <div className="space-y-4">
                                    <h3 className="text-2xl sub-font font-bold tracking-tight">{value.title}</h3>
                                    <p className="text-[#888888] sub-font leading-relaxed text-sm">{value.description}</p>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-500 group-hover:w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}