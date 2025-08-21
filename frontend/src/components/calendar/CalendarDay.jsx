import React, { useState } from "react";
import JobDetailsPanel from "./JobDetailsPanel";

export default function CalendarDay({ date, projects, isCurrentMonth }) {
    const [hovered, setHovered] = useState(false);

    if (!date) return <div className="h-24"></div>;

    const iso = date.toISOString().split("T")[0];
    const day = date.getDate();
    const projectsForDay = projects.filter(p => p.date === iso);
    const hasProjects = projectsForDay.length > 0;

    return (
        <div className={`relative border border-gray-400 rounded-xl h-24 p-2 text-md cursor-pointer transition-colors duration-150 ease-in ${isCurrentMonth ? "bg-white" : "bg-white text-gray-400"} ${hasProjects ? "hover:bg-[#920B15] hover:text-white" : ""}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            {/* Day Number */}
            <div className={`absolute top-2 left-2 plus-jakarta-700 ${hasProjects ? "custom-red-color-bg text-white px-1.5 py-0.5 rounded-sm cursor-pointer" : ""}`}>
                <p>{day < 10 ? `0${day}` : day}</p>
            </div>

            {/* Show JobDetailsPanel if hovered and has projects */}
            {hasProjects && hovered && <JobDetailsPanel projects={projectsForDay} date={date}/>}
        </div>
    );
}
