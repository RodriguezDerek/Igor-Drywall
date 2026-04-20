import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../global/ErrorMessage";
import SuccessMessage from "../global/SuccessMessage";
import { authFetch } from "../../utils/utils";
import DashboardNavbar from "../navbar/DashboardNavbar";
import { formatDate } from "../../utils/utils";

type InvoiceItem = {
    id: number;
    description: string;
    quantity: number;
    unitPrice: number;
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

export default function InvoiceView() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [invoiceData, setInvoiceData] = useState<InvoiceDTO | null>(null);

    const itemTotal = invoiceData?.items ? invoiceData.items.reduce((sum, item) => sum + item.total, 0) : 0;

    async function getInvoiceData(id: string) {
        try {
            const response = await authFetch(`http://localhost:8080/api/v1/invoices/invoice/${id}`, {
                method: "GET"
            }); 

            if (response.ok) {
                const data: InvoiceDTO = await response.json();
                setInvoiceData(data);
            } else {
                const data = await response.json();
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

    async function deleteInvoice(id: string) {
        try {
            const response = await authFetch(`http://localhost:8080/api/v1/invoices/invoice/${id}`, {
                method: "DELETE"
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
                setTimeout(() => {
                    setSuccessMessage(null)
                    navigate("/invoices");
                }, 1500);
            } else {
                setErrorMessage(data.message);
                setTimeout(() => setErrorMessage(null), 3000)
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
        if (!id) return;

        getInvoiceData(id);
    }, [id]);

    return (
        <>
            <div className="flex min-h-screen">
                <DashboardNavbar />
                    
                <div className="ml-64 flex-1 flex flex-col">
                    <header className="flex items-center justify-between bg-[#161616] px-8 py-4 text-white border-b border-[#333333]">

                        <div className="flex flex-col">
                            <h1 className="main-font text-lg font-semibold tracking-wide">Invoice #INV-0{id}</h1>
                            <nav className="flex items-center gap-2 mt-1 text-xs font-normal">
                                <span className="text-[#888888] cursor-pointer">Invoices</span>
                                <span className="text-[#C8102E] text-[10px] select-none">&gt;</span>
                                <span className="text-[#888888]">#INV-0{id}</span>
                            </nav>
                        </div>

                        <div className="flex items-center gap-6">
                            <span className="text-xs font-semibold text-[#C8102E] bg-[#C8102E]/10 px-3 py-2 rounded border border-[#C8102E]/20">• {invoiceData?.status}</span>

                            <div className="flex justify-center items-center">                    
                                <Link to="/invoices" type="button" className="text-xs sub-font font-semibold cursor-pointer text-[#888888] hover:text-white px-4 py-2">← Back</Link>
                            </div>

                            <div className="flex justify-center items-center mr-3">                    
                                <Link to={`/invoices/edit/${id}`} type="button" className="text-xs sub-font rounded font-semibold cursor-pointer border border-[#333333] text-[#888888] hover:text-white px-4 py-2">Edit</Link>
                            </div>

                            <div className="flex items-center">                    
                                <button type="button" className="cursor-pointer rounded bg-[#C8102E] px-4 py-2 text-xs sub-font font-semibold text-white">Convert to Excel</button>
                            </div>
                        </div>

                    </header>
                                    
                    <main className="p-6 bg-[#090909] h-full">
                        <div className="grid grid-cols-12 gap-6">
                            <main className="col-span-9 bg-[#0D0D0D] border border-[#333333] rounded-lg overflow-hidden shadow-2xl">
                                
                                <div className="p-4 border-b border-[#333333] flex justify-between items-center">
                                    <span className="text-xs uppercase tracking-widest sub-font text-[#888888] font-semibold">Invoice Preview</span>
                                    <button className="text-xs text-[#888888] sub-font cursor-pointer bg-transparent hover:bg-white/10 px-3 py-1.5 rounded border border-[#333333] flex items-center gap-2">↓ Download PDF</button>
                                </div>

                                <div className="p-8">
                                    <div className="flex justify-between mb-12">
                                        <div>
                                            <h2 className="text-2xl font-black main-font text-[#C8102E]/90 tracking-tight uppercase italic">IGOR DRYWALL CO LLC</h2>
                                            <p className="text-[10px] text-[#888888] sub-font mt-1 uppercase tracking-widest font-semibold">Operations Platform · (203) 675-8166</p>
                                        </div>

                                        <div className="text-right">
                                            <p className="sub-font text-[10px] text-[#888888] uppercase font-bold mb-1">Bill To</p>
                                            <h3 className="sub-font text-[#d6d6d6] font-bold">{invoiceData?.clientName}</h3>
                                            <p className="sub-font text-xs text-[#888888]">{invoiceData?.billingAddress}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-baseline gap-4 mb-8">
                                        <h4 className="text-4xl main-font text-[#d6d6d6] font-bold">#INV-0{id}</h4>
                                        <span className="text-xs font-semibold text-[#C8102E] bg-[#C8102E]/10 px-3 py-1 rounded border border-[#C8102E]/20">• {invoiceData?.status}</span>
                                    </div>

                                    <div className="grid grid-cols-2 bg-[#0C0C0C] border border-[#333333] rounded-lg p-4 mb-12">
                                        <div>
                                            <p className="sub-font text-[11px] text-[#888888] uppercase font-bold mb-1">Issue Date</p>
                                            <p className="sub-font text-[15px] text-[#d6d6d6]">January 30, 2026</p>
                                        </div>
                                        <div>
                                            <p className="sub-font text-[11px] text-[#888888] uppercase font-bold mb-1">Due Date</p>
                                            <p className="sub-font text-[15px] text-[#C8102E]/90 font-bold">February 14, 2026 — Overdue</p>
                                        </div>
                                    </div>

                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-[#333333] text-[11px] sub-font uppercase text-[#888888] tracking-widest font-medium">
                                                <th className="pb-4">Description</th>
                                                <th className="pb-4 text-center">Qty</th>
                                                <th className="pb-4 text-right">Unit Price</th>
                                                <th className="pb-4 text-right">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm divide-y divide-white/5">
                                            {invoiceData && invoiceData.items.length > 0 ? (
                                                invoiceData.items.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="sub-font py-5 text-[#888888]">{item.description}</td>
                                                        <td className="sub-font py-5 text-center text-[#888888]">{item.quantity}</td>
                                                        <td className="sub-font py-5 text-right text-[#888888]">{item.unitPrice}</td>
                                                        <td className="sub-font py-5 text-right text-[#888888]">{item.total}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="py-5 text-center text-[#888888] sub-font">
                                                        No items found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>

                                    <div className="flex flex-col items-end border-b border-[#333333] pt-6">
                                        <div className="flex justify-between w-48 text-xs mb-6">
                                            <span className="text-[#888888] text-sm sub-font font-medium uppercase">Material Total</span>
                                            <span className="text-[#d6d6d6] text-sm sub-font font-medium">${itemTotal}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end text-right gap-6 w-full mt-4">
                                        <span className="text-[14px] sub-font text-[#888888] uppercase font-semibold">Total Due</span>
                                        <span className="text-3xl main-font text-[#C8102E]/90 font-semibold">${invoiceData?.amount}</span>
                                    </div>

                                    <div className="mt-12 text-[11px] sub-font text-[#888888] space-y-1">
                                        <p>Thank you for your business. Payment is due within 14 days of invoice date.</p>
                                        <p><span className="font-bold uppercase">Payment:</span> Bank transfer to Chase — Account 0042-8821 — Routing 021000021</p>
                                    </div>
                                </div>        
                            </main>

                            <aside className="col-span-3 space-y-6">
                                
                                <div className="bg-[#0D0D0D] border border-[#333333] rounded-xl p-6">
                                    <div className="border-b border-[#333333] w-full pb-4">
                                        <h5 className="text-[12px] text-[#888888] sub-font uppercase font-semibold tracking-widest">Details</h5>
                                    </div>
                                    
                                    <div className="space-y-4 pt-4">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-[#888888] sub-font uppercase font-semibold">Invoice</span>
                                            <span className="text-[#888888] sub-font font-medium">#INV-0{id}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-[#888888] sub-font uppercase font-semibold">Client</span>
                                            <span className="text-[#888888] sub-font font-medium">{invoiceData?.clientName}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-[#888888] sub-font uppercase font-semibold">Job</span>
                                            <span className="text-[#888888] sub-font font-medium">{invoiceData?.title}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-[#888888] sub-font uppercase font-semibold">Issued</span>
                                            <span className="text-[#888888] sub-font font-medium">{invoiceData?.createdAt ? formatDate(invoiceData.createdAt) : "-"}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-[#888888] sub-font uppercase font-semibold">Due</span>
                                            <span className="text-[#C8102E] sub-font font-medium">{invoiceData?.dueDate ? formatDate(invoiceData.dueDate) : "-"}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline pt-4">
                                            <span className="text-[10px] text-gray-500 uppercase sub-font font-semibold">Total</span>
                                            <span className="text-2xl font-serif text-[#C8102E] main-font font-semibold italic leading-none">${invoiceData?.amount}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-[#0D0D0D] border border-[#333333] rounded-xl p-6">
                                    <h5 className="text-[12px] text-[#888888] sub-font uppercase font-semibold tracking-widest pb-4">Details</h5>
                                    
                                    <div className="space-y-3 sub-font">
                                        <Link to={`/invoices/edit/${id}`} className="w-full border border-[#333333] text-white text-sm font-medium py-2 rounded-lg flex items-center justify-center gap-2">Edit Invoice</Link>
                                        <button className="w-full border border-[#333333] text-white text-sm font-medium py-2 rounded-lg flex items-center justify-center gap-2">Download PDF</button>
                                        <button onClick={() => id && deleteInvoice(id)}className="w-full bg-[#C8102E]/10 hover:bg-[#C8102E]/20 border border-[#C8102E] text-[#C8102E] text-sm font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-all mt-4">Delete Invoice</button>
                                    </div>
                                </div>
                                
                            </aside>                        
                        </div>
                    </main>
                </div>
            </div>


            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)} />
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)} />
        </>
    );
}