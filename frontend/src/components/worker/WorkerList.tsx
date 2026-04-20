import { useEffect, useState } from "react";
import { authFetch } from "../../utils/utils";
import ErrorMessage from "../global/ErrorMessage";
import SuccessMessage from "../global/SuccessMessage";

type WorkerTableDTO = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    dateAdded: string;
}

export default function WorkerList() {    
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [workerData, setWorkerData] = useState<WorkerTableDTO[] | null>(null);

    async function getCurrentWorkers() {
        try {
            const response = await authFetch("http://localhost:8080/api/v1/users/table", {
                method: "GET"
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
                method: "DELETE"
            })

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
                setTimeout(() => setSuccessMessage(null), 3000);
                getCurrentWorkers();
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
        getCurrentWorkers();
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {workerData && workerData.length > 0 ? (
                    workerData.map((worker) => (
                        <div key={worker.id} className="w-full max-w-100 bg-[#0F0F0F] text-[#eeeeee] rounded-sm border border-[#333333] p-6 relative shadow-2xl">
                
                            <button onClick={() => deleteWorker(worker.id)} className="cursor absolute top-5 right-7 text-[#5B5B5B] hover:text-white transition-colors text-base font-medium">✕</button>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#C8102E] to-[#620817] flex items-center justify-center shadow-lg">
                                    <span className="text-xl main-font font-bold text-white">{worker.name.charAt(0).toUpperCase()}</span>
                                </div>
                                
                                <div className="flex flex-col">
                                    <h2 className="text-[16px] sub-font font-semibold leading-tight tracking-tight">{worker.name}</h2>
                                    <p className="text-[#888888] sub-font text-[11px] font-normal tracking-widest mt-1">{worker.role}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="w-full h-px bg-[#333333]" />

                                <div className="flex gap-3 items-start">
                                    <span className="w-20 shrink-0 sub-font text-[#888888] text-[11px] font-medium tracking-widest uppercase leading-none pt-0.5">Email</span>
                                    <span className="text-[#888888] sub-font text-[14px] leading-snug min-w-0 break-all">{worker.email}</span>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <span className="w-20 shrink-0 sub-font text-[#888888] text-[11px] font-medium tracking-widest uppercase leading-none pt-0.5">Phone</span>
                                    <span className="text-[#888888] sub-font text-[14px] leading-snug min-w-0 break-all">{worker.phoneNumber}</span>
                                </div>

                                <div className="w-full h-px bg-[#333333]" />

                                <div className="flex gap-3 items-start">
                                    <span className="w-20 shrink-0 sub-font text-[#888888] text-[11px] font-medium tracking-widest uppercase leading-none pt-0.5">Since</span>
                                    <span className="text-[#888888] sub-font text-[14px] leading-snug min-w-0 break-all">{worker.dateAdded}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full">
                        <div className="h-40 flex flex-col items-center justify-center py-8 border border-[#333333] bg-[#161616] mb-10 text-center text-gray-400">
                            <p className="text-lg sub-font font-medium text-white">No workers yet</p>
                            <p className="text-sm sub-font mt-1 text-[#888888]">Add a worker to get started — they'll appear here once added.</p>
                        </div>
                    </div>
                )}
                </div>

            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)}/>
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)}/>
        </>
    );
}