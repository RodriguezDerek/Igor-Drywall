import React, { act } from "react";
import { useState, useEffect } from "react";
import { isTokenExpired, getUserRole } from "../util/auth";
import DashboardNavbar from "../components/DashboardNavbar";
import ProfileIcon from "../components/ProfileIcon";
import AddProjectModal from "../components/AddProjectModal";
import ErrorToast from '../components/ErrorToast';
import SuccessToast from '../components/SuccessToast';

function CurrentProjects(){
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [activeStatus, setActiveStatus] = useState("Upcoming");
    const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
    const [projects, setProjects] = useState([]);

    const status = [
        { key: "Upcoming", count: projects.filter(p => p.projectStatus === "Upcoming").length },
        { key: "In-Progress", count: projects.filter(p => p.projectStatus === "In-Progress").length },
        { key: "Completed", count: projects.filter(p => p.projectStatus === "Completed").length }
    ];

    const filteredProjects = projects.filter(
        project => project.projectStatus === activeStatus
    );

    async function getProjects(){
        try{
            const response = await fetch("http://localhost:8080/api/v1/project/projects", {
                method: "GET",
                headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            })

            if(response.status === 401) {
                localStorage.clear();
                window.location.href = "/home";
                return
            }

            if(response.ok) {
                const data = await response.json();
                setProjects(data);
                console.log(data)
                console.log(filteredProjects)
                setSuccessMessage(data.message);
                setErrorMessage("")

            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message)
                setSuccessMessage("");
            }

        } catch(error) {
            console.error("Add Project error:", error);
            if (error instanceof TypeError || error.name === "TypeError" || error.name === "NetworkError") {
                setErrorMessage("Network error: please check your connection.");
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
            setSuccessMessage(""); 
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

        getProjects();
    }, []);

    return(
        <>
            <div className="flex">
                {/* Sidebar */}
                <DashboardNavbar />

                {/* Right side (header + content) */}
                <div className="flex flex-col w-full ml-[280px]">
                    
                    {/* Header */}
                    <div className="w-full h-20 flex items-center justify-between px-6 py-2 bg-white border-b border-gray-200">
                        <h1 className="text-[18px] font-semibold text-gray-800">Current Projects</h1>
                        <ProfileIcon />
                    </div>

                    {/* Content */}
                    <div className="bg-gray-100 min-h-screen p-10">
                        <div className="mb-2">
                            <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
                            <p className="text-sm font-normal text-gray-700 pt-1">Current and upcoming drywall jobs at a glance.</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm mt-4 h-20 px-4">
                            <div className="flex items-center justify-between h-full pl-2 pr-2">
                                <div className="flex space-x-6">
                                    {status.map(s => (
                                        <button key={s.key} onClick={() => setActiveStatus(s.key)} className={`group cursor-pointer pb-2 font-medium transition ${activeStatus === s.key ? "text-red-700 border-b-2 border-red-700" : "text-gray-500 hover:text-red-700 hover:border-b-2 hover:border-red-700"}`}>
                                            {s.key}
                                            <span className={`ml-1 text-xs rounded px-1 transition ${activeStatus === s.key ? "bg-red-700 text-white" : "bg-gray-200 text-gray-600 group-hover:bg-red-700 group-hover:text-white"}`}>
                                                {s.count}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {getUserRole() === "ADMIN" && <button onClick={() => setIsAddProjectOpen(!isAddProjectOpen)} className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">+ Add Project</button>}
                            </div>
                        </div>

                        {isAddProjectOpen && <AddProjectModal onClose={()=>setIsAddProjectOpen(false)} refreshProjects={getProjects}/>}
                            
                        <div className="pt-7 flex flex-wrap gap-4">
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map(project => (
                                    <div key={project.id} className="bg-white w-[296px] h-[300px] rounded-xl p-5 flex flex-col justify-between shadow-md">
                                        <div>
                                            <h1 className="text-base font-semibold mb-3">{project.name}</h1>
                                            <h3 className="text-sm text-gray-600">Address</h3>
                                            <p className="text-sm mb-3 font-medium">{project.address}</p>
                                            <h3 className="text-sm text-gray-600">Client Name</h3>
                                            <p className="text-sm mb-3 font-medium">{project.clientName}</p>
                                            <h3 className="text-sm text-gray-600">Start Date</h3>
                                            <p className="text-sm font-medium">{project.startDate}</p>
                                        </div>

                                        <div className="flex gap-3 mt-4">
                                            {getUserRole() === "ADMIN" ? (
                                                <>
                                                    <button className="cursor-pointer bg-red-800 text-white py-1.5 px-5 rounded-md text-sm hover:bg-red-900 transition w-32 font-semibold">Delete</button>
                                                    <button className="cursor-pointer bg-red-800 text-white py-1.5 px-5 rounded-md text-sm hover:bg-red-900 transition w-32 font-semibold">View Details</button>
                                                </>
                                            ) : (
                                                <button className="cursor-pointer bg-red-800 text-white py-1.5 px-5 rounded-md text-sm hover:bg-red-900 transition w-64 font-semibold">View Details</button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No projects found for {activeStatus}.</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
            <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
            <SuccessToast message={successMessage} onClose={() => setSuccessMessage("")} />
        </>
    );
}
export default CurrentProjects;