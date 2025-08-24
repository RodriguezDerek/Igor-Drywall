import React from "react";

export default function ProjectProgession({ stats }) {
    if (!stats) return null;

    const projectsCompleted = stats.totalProjectsCompleted;
    const projectsUnCompleted = stats.totalProjectsUnCompleted;
    const total = projectsCompleted + projectsUnCompleted;
    const completedPercentage = total > 0 ? (projectsCompleted / total) * 100 : 0;

    return (
        <div className="bg-white rounded-xl w-200 h-35 p-4 slide-in-right-medium-1">
            <h1 className="text-lg plus-jakarta-700 text-center mb-4">Jobs Completed</h1>

            <div className="w-[700px] mx-auto bg-gray-200 rounded-full h-6 overflow-hidden">
                <div className="custom-red-color-background h-full rounded-full transition-all duration-300 ease-in-out cursor-pointer" style={{ width: `${completedPercentage}%` }}></div>
            </div>

            <p className="text-center mt-2 text-sm text-gray-600 plus-jakarta-400">
                {projectsCompleted} of {total} jobs completed ({completedPercentage.toFixed(1)}%)
            </p>
        </div>
    );
}
