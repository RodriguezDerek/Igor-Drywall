import React from "react";
import { useState } from "react";

export default function Search(){
    const [clientName, setClientName] = useState("");
    const [jobAddress, setJobAddress] = useState("");
    const [projectStatus, setProjectStatus] = useState("");

    return(
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

                <button className="custom-red-color-background text-white rounded-md py-2 px-4 mt-2 cursor-pointer">Search</button>
            </div>
        </div>
    );
}