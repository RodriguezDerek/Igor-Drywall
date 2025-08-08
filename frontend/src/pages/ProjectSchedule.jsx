import React from "react";
import { useState, useEffect } from "react";
import { isTokenExpired, getUserId } from "../util/auth";
import DashboardNavbar from "../components/DashboardNavbar";
import ProfileIcon from "../components/ProfileIcon";

function ProjectSchedule(){

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token || isTokenExpired(token)){
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("role");
            window.location.href = "/home";
        }
    }, []);

    return(
        <div className="flex">
            {/* Sidebar */}
            <DashboardNavbar />

            {/* Right side (header + content) */}
            <div className="flex flex-col w-full ml-[280px]">
                
                {/* Header */}
                <div className="w-full h-20 flex items-center justify-between px-6 py-2 bg-white border-b border-gray-200">
                    <h1 className="text-[18px] font-semibold text-gray-800">Project Schedule</h1>
                    <ProfileIcon />
                </div>

            </div>
        </div>
    );
}
export default ProjectSchedule