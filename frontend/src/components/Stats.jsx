import React from "react";
import { calculatePercentageChange } from "../util/auth";

export default function Stats({ stats }) {
    if (!stats) return null;

    return (
        <div className="flex gap-6 mt-6 ml-6 h-36">
            {/* Jobs This Week */}
            <div className="bg-white p-4 rounded-xl w-94 flex justify-evenly items-center">
                <div>
                    <h1 className="text-2xl font-bold">{stats.projectsThisWeek}</h1>
                    <p className="font-semibold">Current Jobs This Week</p>
                    <div className="flex items-center mt-1">
                        {calculatePercentageChange(stats.projectsLastWeek, stats.projectsThisWeek) !== 0 && (
                            <img
                                src={
                                    calculatePercentageChange(stats.projectsLastWeek, stats.projectsThisWeek) > 0
                                        ? "/dashboard/greenarrow.png"
                                        : "/dashboard/redarrow.png"
                                }
                                className="w-2 h-2 mr-1"
                            />
                        )}
                        <p className="text-[14px]">
                            {calculatePercentageChange(stats.projectsLastWeek, stats.projectsThisWeek) === 0
                                ? "No Change"
                                : `${Math.abs(calculatePercentageChange(stats.projectsLastWeek, stats.projectsThisWeek))}% ${
                                    calculatePercentageChange(stats.projectsLastWeek, stats.projectsThisWeek) > 0
                                        ? "Higher"
                                        : "Lower"
                                }`}
                        </p>
                    </div>
                </div>
                <div className="p-5 custom-red-color-bg rounded-lg">
                    <img src="/dashboard/calendar.png" className="w-7 h-7" />
                </div>
            </div>

            {/* Jobs Finished This Month */}
            <div className="bg-white p-4 rounded-xl w-94 flex justify-evenly items-center">
                <div>
                    <h1 className="text-2xl font-bold">{stats.projectsCompletedThisMonth}</h1>
                    <p className="font-semibold">Jobs Finished This Month</p>
                    <div className="flex items-center mt-1">
                        {calculatePercentageChange(stats.projectsCompletedLastMonth, stats.projectsCompletedThisMonth) !== 0 && (
                            <img
                                src={
                                    calculatePercentageChange(stats.projectsCompletedLastMonth, stats.projectsCompletedThisMonth) > 0
                                        ? "/dashboard/greenarrow.png"
                                        : "/dashboard/redarrow.png"
                                }
                                className="w-2 h-2 mr-1"
                            />
                        )}
                        <p className="text-[14px]">
                            {calculatePercentageChange(stats.projectsCompletedLastMonth, stats.projectsCompletedThisMonth) === 0
                                ? "No Change"
                                : `${Math.abs(calculatePercentageChange(stats.projectsCompletedLastMonth, stats.projectsCompletedThisMonth))}% ${
                                    calculatePercentageChange(stats.projectsCompletedLastMonth, stats.projectsCompletedThisMonth) > 0
                                        ? "Higher"
                                        : "Lower"
                                }`}
                        </p>
                    </div>
                </div>
                <div className="p-5 custom-red-color-bg rounded-lg">
                    <img src="/dashboard/checkmark.png" className="w-7 h-7" />
                </div>
            </div>

            {/* Number of Employees */}
            <div className="bg-white p-4 rounded-xl w-94 flex justify-evenly items-center">
                <div>
                    <h1 className="text-2xl font-bold">{stats.numberOfWorkers}</h1>
                    <p className="font-semibold">Number of Employees</p>
                    {/* No percentage change shown here */}
                </div>
                <div className="p-5 custom-red-color-bg rounded-lg">
                    <img src="/dashboard/people.png" className="w-7 h-7" />
                </div>
            </div>

            {/* Jobs for Next Week */}
            <div className="bg-white p-4 rounded-xl w-94 flex justify-evenly items-center">
                <div>
                    <h1 className="text-2xl font-bold">{stats.projectsNextWeek}</h1>
                    <p className="font-semibold">Jobs for Next Week</p>
                    <div className="flex items-center mt-1">
                        {calculatePercentageChange(stats.projectsThisWeek, stats.projectsNextWeek) !== 0 && (
                            <img
                                src={
                                    calculatePercentageChange(stats.projectsThisWeek, stats.projectsNextWeek) > 0
                                        ? "/dashboard/greenarrow.png"
                                        : "/dashboard/redarrow.png"
                                }
                                className="w-2 h-2 mr-1"
                            />
                        )}
                        <p className="text-[14px]">
                            {calculatePercentageChange(stats.projectsThisWeek, stats.projectsNextWeek) === 0
                                ? "No Change"
                                : `${Math.abs(calculatePercentageChange(stats.projectsThisWeek, stats.projectsNextWeek))}% ${
                                    calculatePercentageChange(stats.projectsThisWeek, stats.projectsNextWeek) > 0
                                        ? "Higher"
                                        : "Lower"
                                }`}
                        </p>
                    </div>
                </div>
                <div className="p-5 custom-red-color-bg rounded-lg">
                    <img src="/dashboard/arrows.png" className="w-7 h-7" />
                </div>
            </div>
        </div>
    );
}
