import { useEffect, useState } from "react";
import ErrorMessage from "../global/ErrorMessage";
import SuccessMessage from "../global/SuccessMessage";
import { Link } from "react-router-dom";

type ProjectTableDTO = {
    projectId: number;
    title: string;
    address: string;
    projectStatus: string;
    startDate: string;
    clientName: string;
}; 

export default function DashboardProjectTable() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [projectData, setProjectData] = useState<ProjectTableDTO[] | null>(null);

    async function getTableProjects() {
        try {
            const response = await fetch("http://localhost:8080/api/v1/projects/table", {
                method: "GET",
                credentials: "include"
            })

            if (response.ok) {
                const data: ProjectTableDTO[] = await response.json();
                setProjectData(data);
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");            
                setTimeout(() => setErrorMessage(null), 3000);
            }

        } catch (error) {
            console.error(error);
            setErrorMessage("An unexpected error occurred. Please try again.");            
            setTimeout(() => setErrorMessage(null), 3000);
        }
    }

    async function deleteProject(projectId: number) {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/projects/project/${projectId}`, {
                method: "DELETE",
                credentials: "include"
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
                setTimeout(() => setSuccessMessage(null), 3000);
            } else {
                setErrorMessage(data.message);            
                setTimeout(() => setErrorMessage(null), 3000);
            }

        } catch (error) {
            console.error(error);
            setErrorMessage("An unexpected error occurred. Please try again.");            
            setTimeout(() => setErrorMessage(null), 3000);
        }
    }

    useEffect(() => {
        getTableProjects();
    }, [])

    return (
        <>
            <div className="bg-[#161616] border border-[#333333] mt-8">
                
                <div className="flex justify-between items-center px-4 py-3 border-b border-[#333333]">
                    <div className="flex items-center gap-3">
                        <div className="w-1 rounded-sm h-8 bg-[#C8102E]"></div>
                        <div>
                            <h2 className="text-white main-font font-semibold">Recent Jobs</h2>
                            <p className="text-xs sub-font text-[#888888]">Updated just now</p>
                        </div>
                    </div>
                    <button className="text-sm sub-font font-semibold pr-8 cursor-pointer text-[#888888] hover:text-white">View All →</button>
                </div>

                <div className="bg-[#101010] grid grid-cols-6 text-xs sub-font text-[#888888] px-4 py-2 border-b border-[#333333]">
                    <span>JOB</span>
                    <span>ADDRESS</span>
                    <span>CLIENT</span>
                    <span>DATE</span>
                    <span>STATUS</span>
                    <span>ACTIONS</span>
                </div>

                {projectData && projectData.length > 0 ? (
                    projectData.map((project, index) => (
                        <div key={index} className="sub-font grid grid-cols-6 px-4 py-3 border-b border-[#333333] items-center">
                            <span className="text-sm font-semibold text-white">{project.title}</span>
                            <span className="text-sm text-[#bbbbbb] w-40">{project.address}</span>
                            <span className="text-sm text-[#bbbbbb]">{project.clientName}</span>
                            <span className="text-sm text-[#bbbbbb]">{project.startDate}</span>

                            <span>
                                <span className="bg-[#C8102E]/20 text-[#C8102E] text-sm px-2 py-1 rounded">• {project.projectStatus}</span>
                            </span>

                            <div className="flex gap-2">
                                <Link to="/jobs" className="cursor-pointer border border-[#333333] px-3 py-1 text-sm text-[#7A7A7A] rounded-xs hover:border-[#6C6C6C] hover:text-[#B8B8B8]">View</Link>
                                <button onClick={() => deleteProject(project.projectId)} className="cursor-pointer border border-[#333333] px-3 py-1 text-sm text-[#7A7A7A] rounded-xs hover:border-[#C8102E] hover:text-[#C8102E] hover:bg-[#C8102E]/20">Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 border-b border-[#333333] bg-[#161616]">
                        <div className="mb-2 opacity-20">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                            </svg>
                        </div>
                        <h3 className="main-font text-[#888888] font-medium">No recent projects found</h3>
                        <p className="sub-font text-xs text-[#555555] mt-1">When you add new projects, they will appear here.</p>
                    </div>
                )}                

            </div>

            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)}/>
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)}/>
        </>
    );
}