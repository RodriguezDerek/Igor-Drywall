import { authFetch } from "../../utils/utils";
import ErrorMessage from "../global/ErrorMessage";
import SuccessMessage from "../global/SuccessMessage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type WorkerTableDTO = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    dateAdded: string;
}

export default function DashboardWorkerTable() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [workerData, setWorkerData] = useState<WorkerTableDTO[] | null>(null);

    async function getTableWorkers() {
        try {
            const response = await authFetch("http://localhost:8080/api/v1/users/table", {
                method: "GET",
            });

            if (response.ok) {
                const data: WorkerTableDTO[] = await response.json();
                setWorkerData(data);
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");            
                setTimeout(() => setErrorMessage(null), 3000);
            }

        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                switch (error.message) {
                    case "FORBIDDEN":
                        setErrorMessage("You do not have permission to view this.");
                        break;
                    case "UNAUTHORIZED":
                        setErrorMessage("Please log in.");
                        break;
                    default:
                        setErrorMessage("Something went wrong.");
                }
            }    
            setTimeout(() => setErrorMessage(null), 3000);     
        }
    }

    async function deleteWorker(id: number) {
        try {
            const response = await authFetch(`http://localhost:8080/api/v1/users/user/${id}`, {
                method: "DELETE",
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
            if (error instanceof Error) {
                switch (error.message) {
                    case "FORBIDDEN":
                        setErrorMessage("You do not have permission to view this.");
                        break;
                    case "UNAUTHORIZED":
                        setErrorMessage("Please log in.");
                        break;
                    default:
                        setErrorMessage("Something went wrong.");
                }
            }            
            setTimeout(() => setErrorMessage(null), 3000);     
        }
    }

    useEffect(() => {
        getTableWorkers();
    }, []);

    return (    
        <>
            <div className="bg-[#161616] border border-[#333333] mt-8">
                
                <div className="flex justify-between items-center px-4 py-3 border-b border-[#333333]">
                    <div className="flex items-center gap-3">
                        <div className="w-1 rounded-sm h-8 bg-[#C8102E]"></div>
                        <div>
                            <h2 className="text-white main-font font-semibold">Current Workers</h2>
                            <p className="text-xs sub-font text-[#888888]">Active Now</p>
                        </div>
                    </div>
                    <button className="text-sm sub-font font-semibold pr-8 cursor-pointer text-[#888888] hover:text-white">View All →</button>
                </div>

                <div className="bg-[#101010] grid grid-cols-6 text-xs sub-font text-[#888888] px-4 py-2 border-b border-[#333333]">
                    <span>NAME</span>
                    <span>EMAIL</span>
                    <span>PHONE NUMBER</span>
                    <span>ROLE</span>
                    <span>JOINED</span>
                    <span>ACTIONS</span>
                </div>

                {workerData && workerData.length > 0 ? (
                    workerData.map((worker, index) => (
                        <div key={index} className="sub-font grid grid-cols-6 px-4 py-3 border-b border-[#333333] items-center">
                            <span className="text-sm font-semibold text-white">{worker.name}</span>
                            <span className="text-sm text-[#bbbbbb] w-40">{worker.email}</span>
                            <span className="text-sm text-[#bbbbbb]">{worker.phoneNumber}</span>
                            <span className="text-sm text-[#bbbbbb]">{worker.role}</span>
                            <span className="text-sm text-[#bbbbbb]">{worker.dateAdded}</span>

                            <div className="flex gap-2">
                                <Link to="/jobs" className="cursor-pointer border border-[#333333] px-3 py-1 text-sm text-[#7A7A7A] rounded-xs hover:border-[#6C6C6C] hover:text-[#B8B8B8]">View</Link>
                                <button onClick={() => deleteWorker(worker.id)} className="cursor-pointer border border-[#333333] px-3 py-1 text-sm text-[#7A7A7A] rounded-xs hover:border-[#C8102E] hover:text-[#C8102E] hover:bg-[#C8102E]/20">Delete</button>
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
                        <h3 className="main-font text-[#888888] font-medium">No recent Workers found</h3>
                        <p className="sub-font text-xs text-[#555555] mt-1">Workers will show up here as they're added.</p>
                    </div>
                )}                
            </div>

            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)}/>
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)}/>
        </>
    );
}