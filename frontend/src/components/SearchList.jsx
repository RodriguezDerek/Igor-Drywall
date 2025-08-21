import React, { useState } from "react";
import SearchDetails from "./SearchDetails";

export default function SearchList({ projects, onClose }) {
    const [openProjectIndex, setOpenProjectIndex] = useState(null);

    if (projects.length === 0) {
        return;
    }

    return (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-lg flex justify-center items-center px-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 custom-red-color-background text-white text-[12px] px-3 py-1 rounded-md plus-jakarta-500">Close</button>

                <h2 className="text-xl plus-jakarta-700 mb-4 text-center">Project Results</h2>

                <div className="max-h-[60vh] overflow-y-auto space-y-4">
                    {projects.map((project, index) => (
                        <div key={index} className="border border-gray-300 rounded-md p-4 shadow-sm">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="plus-jakarta-700 text-lg">{project.name}</h3>
                                    <p className="text-sm text-gray-600 plus-jakarta-500"><span className="plus-jakarta-600">Address: </span>{project.address}</p>
                                    <p className="text-sm text-gray-600 plus-jakarta-500"><span className="plus-jakarta-600">Status: </span>{project.projectStatus}</p>
                                </div>

                                <button onClick={() => setOpenProjectIndex(index === openProjectIndex ? null : index)} className="plus-jakarta-500 custom-red-color-background text-white px-4 py-2 rounded-md">
                                    {index === openProjectIndex ? "Hide Details" : "View Details"}
                                </button>
                            </div>

                            {index === openProjectIndex && (
                                <div className="mt-4">
                                    <SearchDetails projectDetails={project} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
