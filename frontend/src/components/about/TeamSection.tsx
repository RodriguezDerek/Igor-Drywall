interface TeamMember {
    name: string;
    role: string;
    bio: string;
    initialColor: string;
}

const members: TeamMember[] = [
    {
        name: "Igor Rodriguez",
        role: "FOUNDER & CEO",
        bio: "20 years in roofing and general contracting. Built FieldCraft to fix what was broken in the trades industry.",
        initialColor: "bg-[#C8102E]"
    },
    {
        name: "Marcus Chen",
        role: "EMPLOYEE",
        bio: "Specializes in high-end finish carpentry and custom cabinetry. Brings a meticulous eye for detail to every interior project.",
        initialColor: "bg-[#555555]"
    },
    {
        name: "Sarah Jenkins",
        role: "EMPLOYEE",
        bio: "Expert site foreman with a background in structural engineering. Ensures every build exceeds local safety and quality codes.",
        initialColor: "bg-[#777777]"
    },
    {
        name: "David Okafor",
        role: "EMPLOYEE",
        bio: "Lead electrician and smart-home integration specialist. Dedicated to modernizing residential systems with efficient technology.",
        initialColor: "bg-[#B1B1B1]"
    }
]

export default function TeamSection() {
    return (
        <section className="bg-[#121212] border-b border-b-[#333333] text-white py-20 px-6">
            <div className="max-w-7xl mx-auto">
                
                <div className="mb-12 space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="h-px w-8 bg-[#C8102E]"></div>
                        <span className="uppercase tracking-widest text-xs sub-font font-bold text-[#C8102E]">Our Leadership</span>
                    </div>
                    <h2 className="text-5xl main-font font-bold">Meet the Team</h2>
                </div>

                <div className="bg-[#1E1E1E] rounded-sm overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#333333]">
                        {members.map((member, index) => (
                            <div key={index} className="p-10 flex flex-col items-center text-center space-y-6 min-h-60">
                                <div className={`${member.initialColor} w-20 h-20 rounded-full flex items-center justify-center shadow-inner`}>
                                    <span className="text-2xl main-font font-bold">{member.name.charAt(0)}</span>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xl main-font font-bold">{member.name}</h3>
                                    <p className="text-red-700 text-xs sub-font font-bold tracking-widest uppercase">{member.role}</p>
                                </div>

                                <p className="text-[#888888] text-sm leading-relaxed">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}