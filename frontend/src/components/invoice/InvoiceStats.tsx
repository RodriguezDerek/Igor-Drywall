import { useEffect, useState } from "react";
import ErrorMessage from "../global/ErrorMessage";
import SuccessMessage from "../global/SuccessMessage";
import { authFetch } from "../../utils/utils";

type InvoiceStats = {
    totalInvoices: number;
    unpaidInvoices: number;
    totalReceived: number;
    paidThisMonth: number;
}

export default function InvoiceStats() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [stats, setStats] = useState<InvoiceStats | null>(null);
    
    async function getInvoiceStats() {
        try {
            const response = await authFetch("http://localhost:8080/api/v1/stats/invoices", {
                method: "GET"
            });

            if (response.ok) {  
                const data: InvoiceStats = await response.json();
                setStats(data);
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
        getInvoiceStats();
    }, []);

    return (
        <>
            <div className="text-white">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-[#333333]">                

                    <div className="h-27 bg-[#161616] border border-[#333333] border-b-3">
                        <div className="pt-2 pr-2 pb-2 pl-3.5">
                        <span className="text-xs sub-font tracking-widest text-[#888888]">TOTAL INVOICES</span>
                        <h2 className="text-[26px] main-font font-bold text-white">{stats ? stats.totalInvoices : 0}</h2>
                        <p className="text-sm sub-font text-[#888888]">Total Invoices</p>
                        </div>
                    </div>

                    <div className="h-27 bg-[#161616] border border-[#333333] border-b-3">
                        <div className="pt-2 pr-2 pb-2 pl-3.5">
                        <span className="text-xs sub-font tracking-widest text-[#888888]">UNPAID INVOICES</span>
                        <h2 className="text-[26px] main-font font-bold text-white">{stats ? stats.unpaidInvoices : 0}</h2>
                        <p className="text-sm sub-font text-[#888888]">Unpaid Invoices</p>
                        </div>
                    </div>

                    <div className="h-27 bg-[#161616] border border-[#333333] border-b-3">
                        <div className="pt-2 pr-2 pb-2 pl-3.5">
                        <span className="text-xs sub-font tracking-widest text-[#888888]">TOTAL RECEIVED</span>
                        <h2 className="text-[26px] main-font font-bold text-white">${stats ? stats.totalReceived : 0}</h2>
                        <p className="text-sm sub-font text-[#888888]">Total Received</p>
                        </div>
                    </div>

                    <div className="h-27 bg-[#161616] border border-[#333333] border-b-3">
                        <div className="pt-2 pr-2 pb-2 pl-3.5">
                        <span className="text-xs sub-font tracking-widest text-[#888888]">COLLECTED</span>
                        <h2 className="text-[26px] main-font font-bold text-white">{stats ? stats.paidThisMonth : 0}</h2>
                        <p className="text-sm sub-font text-[#888888]">Paid This Month</p>
                        </div>
                    </div>

                </div>
            </div>

            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)} />
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)} />
        </>
    );
}