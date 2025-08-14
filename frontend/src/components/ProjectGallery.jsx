import React from 'react';

function ProjectGallery({ project, onClose, isOpen }) {
    if (!isOpen || !project) return null;

    return (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-lg flex justify-center items-center px-4">
            <div className="animate-fadeIn bg-white max-w-3xl w-full rounded-xl shadow-xl p-4 relative overflow-y-auto max-h-[90vh]">
                {/* Close Button */}
                <button onClick={onClose} className="duration-300 cursor-pointer m-3 absolute top-4 right-4 text-gray-800 text-2xl bg-white rounded-full w-9 h-9 flex items-center justify-center shadow hover:scale-110 transition-transform">&times;</button>

                {/* Main Image */}
                <div className="w-full h-52 mb-4 overflow-hidden rounded-lg shadow-md">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>

                {/* Header */}
                <div className="mb-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">{project.title}</h2>
                    <p className="text-gray-500 mt-1 text-sm">{project.location} &middot; {project.date}</p>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4 text-center max-w-2xl mx-auto">{project.description}</p>

                {/* Gallery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.images.map((src, idx) => (
                        <div key={idx} className="w-full h-40 overflow-hidden rounded-lg shadow-md">
                            <img src={src} alt={`Project Image ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProjectGallery;
