import React from "react";
import { useState, useEffect } from "react";
import { isTokenExpired, getUserId, authFetch } from "../util/auth";
import DashboardNavbar from "../components/DashboardNavbar";
import ProfileIcon from "../components/ProfileIcon";
import Stats from "../components/Stats";
import ErrorToast from '../components/ErrorToast';
import SuccessToast from '../components/SuccessToast';
import ProjectGraph from "../components/ProjectGraph";
import Search from "../components/Search";
import RecentProject from "../components/RecentProject";
import ProjectProgession from "../components/calendar/ProjectProgression";

function Overview(){
    const [dashboardData, setDashboardData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    async function getDashboardInfo(){
        try {
            const data = await authFetch("http://localhost:8080/api/v1/project/projects/dashboard", {
                method: "GET"
            })

            setDashboardData(data);
            setErrorMessage("");

        } catch(error) {
            console.log("Get Dashboard Info Error: ", error);

        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token || isTokenExpired(token)){
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("role");
            window.location.href = "/home";
        }

        getDashboardInfo();
    }, []);

    return(
        <>
            <div className="flex bg-gray-100 min-h-screen">
                {/* Sidebar */}
                <DashboardNavbar />

                {/* Right side (header + content) */}
                <div className="flex flex-col w-full ml-[280px]">
                    
                    {/* Header */}
                    <div className="w-full h-20 flex items-center justify-between px-6 py-2 bg-white border-b border-gray-200">
                        <h1 className="text-[18px] font-semibold text-gray-800">Overview</h1>
                        <ProfileIcon />
                    </div>

                    <Stats stats={dashboardData}/>

                    <ProjectGraph />

                    <div className="flex mt-6 ml-6 mr-10 gap-6">
                        <Search />

                        <div className="flex flex-col gap-6">
                            <RecentProject stats={dashboardData}/>
                            <ProjectProgession stats={dashboardData}/>
                        </div>
                    </div>


                </div>
            </div>
            <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
            <SuccessToast message={successMessage} onClose={() => setSuccessMessage("")} />
        </>
    );
}
export default Overview