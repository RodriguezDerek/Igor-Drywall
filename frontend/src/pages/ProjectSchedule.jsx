import React from "react";
import { useState, useEffect } from "react";
import { isTokenExpired, authFetch } from "../util/auth";
import DashboardNavbar from "../components/DashboardNavbar";
import ProfileIcon from "../components/ProfileIcon";
import Calendar from "../components/calendar/Calendar";
import ErrorToast from "../components/ErrorToast";

function ProjectSchedule(){
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-11
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [monthlyProjects, setMonthlyProjects] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    async function getMonthlyJobs(month, year){
        try{
            const data = await authFetch(`http://localhost:8080/api/v1/project/projects/schedule?year=${year}&month=${month}`, {
                method: "GET"
            });

            setMonthlyProjects(data);
            setErrorMessage("");


        } catch(error) {
            console.log("Get Monthly Project Error: ", error);
            setErrorMessage(error.message);
        }
    }

    function goToPreviousMonth() {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear((prev) => prev - 1);
        } else {
            setCurrentMonth((prev) => prev - 1);
        }
    }

    function goToNextMonth() {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear((prev) => prev + 1);
        } else {
            setCurrentMonth((prev) => prev + 1);
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

        getMonthlyJobs(currentMonth + 1, currentYear); 
    }, [currentMonth, currentYear]); 

    return(
        <>
            <div className="flex bg-gray-100 min-h-screen">
                {/* Sidebar */}
                <DashboardNavbar />

                {/* Right side (header + content) */}
                <div className="flex flex-col w-full ml-[280px]">
                    
                    {/* Header */}
                    <div className="w-full h-20 flex items-center justify-between px-6 py-2 bg-white border-b border-gray-200">
                        <h1 className="text-[18px] font-semibold text-gray-800">Project Schedule</h1>
                        <ProfileIcon />
                    </div>

                    {/* Calendar goes here */}
                    <div className="p-6">
                        <Calendar projects={monthlyProjects} year={currentYear} month={currentMonth} onPrev={goToPreviousMonth} onNext={goToNextMonth}/>
                    </div>

                </div>
            </div>
            <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
        </>
    );
}
export default ProjectSchedule