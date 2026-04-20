import { useEffect, useState } from "react";
import ErrorMessage from "../global/ErrorMessage";
import SuccessMessage from "../global/SuccessMessage";
import { authFetch } from "../../utils/utils";

type PendingUserTableDTO = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    requestedAt: string;
}

export default function PendingWorkerList() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); 
    const [pendingData, setPendingData] = useState<PendingUserTableDTO[] | null>(null);

    async function enableWorker(id: number) {
        try {
            const response = await authFetch(`http://localhost:8080/api/v1/users/user/enable/${id}`, {
                method: "POST"
            });
            
            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
                setTimeout(() => setSuccessMessage(null), 3000);
                getPendingWorkers();
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

    async function removeWorker(id: number) {
        try {
            const response = await authFetch(`http://localhost:8080/api/v1/users/user/${id}`, {
                method: "DELETE"
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
                setTimeout(() => setSuccessMessage(null), 3000);
                getPendingWorkers();
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

    async function getPendingWorkers() {
        try {
            const response = await authFetch("http://localhost:8080/api/v1/users/pending", {
                method: "GET"
            });

            if (response.ok) {
                const data: PendingUserTableDTO[] = await response.json();
                setPendingData(data);
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

    useEffect(() => {
        getPendingWorkers();
    }, []);

    return (
        <>
            <div className="min-h-screen pt-8">
                <div className="mx-auto max-w-6xl">
                    <header className="mb-3">
                        <div className="flex items-center gap-3">
                            <h2 className="main-font text-xl font-bold text-white tracking-tight">Join Requests</h2>
                            <span className="sub-font flex h-5 w-5 items-center justify-center rounded-full bg-[#C8102E] text-[11px] font-bold text-white">{pendingData ? pendingData.length : 0}</span>
                        </div>
                        <p className="sub-font mt-2 text-sm text-[#888888]">New accounts waiting for admin approval before they can access the dashboard.</p>
                    </header>
                </div>

                <div className="overflow-hidden rounded-md border border-[#333333] bg-[#101010]">
                    <table className="w-full border-collapse text-left">
                        <thead className="border-b border-[#333333]">
                            <tr>
                                <th className="px-6 py-3 text-[11px] sub-font font-medium uppercase tracking-widest text-[#888888]">Applicant</th>
                                <th className="px-6 py-3 text-[11px] sub-font font-medium uppercase tracking-widest text-[#888888]">Role</th>
                                <th className="px-6 py-3 text-[11px] sub-font font-medium uppercase tracking-widest text-[#888888]">Phone</th>
                                <th className="px-6 py-3 text-[11px] sub-font font-medium uppercase tracking-widest text-[#888888]">Requested</th>
                                <th className="px-6 py-3 text-center sub-font text-[11px] font-medium uppercase tracking-widest text-[#888888]">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-zinc-800/50">
                            {pendingData && pendingData.length > 0 ? (
                                pendingData.map((worker) => (
                                    <tr key={worker.id} className="bg-[#161616]">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#333333] bg-zinc-900 text-lg font-bold text-white main-font">{worker.name.charAt(0).toUpperCase()}</div>
                                                <div>
                                                    <div className="sub-font text-base font-bold text-white">{worker.name}</div>
                                                    <div className="sub-font text-sm text-[#888888] tracking-tight">{worker.email}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <span className="inline-block rounded border border-[#333333] bg-zinc-900 px-3 py-2 text-sm sub-font font-medium text-[#888888]">{worker.role}</span>
                                        </td>

                                        <td className="px-6 py-5 sub-font text-sm text-[#888888]">{worker.phoneNumber}</td>
                                        <td className="px-6 py-5 sub-font text-sm text-[#888888]">{worker.requestedAt}</td>

                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-center gap-3">
                                                <button onClick={() => enableWorker(worker.id)} className="cursor-pointer sub-font flex items-center gap-2 rounded border border-green-900/40 bg-green-950/20 px-4 py-2 text-sm font-semibold text-green-500 hover:bg-green-900/30 transition-all active:scale-95"><span>✓</span> Accept</button>
                                                <button onClick={() => removeWorker(worker.id)} className="cursor-pointer sub-font flex items-center gap-2 rounded border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm font-semibold text-zinc-400 hover:bg-zinc-800 transition-all active:scale-95"><span>✕</span> Decline
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-[#888888] sub-font">No pending requests</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)}/>
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)}/>
        </>
    );
}