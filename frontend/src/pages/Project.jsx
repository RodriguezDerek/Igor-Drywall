import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProjectGallery from "../components/ProjectGallery";
import Footer from "../components/Footer";

function Project() {
  const [activeModal, setActiveModal] = useState(null);

  const projects = [
  {
    title: "The Hawthorne Residence",
    description: "Full drywall installation for a new home. Smooth finish throughout bedrooms, hallways, and main living space.",
    location: "Westbrook, CT",
    date: "03/05/2024 - 03/22/2024",
    image: "/project_images/project1.webp",
    images: ["/images/pic1.jpeg", "/images/pic2.jpeg", "/images/pic3.jpeg", "/images/pic4.jpeg"]
  },
  {
    title: "Modern Farmhouse Build",
    description: "Installed drywall and achieved a seamless finish in all interior living spaces with a vaulted ceiling.",
    location: "Old Saybrook, CT",
    date: "01/10/2024 - 01/25/2024",
    image: "/project_images/project2.webp",
    images: ["/images/pic1.jpeg", "/images/pic2.jpeg", "/images/pic3.jpeg", "/images/pic4.jpeg"]
  },
  {
    title: "Downtown Office Renovation",
    description: "Complete drywall and ceiling renovation for a commercial space in downtown Hartford.",
    location: "Hartford, CT",
    date: "02/01/2024 - 02/15/2024",
    image: "/project_images/project3.webp",
    images: ["/images/pic1.jpeg", "/images/pic2.jpeg", "/images/pic3.jpeg", "/images/pic4.jpeg"]
  },
  {
    title: "Luxury Condo Units",
    description: "Drywall finishing for 12 high-end condo units, including curved walls and recessed lighting areas.",
    location: "New Haven, CT",
    date: "03/01/2024 - 04/01/2024",
    image: "/project_images/project1.webp",
    images: ["/images/pic1.jpeg", "/images/pic2.jpeg", "/images/pic3.jpeg", "/images/pic4.jpeg"]
  },
  {
    title: "Riverside Cabin Remodel",
    description: "Upgraded insulation and drywall in a rustic cabin with exposed beams and custom cuts.",
    location: "Chester, CT",
    date: "02/20/2024 - 03/05/2024",
    image: "/project_images/project2.webp",
    images: ["/images/pic1.jpeg", "/images/pic2.jpeg", "/images/pic3.jpeg", "/images/pic4.jpeg"]
  },
  {
    title: "Historic Townhouse Refinish",
    description: "Restored plaster and added drywall accents in a 19th-century townhouse preservation project.",
    location: "Essex, CT",
    date: "01/15/2024 - 01/30/2024",
    image: "/project_images/project3.webp",
    images: ["/images/pic1.jpeg", "/images/pic2.jpeg", "/images/pic3.jpeg", "/images/pic4.jpeg"]
  },
  {
    title: "Modern Office Buildout",
    description: "Installed drywall and acoustic ceiling tiles in a multi-suite office complex with open floor plans.",
    location: "Hartford, CT",
    date: "04/10/2024 - 05/02/2024",
    image: "/project_images/project3.webp",
    images: ["/images/pic1.jpeg", "/images/pic2.jpeg", "/images/pic3.jpeg", "/images/pic4.jpeg"]
  },
  {
    title: "Coastal Home Renovation",
    description: "Replaced outdated drywall and applied moisture-resistant finishes in a beachside property.",
    location: "Old Saybrook, CT",
    date: "03/25/2024 - 04/15/2024",
    image: "/project_images/project2.webp",
    images: ["/images/pic1.jpeg", "/images/pic2.jpeg", "/images/pic3.jpeg", "/images/pic4.jpeg"]
  },
  {
    title: "Retail Space Expansion",
    description: "Constructed new partitions and completed seamless drywall finishing in a commercial storefront.",
    location: "Branford, CT",
    date: "02/05/2024 - 02/25/2024",
    image: "/project_images/project1.webp",
    images: ["/images/pic1.jpeg", "/images/pic2.jpeg", "/images/pic3.jpeg", "/images/pic4.jpeg"]
  }];

  return (
    <>
      <Navbar />

      <div className="flex flex-col justify-center items-center pt-12 text-center px-4 slide-up">
        <p className="custom-red-color-text text-sm pb-2 plus-jakarta-700">Projects</p>
        <h1 className="font-bold text-4xl plus-jakarta-800">Take a Closer Look at the Work We've <br/> Delivered for Clients Like You</h1>
      </div>

      <section className="px-4 py-10 bg-white pb-20 slide-up">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img src={project.image} alt="The Hawthorne Residence" className="w-full h-48 object-cover rounded-t-xl" />
            <div className="p-4">
              <h2 className="text-lg plus-jakarta-700">{project.title}</h2>
              <p className="text-sm text-gray-600 mt-1 plus-jakarta-400">{project.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a1 1 0 001.414 0l4.243-4.243a1 1 0 000-1.414z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="plus-jakarta-400">{project.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="plus-jakarta-400">{project.date}</span>
                </div>
              </div>
              <button onClick={() => setActiveModal(index)} className="cursor-pointer custom-red-color-font plus-jakarta-700 text-sm mt-3 inline-flex items-center gap-1">View More<span className="ml-1">→</span></button>
            </div>
          </div>
        ))}

        </div>
      </section>

      {/* Modal */}
      {activeModal !== null && (
        <ProjectGallery
          project={projects[activeModal]}
          isOpen={true}
          onClose={() => setActiveModal(null)}
        />
      )}

      <Footer />
    </>
  );
}
export default Project;