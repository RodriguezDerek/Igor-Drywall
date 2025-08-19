import React from "react";

export default function RecentProject({ stats }) {
    if (!stats) return null;

    const recentProject = stats.mostRecentProject;

    return (
        <div className="bg-white rounded-xl w-200 h-35 p-6 shadow-sm">
            <h1 className="text-lg font-semibold text-center mb-4">Most Recent Job</h1>

            <div className="grid grid-cols-3 text-center">
                <div>
                    <h2 className="text-sm font-medium text-black">Client</h2>
                    <p className="text-sm text-gray-600">{recentProject.clientName}</p>
                </div>

                <div>
                    <h2 className="text-sm font-medium text-black">Address</h2>
                    <p className="text-sm text-gray-600">{recentProject.address}</p>
                </div>

                <div>
                    <h2 className="text-sm font-medium text-black">Start Date</h2>
                    <p className="text-sm text-gray-600">
                        {recentProject.startDate || "No Project Date"}
                    </p>
                </div>
            </div>
        </div>
    );
}
