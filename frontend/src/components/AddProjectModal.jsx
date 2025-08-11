import React from "react";
import { useState } from 'react';
import ModalErrorToast from '../components/ModalErrorToast';
import ModalSuccessToast from '../components/ModalSuccessToast';

function AddProjectModal({ onClose, refreshProjects }) {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        projectName: '',
        projectAddress: '',
        startDate: '',
        projectStatus: 'Upcoming',  // default value
        team: '',
        clientFullName: "",
        clientPhoneNumber: "",
        contractorFullName: "",
        contractorPhoneNumber: "",
        projectDescription: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    async function handleSubmit(event){
        event.preventDefault();

        if(!formData.projectName.trim() || !formData.projectAddress.trim() || !formData.startDate.trim() || !formData.team.trim()){
            setErrorMessage("Please fill out all required fields");
            return;
        }

        try{
            const response = await fetch("http://localhost:8080/api/v1/project/add", {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    name: formData.projectName,
                    address: formData.projectAddress,
                    startDate: formData.startDate,
                    projectStatus: formData.projectStatus,
                    team: formData.team,
                    clientName: formData.clientFullName === "" ? null : formData.clientFullName,
                    clientPhoneNumber: formData.clientPhoneNumber  === "" ? null : formData.clientPhoneNumber,
                    contractorName: formData.contractorFullName  === "" ? null : formData.contractorFullName,
                    contractorPhoneNumber: formData.contractorPhoneNumber  === "" ? null : formData.contractorPhoneNumber,
                    description: formData.projectDescription === "" ? null : formData.projectDescription
                })
            })

            if(response.status === 401) {
                localStorage.clear();
                window.location.href = "/home";
                return
            }

            if(response.ok) {
                const data = await response.json();
                setSuccessMessage(data.message);
                setErrorMessage("")

                refreshProjects();
                setTimeout(() => {onClose();}, 1500);

            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message)
                setSuccessMessage("");
            }

        } catch(error) {
            console.error("Project error:", error);
            if (error instanceof TypeError || error.name === "TypeError" || error.name === "NetworkError") {
                setErrorMessage("Network error: please check your connection.");
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
            setSuccessMessage(""); 
        }
    }

    return (
        <>
            <div className="fixed top-72 right-10 animate-fadeIn z-[9999] rounded-lg border-1 border-gray-100 shadow-[0_0_15px_rgba(107,114,128,0.7)] bg-gray-100">
                <div className="bg-white w-[500px] rounded-lg shadow-lg relative p-4">
                    
                    {/* Close Button */}
                    <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-semibold cursor-pointer">×</button>

                    {/* Header */}
                    <h1 className="text-base font-semibold text-center mb-3">Add New Project</h1>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-2 p-2">

                        <div>
                            <label className="block text-xs font-medium text-gray-700">Project Name</label>
                            <input name="projectName" value={formData.projectName} onChange={handleChange} type="text" placeholder="e.g., Basement Remodel - Russo Residence" className="mt-1 w-full border border-gray-300 rounded-md p-1.5 text-xs"/>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700">Project Address</label>
                            <input name="projectAddress" value={formData.projectAddress} onChange={handleChange} type="text" placeholder="e.g., 27 Harborview Ln, Norwalk, CT 06854"className="mt-1 w-full border border-gray-300 rounded-md p-1.5 text-xs"/>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Start Date</label>
                                <input name="startDate" value={formData.startDate} onChange={handleChange} type="date" className="mt-1 w-full border border-gray-300 rounded-md p-1.5 text-xs"/>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Project Status</label>
                                <select name="projectStatus" value={formData.projectStatus} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md p-1.5 text-xs">
                                    <option>Upcoming</option>
                                    <option>In-Progress</option>
                                    <option>Completed</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700">Team</label>
                            <input name="team" value={formData.team} onChange={handleChange} type="text" placeholder="e.g., Jack, Jairo" className="mt-1 w-full border border-gray-300 rounded-md p-1.5 text-xs"/>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Client Full Name</label>
                                <input name="clientFullName" value={formData.clientFullName} onChange={handleChange} type="text" placeholder="e.g., Michael Russo" className="mt-1 w-full border border-gray-300 rounded-md p-1.5 text-xs"/>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Client Phone Number</label>
                                <input name="clientPhoneNumber" value={formData.clientPhoneNumber} onChange={handleChange} type="text" placeholder="e.g., 203-555-1234" className="mt-1 w-full border border-gray-300 rounded-md p-1.5 text-xs"/>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Contractor Full Name</label>
                                <input name="contractorFullName" value={formData.contractorFullName} onChange={handleChange} type="text" placeholder="e.g., Michael Russo" className="mt-1 w-full border border-gray-300 rounded-md p-1.5 text-xs"/>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Contractor Phone Number</label>
                                <input name="contractorPhoneNumber" value={formData.contractorPhoneNumber} onChange={handleChange} type="text" placeholder="e.g., 203-555-1234" className="mt-1 w-full border border-gray-300 rounded-md p-1.5 text-xs"/>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700">Job Description</label>
                            <textarea name="projectDescription" value={formData.projectDescription} onChange={handleChange} placeholder="Short summary of the work to be done..." className="mt-1 w-full border border-gray-300 rounded-md p-1.5 text-xs" rows={2}></textarea>
                        </div>

                        <button type="submit" className="cursor-pointer w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded-md font-medium text-sm mt-2">Add Project</button>
                    </form>
                </div> 
            </div>

            <ModalErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
            <ModalSuccessToast message={successMessage} onClose={() => setSuccessMessage("")} />
        </>
    );
}
export default AddProjectModal;
