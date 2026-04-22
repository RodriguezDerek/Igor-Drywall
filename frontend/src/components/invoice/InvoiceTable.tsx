import { useEffect, useState } from "react";
import ErrorMessage from "../global/ErrorMessage";
import SuccessMessage from "../global/SuccessMessage";
import { authFetch } from "../../utils/utils";
import { Link } from "react-router-dom";

type InvoiceItem = {
    id: number;
    description: string;
    quantity: number;
    unitPrice: number;
    tax: number;
    total: number;
    createdAt: string;
}

type InvoiceDTO = {
    id: number;
    title: string;
    status: string;
    issueDate: string;
    dueDate: string;
    clientName: string;
    billingAddress: string;
    notes: string;
    paymentInstructions: string;
    amount: number;
    createdAt: string;
    items: InvoiceItem[]
}

export default function InvoiceTable() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>("ALL");
    const [invoiceData, setInvoiceData] = useState<InvoiceDTO[] | null>(null);

    async function deleteInvoice(id: number) {
        try {
            const response = await authFetch(`http://localhost:8080/api/v1/invoices/invoice/${id}`, {
                method: "DELETE"
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
                setTimeout(() => setSuccessMessage(null), 3000);
                getAllInvoices(filterStatus);
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

    async function getAllInvoices(status: string) {
        try {
            const response = await authFetch(`http://localhost:8080/api/v1/invoices/search?status=${status}`, {
                method: "GET"
            });

            if (response.ok) {
                const data: InvoiceDTO[] = await response.json();
                setInvoiceData(data);
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
        getAllInvoices(filterStatus);
    }, [filterStatus]);

    return (
        <>
            <div className="mt-6">
                
                <div className="flex items-end justify-between border border-[#333333] bg-[#161616] p-4">
                    <div className="flex items-start gap-3 ml-2">
                        <div className="w-1 h-8 rounded bg-[#C8102E] self-center"></div>
                        <div>
                            <h2 className="text-lg main-font font-bold text-white leading-tight">Invoices</h2>
                            <p className="text-sm sub-font text-[#888888]"> Showing {filterStatus.toLowerCase()} {invoiceData ? invoiceData.length : 0} invoices</p>
                        </div>
                    </div>

                    <nav className="flex gap-8 mr-2">
                        <div onClick={() => setFilterStatus("ALL")} className={`relative pb-2 flex items-center gap-2 cursor-pointer border-b-2 transition-colors ${ filterStatus === "ALL" ? "border-[#C8102E]" : "border-transparent" }`}>
                            <button className={`cursor-pointer sub-font font-medium ${filterStatus === "ALL" ? "text-white" : "text-[#676767]"}`}>All</button>
                        </div>

                        <div onClick={() => setFilterStatus("UNPAID")} className={`relative pb-2 flex items-center gap-2 cursor-pointer border-b-2 transition-colors ${ filterStatus === "UNPAID" ? "border-[#C8102E]" : "border-transparent" }`}>
                            <button className={`cursor-pointer sub-font font-medium ${filterStatus === "UNPAID" ? "text-white" : "text-[#676767]"}`}>Unpaid</button>
                        </div>

                       <div onClick={() => setFilterStatus("PAID")} className={`relative pb-2 flex items-center gap-2 cursor-pointer border-b-2 transition-colors ${ filterStatus === "PAID" ? "border-[#C8102E]" : "border-transparent" }`}>
                            <button className={`cursor-pointer sub-font font-medium ${filterStatus === "PAID" ? "text-white" : "text-[#676767]"}`}>Paid</button>
                        </div>

                        <div onClick={() => setFilterStatus("DRAFT")} className={`relative pb-2 flex items-center gap-2 cursor-pointer border-b-2 transition-colors ${ filterStatus === "DRAFT" ? "border-[#C8102E]" : "border-transparent" }`}>
                            <button className={`cursor-pointer sub-font font-medium ${filterStatus === "DRAFT" ? "text-white" : "text-[#676767]"}`}>Draft</button>
                        </div>
                    </nav>
                </div>

                <div className="grid grid-cols-12 gap-4 py-4 px-4 text-[11px] uppercase tracking-widest bg-[#101010] border-l border-r border-b border-[#333333] text-[#888888] sub-font font-medium">
                    <div className="col-span-5 ml-2">Client / Job</div>
                    <div className="col-span-2 text-right">Amount</div>
                    <div className="col-span-2 text-center">Issued · Due</div>
                    <div className="col-span-1 text-center">Status</div>
                    <div className="col-span-2 text-right mr-2">Actions</div>
                </div>

                {invoiceData && invoiceData.map((invoice) => (
                    <div key={invoice.id} className="grid grid-cols-12 gap-4 py-3 px-4 items-center border-b border-r border-l bg-[#161616] border-[#333333]">
                        <div className="col-span-5 flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#C8102E] mt-2 shrink-0"></div>
                            <div>
                                <p className="text-[#7A7A7A] text-[10px] uppercase main-font font-semibold tracking-tighter">INV-0{invoice.id}</p>
                                <h3 className="text-white main-font text-base font-bold">{invoice.title}</h3>
                                <p className="text-[#7A7A7A] sub-font text-xs">{invoice.billingAddress}</p>
                            </div>
                        </div>

                        <div className="col-span-2 text-right">
                            <span className="text-base sub-font text-white font-semibold tracking-tight">${invoice.amount}</span>
                        </div>

                        <div className="col-span-2 text-center">
                            <p className="text-[#888888] sub-font text-sm">Created {new Date(invoice.createdAt).toLocaleDateString()}</p>
                        </div>

                        <div className="col-span-1 flex justify-center">
                            <div className="bg-[#C8102E]/20 border border-[#C8102E]/40 px-3 py-1 rounded flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#C8102E]"></div>
                                <span className="sub-font text-[#C8102E] text-[11px] font-bold uppercase">{invoice.status}</span>
                            </div>
                        </div>

                        <div className="col-span-2 flex justify-end gap-2">
                            <Link to={`/invoices/view/${invoice.id}`} className="sub-font text-sm px-3 py-1 cursor-pointer bg-transparent border border-[#333333] rounded hover:border-[#505050] transition-all text-[#6F6F6F] hover:text-[#808080]">View</Link>
                            <button onClick={() => deleteInvoice(invoice.id)} className="sub-font text-sm px-3 py-1 cursor-pointer bg-transparent border border-[#333333] rounded hover:border-red-900 transition-all text-[#6F6F6F] hover:text-[#C8102E]">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)} />
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)} />
        </>
    );
}