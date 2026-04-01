import { Link } from "react-router-dom";

interface ServiceType {
    name: string;
    icon: string;
    image: string;
}

const services: ServiceType[] = [
    { name: "INSTALLATION", icon: "/public_images/wrench_icon.png", image: "/public_images/service_installation_image.jpg" },
    { name: "REPAIR", icon: "/public_images/hammer_icon.png", image: "/public_images/service_repair_image.avif" },
    { name: "TAPING", icon: "/public_images/toolbox_icon.png", image: "/public_images/service_taping_image.jpg" },
    { name: "MUDDING", icon: "/public_images/drywall_icon.png", image: "/public_images/service_mudding_image.jpg" },
    { name: "CEILING", icon: "/public_images/roofing_icon.png", image: "/public_images/service_ceiling_image.jpeg" },
    { name: "COMMERICAL", icon: "/public_images/door_icon.png", image: "/public_images/service_commerical_image.jpeg" },
];

export default function ServicesList() {
    return (
        <section className="bg-[#111111] border-b border-b-[#333333] text-white py-24 px-6 md:py-32">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">                
                <div className="space-y-8 lg:max-w-xl">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-px w-8 bg-[#C8102E]"></div>
                            <span className="uppercase tracking-widest text-xs sub-font font-semibold text-[#C8102E]">What We Do</span>
                        </div>
                        <h2 className="text-[56px] main-font font-bold leading-tight">Six Trade Disciplines. One Platform.</h2>
                    </div>

                    <p className="text-[#A8A8A8] sub-font text-lg leading-relaxed">Whether it's a roof that's seen better days or a commercial office that needs a full electrical overhaul, we have the licensed professionals and the process to get it done right.</p>

                    <div className="pt-4">
                        <Link to="/quote" className="bg-[#C8102E] hover:bg-red-700 text-white px-7 py-3 text-[14px] rounded-md sub-font font-bold transition-colors inline-block text-center">Request a Free Quote</Link>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 rounded-lg overflow-hidden">                    
                    {services.map((service, index) => (
                        <div key={index} className="aspect-square relative group overflow-hidden">
                            <img src={service.image} alt={service.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />

                            <div className="absolute inset-0 bg-[#0A0A0A]/80 group-hover:bg-[#0A0A0A]/50 transition-colors duration-300 ease-out z-10" />

                            <div className="absolute bottom-6 left-6 flex flex-col items-start gap-2 z-20 pointer-events-none">
                                <img src={service.icon} className="w-6 h-6 mb-2 transition-transform duration-300 group-hover:rotate-25 hover:rotate-0" />                         
                                <span className="uppercase tracking-widest text-sm sub-font font-bold text-white">{service.name}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}