import React from "react";

export default function JobDetailsPanel({ projects, date }) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="absolute bottom-full left-0 mb-1 bg-white p-3 rounded-md z-10 w-66 shadow-[0_0_15px_rgba(146,11,21,0.7)] animate-fadeIn">
            <h1 className="plus-jakarta-700 text-sm custom-red-color-text">Jobs for {months[date.getMonth()]} {date.getDate()}</h1>
            
            {projects.map((project, index) => (
                <div key={index} className="bg-red-200 rounded-md border-l-3 border-[#920B15] my-2">
                    <p className="text-sm text-black plus-jakarta-600 px-2 pt-2 pb-1">{project.name}</p>
                    <p className="text-xs text-black px-2 plus-jakarta-600">Address: <span className="text-gray-600 plus-jakarta-500">{project.address}</span></p>
                    <p className="text-xs text-black px-2 plus-jakarta-600 pb-3">Team: <span className="text-gray-600 plus-jakarta-500">{project.team}</span></p>
                </div>
            ))}

            <hr className="border-0 h-px mt-2 bg-[#920B15]" />

        </div>
    );
}
