interface Project {
    title: string;
    description: string;
    img: string;
}

const projects: Project[] = [
    {
        title: "Smith Project",
        description: "Roofing · Residential · 14 Elm Street",
        img: "/public_images/house_image_1.jpg"
    },
    {
        title: "Johnson Renovation",
        description: "Kitchen Remodel · Residential · 22 Maple Avenue",
        img: "/public_images/house_image_2.jpg"
    },
    {
        title: "Williams Build",
        description: "New Construction · Residential · 101 Oak Lane",
        img: "/public_images/house_image_3.webp"
    },
    {
        title: "Brown Expansion",
        description: "Home Extension · Residential · 45 Pine Street",
        img: "/public_images/house_image_4.avif"
    },
    {
        title: "Jones Project",
        description: "Roof Replacement · Residential · 78 Cedar Road",
        img: "/public_images/house_image_5.jpg"
    },
    {
        title: "Garcia Remodel",
        description: "Bathroom Renovation · Residential · 32 Birch Avenue",
        img: "/public_images/house_image_6.jpeg"
    },
    {
        title: "Miller Construction",
        description: "Garage Build · Residential · 56 Spruce Street",
        img: "/public_images/house_image_7.webp"
    },
    {
        title: "Davis Upgrade",
        description: "Solar Panels · Residential · 89 Willow Drive",
        img: "/public_images/house_image_8.webp"
    },
    {
        title: "Rodriguez Project",
        description: "Deck Installation · Residential · 12 Chestnut Lane",
        img: "/public_images/house_image_9.jpeg"
    }
];

export default function GalleryView() {
    return (
        <section className="bg-[#121212] py-12 px-4 md:px-8 border-b border-t border-[#333333]">
            <div className="max-w-7xl mx-auto">
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-6">
                    {projects.map((project, index) => (
                        <div key={index} className="break-inside-avoid bg-[#1a1a1a] border border-[#333333] rounded-lg overflow-hidden transition-all duration-300 hover:brightness-110">
                            <div className="relative overflow-hidden h-50">
                                <img src={project.img} alt={project.title} className="w-full h-full object-cover filter grayscale-15 contrast-[1.08] brightness-[0.6]"/>
                                <div className="absolute inset-0 bg-black/10" />
                            </div>

                            <div className="bg-[#171717] border border-[#333333] p-4">
                                <h3 className="text-white font-bold sub-font text-base tracking-tight mb-1">{project.title}</h3>
                                <p className="text-[#7A7A7A] text-sm sub-font font-normal">{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}