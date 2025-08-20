import React from "react";
import { useState } from "react";
import { authFetch } from "../util/auth";
import ErrorToast from '../components/ErrorToast';
import SearchList from "./SearchList";

export default function Search(){
    const [clientName, setClientName] = useState("");
    const [jobAddress, setJobAddress] = useState("");
    const [projectStatus, setProjectStatus] = useState("");
    const [activeProjectListModel, setActiveProjectListModel] = useState(false);
    const [projects, setProjects] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    async function searchProject(){
        try {
            const data = await authFetch("http://localhost:8080/api/v1/project/projects/dashboard/search", {
                method: "POST",
                body: {
                    clientName: clientName,
                    projectAddress: jobAddress,
                    status: projectStatus
                }
            });

            if(data.length === 0){
                setErrorMessage("No projects found matching your search.");
                return; 
            }

            setProjects(data);
            setActiveProjectListModel(true);
            setErrorMessage("");

        } catch(error) {
            console.log("Search Project Error: ", error);
            setErrorMessage(error.message);
        }
    }

    return(
        <>
            <div className="bg-white rounded-xl w-[50%] h-full p-6">
                <h1 className="font-semibold text-xl mb-4">Job Search</h1>

                <div className="flex flex-col gap-4">
                    <input value={clientName} onChange={(e) => setClientName(e.target.value)} className="border border-gray-300 rounded-md p-2 text-sm" placeholder="Client Name"/>
                    <input value={jobAddress} onChange={(e) => setJobAddress(e.target.value)} className="border border-gray-300 rounded-md p-2 text-sm" placeholder="Job Address"/>

                    <select value={projectStatus} onChange={(e) => setProjectStatus(e.target.value)} className="border border-gray-300 rounded-md p-2 text-sm">
                        <option>Upcoming</option>
                        <option>In-Progress</option>
                        <option>Completed</option>
                    </select>

                    <button onClick={() => searchProject()} className="custom-red-color-background text-white rounded-md py-2 px-4 mt-2 cursor-pointer">Search</button>
                </div>
            </div>
            {activeProjectListModel && (
            <SearchList
                onClose={() => setActiveProjectListModel(false)}
                projects={projects} // Pass your projects list here (if needed)
            />
            )}
            <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
        </>
    );
}