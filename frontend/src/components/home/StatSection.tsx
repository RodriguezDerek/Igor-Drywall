interface Stat {
    value: string;
    label: string;
}

export default function StatSection() {

    const stats : Stat[] = [
        { value: "1,200+", label: "JOBS COMPLETED" },
        { value: "98%", label: "ON-TIME RATE" },
        { value: "4.9 ★", label: "AVERAGE RATING" },
        { value: "11", label: "TRAINED PROFESSIONALS" },
        { value: "$0", label: "NO QUOTE FEE" },
    ];

    return (
        <section className="bg-[#C8102E] py-12 px-4">
            <div className="mx-auto flex flex-wrap justify-center items-center gap-y-8">
                {stats.map((stat, index) => (
                    <div key={index} className="flex items-center">
                        {/* Stat Content */}
                        <div className="flex flex-col items-center px-18 text-center">
                            <span className="text-4xl md:text-5xl font-bold main-font text-white mb-2 tracking-tight">{stat.value}</span>
                            <span className="text-[10px] md:text-xs font-medium sub-font text-white/90 tracking-[0.15em]">{stat.label}</span>
                        </div>

                        {/* Vertical Divider (hidden on the last item and on small screens if wrapped) */}
                        {index !== stats.length - 1 && (
                           <div className="hidden md:block h-16 w-px bg-white" />
                        )}
                    </div>
                ))}
            </div>
        </section>
      );
}