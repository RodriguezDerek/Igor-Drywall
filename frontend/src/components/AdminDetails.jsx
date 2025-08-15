import React from "react";
import { useState, useCallback } from "react";
import { authFetch } from "../util/auth";
import { useDropzone } from "react-dropzone";
import ModalErrorToast from "./ModalErrorToast"; 
import ModalSuccessToast from "./ModalSuccessToast";
import MaterialTable from "./MaterialTable";

function AdminDetails({ projectDetails, files, onClose, getFilesAgain }){
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
            name: projectDetails.name,
            clientName: projectDetails.clientName,
            clientPhoneNumber: projectDetails.clientPhoneNumber,
            contractorName: projectDetails.contractorName,
            contractorPhoneNumber: projectDetails.contractorPhoneNumber, 
            startDate: projectDetails.startDate,
            projectStatus: projectDetails.projectStatus,
            team: projectDetails.team,
            address: projectDetails.address,
            description: projectDetails.description
        });
    
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        setImage(file); 
        setImagePreview(URL.createObjectURL(file)); 
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false,
    });

    async function addFile(projectId){
        if(!image){ 
            setErrorMessage("Please select a file first");
            return;
        }
            
        const formData = new FormData();
        formData.append("file", image); 

        try {
            const data = await authFetch(`http://localhost:8080/api/v1/files/upload/${projectId}`, {
                method: "POST",
                body: formData
            });

            getFilesAgain(projectId)
            setSuccessMessage(data.message);
            setErrorMessage("");

        } catch(error) {
            console.error("Add Project error:", error);
            setErrorMessage(error.message);
        }
    }

    async function downloadFile(projectId, fileName){
        if (!projectId) {
            setErrorMessage("Project ID is missing or invalid.");
            return;
        }

        if (!fileName || fileName.trim() === "") {
            setErrorMessage("File name is missing or empty.");
            return;
        }

        try{
            const response = await fetch(`http://localhost:8080/api/v1/files/download/${projectId}?filename=${encodeURIComponent(fileName)}`,{
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.status === 401) {
                localStorage.clear();
                window.location.href = "/home";
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
                setSuccessMessage("");
                return;
            }

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName; 
            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);

            setSuccessMessage(`File "${fileName}" downloaded successfully.`);
            setErrorMessage("");


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

    async function removeFile(projectId, fileName){
        if (!projectId) {
            setErrorMessage("Project ID is missing or invalid.")
            return; 
        }

        if (!fileName || fileName.trim() === "") {
            setErrorMessage("File name is missing or empty.")
            return; 
        }
        
        try {
            const data = await authFetch(`http://localhost:8080/api/v1/files/delete/${projectId}?filename=${encodeURIComponent(fileName)}`, {
                method: "DELETE"
            });
        
            getFilesAgain(projectId)
            setSuccessMessage(data.message)
            setErrorMessage("")
        
        } catch(error) {
            console.error("Remove Project File Error: ", error);
            setErrorMessage(error.message);
        }
    }

    async function handleSubmit(e){
        e.preventDefault();
    }

    return(
        <>
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            
            <form onSubmit={handleSubmit} className="bg-white rounded-sm shadow-lg w-full max-w-2xl relative animate-fadeIn max-h-[80vh] overflow-y-auto pl-7 pt-5 pr-5 pb-5">
                {/* Close button */}
                <button onClick={onClose} className="cursor-pointer absolute top-4 right-4 text-gray-900 hover:text-gray-800 text-xl">&times;</button>

                {/* Title */}
                <input className="text-lg text-[#252525] font-semibold mb-4 focus:outline-none focus:border-none" name="name" type="text" value={formData.name} onChange={handleChange}></input>

                <hr className="mb-6 border-0 h-px bg-[#DBDBDB]" />

                {/* Two-column layout */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Client Name</p>
                        <input name="clientName" type="text" className="w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-sm text-[#252525] bg-gray-50" value={formData.clientName} onChange={handleChange}/>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Client Phone Number</p>
                        <input name="clientPhoneNumber" type="text" className="w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-sm text-[#252525] bg-gray-50" value={formData.clientPhoneNumber} onChange={handleChange}/>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Contractor Name</p>
                        <input name="contractorName" type="text" className="w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-sm text-[#252525] bg-gray-50" value={formData.contractorName} onChange={handleChange} />
                    </div>

                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Contractor Phone Number</p>
                        <input name="contractorPhoneNumber" type="text" className="w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-sm text-[#252525] bg-gray-50" value={formData.contractorPhoneNumber} onChange={handleChange} />
                    </div>

                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Start Date</p>
                        <input name="startDate" type="date" className="w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-sm text-[#252525] bg-gray-50" value={formData.startDate} onChange={handleChange} />
                    </div>

                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Project Status</p>
                        <select name="projectStatus" value={formData.projectStatus} onChange={handleChange} className="w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-sm text-[#252525] bg-gray-50">
                            <option>Upcoming</option>
                            <option>In-Progress</option>
                            <option>Completed</option>
                        </select>             
                    </div>
                </div>

                {/* Team */}
                <div className="mt-4">
                    <p className="text-xs font-medium text-gray-500 mb-1">Team</p>
                    <input name="team" type="text" className="w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-sm text-[#252525] bg-gray-50" value={formData.team} onChange={handleChange} />
                </div>

                {/* Job Address */}
                <div className="mt-4">
                    <p className="text-xs font-medium text-gray-500 mb-1">Job Address</p>
                    <input name="address" type="text" className="w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-sm text-[#252525] bg-gray-50" value={formData.address} onChange={handleChange} />
                </div>

                {/* Job Description */}
                <div className="mt-4">
                    <p className="text-xs font-medium text-gray-500 mb-1">Job Description</p>
                    <input name="description" type="text" className="w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-sm text-[#252525] bg-gray-50" value={formData.description} onChange={handleChange} />
                </div>

                <hr className="mt-8 border-0 h-px bg-[#DBDBDB]" />

                {/* File Title */}
                <h1 className="text-lg text-[#252525] font-semibold mt-4">Attached Job Files</h1>

                <div className="flex justify-center pt-4">
                    <div className="space-y-4 w-full max-w-2xl">

                        {/* Uploaded File Row */}
                        <div className="max-h-14 overflow-y-auto space-y-3 border border-gray-200 rounded-lg p-1">
                            {files.length > 0 ? (
                                files.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2 w-full">
                                        <span className="text-red-800 font-medium text-sm">{file}</span>
                                        <div className="flex space-x-2">
                                            <button onClick={() => downloadFile(projectDetails.id, file)} className="border border-gray-400 rounded px-3 py-1 text-xs hover:bg-gray-100 cursor-pointer">Download</button>
                                            <button onClick={() => removeFile(projectDetails.id, file)} className="bg-red-800 text-white rounded px-3 py-1 text-xs hover:bg-red-900 cursor-pointer">Delete</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm text-center">No Files found for {projectDetails.name}</p>
                            )}                            
                        </div>

                        <div className="flex flex-col space-y-4">
                            {/* Dropzone + Send Button */}
                            <div className="flex items-center space-x-4">
                                <div {...getRootProps()} className={`flex-1 border-2 border-dashed border-red-800 bg-red-50 rounded-lg p-4 text-center cursor-pointer hover:bg-red-100 h-14 flex items-center justify-center ${isDragActive ? "bg-red-100" : ""}`}>
                                    <input {...getInputProps()} />
                                    <div className="flex items-center justify-center space-x-2 text-red-800 font-medium">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v9.69l2.72-2.72a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 111.06-1.06l2.72 2.72V2.75A.75.75 0 0110 2zm-7 13.25a.75.75 0 000 1.5h14a.75.75 0 000-1.5H3z" clipRule="evenodd"/>
                                        </svg>
                                        <span className="text-sm">{isDragActive ? "Drop the file here..." : "Click or drag file to upload"}</span>
                                    </div>
                                </div>

                                {image && (
                                    <button onClick={() => addFile(projectDetails.id)} className="bg-red-800 text-white px-4 py-1 rounded hover:bg-red-900">Send</button>
                                )}
                            </div>

                            {/* Preview */}
                            {image && (
                                <div className="flex justify-center">
                                    <img src={imagePreview} alt="Preview" className="w-30 h-30 object-cover rounded-md" />
                                </div>
                            )}

                        </div>

                        {/* Supported Formats */}
                        <p className="text-xs text-gray-500 italic text-center">Supported formats: <span className="not-italic">PDF, JPG, PNG, XLSX, DWG</span></p>
                        
                    </div>
                </div>

                <hr className="mt-6 border-0 h-px bg-[#DBDBDB]" />

                {/* Material Tracking */}
                <div className="mt-6">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg text-[#252525] font-semibold">Material Tracking</h1>
                        <div className="flex gap-2">
                            <button className="bg-red-800 text-white rounded px-3 py-1 text-xs hover:bg-red-900 cursor-pointer">Download</button>
                            <button className="bg-red-800 text-white rounded px-3 py-1 text-xs hover:bg-red-900 cursor-pointer">Print</button>
                        </div>
                    </div>

                    {/* Tables Section */}
                    <div className="mt-4">
                        <MaterialTable />
                    </div>
                </div>


        

            </form>
        </div>
        <ModalErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
        <ModalSuccessToast message={successMessage} onClose={() => setSuccessMessage("")} />
        </>
    );
}
export default AdminDetails;