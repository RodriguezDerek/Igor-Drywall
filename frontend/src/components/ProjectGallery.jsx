import React from 'react';

function ProjectGallery({ project, onClose, isOpen }) {

    if(!isOpen || !project) return null;

    return(
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/30">
            <div className="animate-fadeIn bg-white rounded-xl p-6 max-w-2xl w-full relative shadow-xl">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl">&times;</button>
                <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                <h2 className="text-xl font-bold">{project.title}</h2>
                <p className="text-gray-700 mt-2">{project.description}</p>
                <div className="text-sm text-gray-500 mt-4">
                    <p><strong>Location:</strong> {project.location}</p>
                    <p><strong>Date:</strong> {project.date}</p>
                </div>
            </div>
        </div>
    );
}
export default ProjectGallery;