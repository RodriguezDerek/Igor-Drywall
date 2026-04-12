import { useEffect, useState } from "react";
import ErrorMessage from "../global/ErrorMessage";
import SuccessMessage from "../global/SuccessMessage";

type StatData = {
    activeJobs: number;
    totalQuotes: number;
    unpaidInvoices: number;
    totalWorkers: number;
}

export default function DashboardStats() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [stats, setStats] = useState<StatData | null>(null);

    async function getDashboardStats() {
        try {
            const response = await fetch("http://localhost:8080/api/v1/stats/dashboard", {
                method: "GET",
                credentials: "include"
            });

            if (response.ok) {
                const data: StatData = await response.json();
                setStats(data);

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

    useEffect(() => {
        getDashboardStats();
    }, []);

    return (
        <>
            <div className="text-white">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-[#333333]">                

                    <div className="h-27 bg-[#161616] border border-[#333333] border-b-3">
                        <div className="pt-2 pr-2 pb-2 pl-3.5">
                        <span className="text-xs sub-font tracking-widest text-[#888888]">JOBS</span>
                        <h2 className="text-[26px] main-font font-bold text-white">{stats?.activeJobs}</h2>
                        <p className="text-sm sub-font text-[#888888]">Active Jobs</p>
                        </div>
                    </div>

                    <div className="h-27 bg-[#161616] border border-[#333333] border-b-3">
                        <div className="pt-2 pr-2 pb-2 pl-3.5">
                        <span className="text-xs sub-font tracking-widest text-[#888888]">QUOTES</span>
                        <h2 className="text-[26px] main-font font-bold text-white">{stats?.totalQuotes}</h2>
                        <p className="text-sm sub-font text-[#888888]">Total Quotes</p>
                        </div>
                    </div>

                    <div className="h-27 bg-[#161616] border border-[#333333] border-b-3">
                        <div className="pt-2 pr-2 pb-2 pl-3.5">
                        <span className="text-xs sub-font tracking-widest text-[#888888]">INVOICES</span>
                        <h2 className="text-[26px] main-font font-bold text-white">{stats?.unpaidInvoices}</h2>
                        <p className="text-sm sub-font text-[#888888]">Unpaid Invoices</p>
                        </div>
                    </div>

                    <div className="h-27 bg-[#161616] border border-[#333333] border-b-3">
                        <div className="pt-2 pr-2 pb-2 pl-3.5">
                        <span className="text-xs sub-font tracking-widest text-[#888888]">WORKERS</span>
                        <h2 className="text-[26px] main-font font-bold text-white">{stats?.totalWorkers}</h2>
                        <p className="text-sm sub-font text-[#888888]">Total Workers</p>
                        </div>
                    </div>

                </div>
            </div>

            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)}/>
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)}/>
        </>
    );
}