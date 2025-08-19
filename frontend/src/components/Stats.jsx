import React from "react";

export default function Stats({ stats }){
    if (!stats) return null;

    return(
        <div className="flex gap-6 mt-6 ml-6 h-36">
            <div className="bg-white p-4 rounded-xl w-94 flex justify-evenly items-center">
                <div>
                    <h1 className="text-2xl font-bold">{stats.projectsThisWeek}</h1>
                    <p className="font-semibold">Current Jobs This Week</p>
                    <div className="flex items-center mt-1">
                        <img src="/dashboard/greenarrow.png" className="w-2 h-2 mr-1"/>
                        <p className="text-[14px]">34% Higher</p>
                    </div>
                </div>
                <div className="p-5 custom-red-color-bg rounded-lg">
                    <img src="/dashboard/calendar.png" className="w-7 h-7"/>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl w-94 flex justify-evenly items-center">
                <div>
                    <h1 className="text-2xl font-bold">{stats.projectsCompletedThisMonth}</h1>
                    <p className="font-semibold">Jobs Finished This Month</p>
                    <div className="flex items-center mt-1">
                        <img src="/dashboard/greenarrow.png" className="w-2 h-2 mr-1"/>
                        <p className="text-[14px]">26% Higher</p>
                    </div>
                </div>
                <div className="p-5 custom-red-color-bg rounded-lg">
                    <img src="/dashboard/checkmark.png" className="w-7 h-7"/>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl w-94 flex justify-evenly items-center">
                <div>
                    <h1 className="text-2xl font-bold">{stats.numberOfWorkers}</h1>
                    <p className="font-semibold">Number of Employees</p>
                    <div className="flex items-center mt-1">
                        <img src="/dashboard/greenarrow.png" className="w-2 h-2 mr-1"/>
                        <p className="text-[14px]">8% Higher</p>
                    </div>
                </div>
                <div className="p-5 custom-red-color-bg rounded-lg">
                    <img src="/dashboard/people.png" className="w-7 h-7"/>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl w-94 flex justify-evenly items-center">
                <div>
                    <h1 className="text-2xl font-bold">{stats.projectsNextWeek}</h1>
                    <p className="font-semibold">Jobs for Next Week</p>
                    <div className="flex items-center mt-1">
                        <img src="/dashboard/greenarrow.png" className="w-2 h-2 mr-1"/>
                        <p className="text-[14px]">44% Higher</p>
                    </div>
                </div>
                <div className="p-5 custom-red-color-bg rounded-lg">
                    <img src="/dashboard/arrows.png" className="w-7 h-7"/>
                </div>
            </div>
        </div>
    );
}