import { useState } from "react";
import DashboardNavbar from "../navbar/DashboardNavbar";
import ErrorMessage from "../global/ErrorMessage";
import SuccessMessage from "../global/SuccessMessage";
import { authFetch } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

type InvoiceItemRequest = {
    description: string;
    quantity: number;
    unitPrice: number;
}

type InvoiceRequest = {
    title: string;
    status: string;
    issueDate: string;
    dueDate: string;
    clientName: string;
    billingAddress: string;
    notes: string;
    paymentInstructions: string;
    amount: number;
    items: InvoiceItemRequest[] | []
}

export default function InvoiceCreate() {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState<InvoiceRequest>({
        title: "",
        status: "DRAFT",
        issueDate: "",
        dueDate: "",
        clientName: "",
        billingAddress: "",
        notes: "",
        paymentInstructions: "",
        amount: 0.00,
        items: []
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ 
           ...prev, 
           [name]: value
        }));
    };

    function validateInvoice(data: InvoiceRequest): string | null {
        if (!data.title.trim()) return "Title is required";
        if (!data.issueDate) return "Issue date is required";
        if (!data.dueDate) return "Due date is required";
        if (!data.clientName.trim()) return "Client name is required";
        if (!data.billingAddress.trim()) return "Billing address is required";
        if (!data.notes.trim()) return "Notes are required";
        if (!data.paymentInstructions.trim()) return "Payment instructions is required";

        if (!data.items || data.items.length === 0) {
            return "At least one item is required";
        }

        for (let i = 0; i < data.items.length; i++) {
            const item = data.items[i];

            if (!item.description.trim()) {
                return `Item ${i + 1}: description is required`;
            }
            if (item.quantity <= 0) {
                return `Item ${i + 1}: quantity must be greater than 0`;
            }
            if (item.unitPrice <= 0) {
                return `Item ${i + 1}: unit price must be greater than 0`;
            }
        }

        return null;
    }

    function addItem() {
        setFormData(prev => ({
            ...prev, items: [...prev.items, { description: "", quantity: 0, unitPrice: 0 }]
        }));
    }

    function updateItem(index: number, field: keyof InvoiceItemRequest, value: string | number) {
        setFormData(prev => ({
            ...prev,
            items: prev.items.map((item, i) => i === index ? { ...item, [field]: field === "description" ? value : Number(value) } : item)
        }));
    }

    function removeItem(index: number) {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    }

    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        
        const error = validateInvoice(formData);

        if (error) {
            setErrorMessage(error);
            setTimeout(() => setErrorMessage(null), 3000);
            return;
        }

        try {
            const response = await authFetch("http://localhost:8080/api/v1/invoices/invoice", {
                method: "POST",
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message)
                setTimeout(() => {
                    setSuccessMessage(null)
                    navigate("/invoices");
                }, 1000);

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

    return (
        <>
            <div className="flex min-h-screen">
                <DashboardNavbar />
                
                <div className="ml-64 flex-1 flex flex-col bg-white">
                    <header className="flex items-center justify-between bg-[#161616] px-8 py-4 text-white border-b border-[#333333]">
                        <div className="flex flex-col">
                            <h1 className="main-font text-lg font-semibold tracking-wide">New Invoice</h1>
                            <nav className="flex items-center gap-2 mt-1 text-xs font-normal">
                                <span className="text-[#888888] cursor-pointer">Invoices</span>
                                <span className="text-[#C8102E] text-[10px] select-none">&gt;</span>
                                <span className="text-[#888888]">Create Invoice</span>
                            </nav>
                        </div>
                    </header>
                                    
                    <main className="p-8 bg-[#090909] h-full">
                        <form onSubmit={handleSubmit} className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* Left Column: Form Details */}
                            <div className="lg:col-span-2 space-y-6">
                            
                                <section className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-6">
                                    <h2 className="sub-font text-xs font-semibold uppercase tracking-widest text-[#888888] mb-6">Invoice Details</h2>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-1">
                                            <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888] mb-2">Title</label>
                                            <input required name="title" value={formData.title} onChange={handleChange} placeholder="Enter invoice title" type="text" className="text-[#888888] w-full sub-font font-normal bg-[#111111] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                                        </div>

                                        <div className="col-span-1">
                                            <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888] mb-2">Status</label>
                                            <select required name="status" value={formData.status} onChange={handleChange} className="text-[#888888] w-full sub-font font-normal bg-[#111111] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors">
                                                <option value="DRAFT">Draft</option>
                                                <option value="UNPAID">Unpaid</option>
                                                <option value="PAID">Paid</option>
                                            </select>
                                        </div>

                                        <div className="col-span-1">
                                            <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888] mb-2">Issue Date</label>
                                            <input required name="issueDate" value={formData.issueDate} onChange={handleChange} type="date" className="text-[#888888] w-full sub-font font-normal bg-[#111111] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                                        </div>

                                        <div className="col-span-1">
                                            <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888] mb-2">Due Date</label>
                                            <input required name="dueDate" value={formData.dueDate} onChange={handleChange} type="date" className="text-[#888888] w-full sub-font font-normal bg-[#111111] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                                        </div>
                            
                                    </div>
                                </section>

                                <section className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-6">
                                    <h2 className="sub-font text-xs font-semibold uppercase tracking-widest text-[#888888] mb-6">Material Items</h2>

                                    <div className="space-y-4">

                                        {/* HEADER */}
                                        <div className="grid grid-cols-12 gap-2 text-[10px] uppercase font-semibold text-[#888888] px-1">
                                            <div className="col-span-7">Description</div>
                                            <div className="col-span-1 text-center">Qty</div>
                                            <div className="col-span-2 text-center">Unit Price</div>
                                            <div className="col-span-1 text-right">Total</div>
                                            <div className="col-span-1"></div>
                                        </div>

                                        {/* ROWS */}
                                        {formData.items.map((item, index) => {
                                            const lineTotal = item.quantity * item.unitPrice;

                                            return (
                                                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                                                    <input type="text" placeholder="Enter item description" value={item.description} onChange={(e) => updateItem(index, "description", e.target.value)} className="col-span-7 bg-[#111111] border border-[#333333] rounded px-3 py-2 text-sm text-[#888888]" />
                                                    <input type="number" min={0} placeholder="0" value={item.quantity} onChange={(e) => updateItem(index, "quantity", e.target.value)} className="col-span-1 bg-[#111111] border border-[#333333] rounded px-1 py-2 text-center text-sm text-[#888888]"/>
                                                    <input type="number" min={0 }placeholder="0.00" value={item.unitPrice} onChange={(e) => updateItem(index, "unitPrice", e.target.value)} className="col-span-2 bg-[#111111] border border-[#333333] rounded px-3 py-2 text-center text-sm text-[#888888]"/>
                                                    <div className="col-span-1 text-right text-sm text-[#888888] sub-font">${lineTotal.toFixed(2)}</div>
                                                    <button type="button" onClick={() => removeItem(index)} className="col-span-1 text-red-500 text-xs text-right">✕</button>
                                                </div>
                                            );
                                        })}

                                        <button type="button" onClick={addItem} className="text-[#888888] sub-font font-medium text-xs mt-4 transition-colors">+ Add Item</button>
                                    </div>

                                    {/* TOTAL */}
                                    <div className="mt-8 border-t border-[#333333] pt-4 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#888888] sub-font">Material Total</span>
                                            <span className="text-[#888888] sub-font">${formData.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-6">
                                    <h2 className="sub-font text-xs font-semibold uppercase tracking-widest text-[#888888] mb-6">Bill To</h2>
                                    
                                    <div className="mb-4">
                                        <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888] mb-2">Client</label>
                                        <input required name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Enter client name" type="text" className="text-[#888888] w-full sub-font font-normal bg-[#111111] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888] mb-2">Billing Address</label>
                                        <input required name="billingAddress" value={formData.billingAddress} onChange={handleChange} placeholder="Enter billing address" type="text" className="text-[#888888] w-full sub-font font-normal bg-[#111111] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                                    </div>

                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888] mb-2">Invoice Total Amount</label>
                                        <input required name="amount" value={formData.amount} onChange={handleChange} placeholder="Enter Tota Amount for Invoice" type="text" className="text-[#888888] w-full sub-font font-normal bg-[#111111] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                                    </div>

                                </section>                        

                                <section className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-6">
                                    <h2 className="sub-font text-xs font-semibold uppercase tracking-widest text-[#888888] mb-6">Notes & Terms</h2>
                                    
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888] mb-2">Notes to Client</label>
                                            <textarea required name="notes" value={formData.notes} onChange={handleChange} placeholder="Enter notes to client" className="text-[#888888] w-full sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                                        </div>

                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888] mb-2">Payment Instructions</label>
                                            <textarea required name="paymentInstructions" value={formData.paymentInstructions} onChange={handleChange} placeholder="Enter payment instructions" className="text-[#888888] w-full sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Right Column: Summary */}
                            <div className="space-y-6">
                                <section className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-6">
                                    <h2 className="text-xs sub-font font-semibold uppercase tracking-widest text-[#888888] mb-6">Summary</h2>
                                    
                                    <div className="space-y-4 text-xs">
                                        <div className="flex justify-between">
                                            <span className="uppercase text-[#888888] sub-font font-medium">Title</span>
                                            <span className="text-[#C5C1BA] sub-font">{formData.title}</span>
                                        </div>
                                        
                                        <div className="flex justify-between">
                                            <span className="uppercase text-[#888888] sub-font font-medium">Client</span>
                                            <span className="text-[#C5C1BA] sub-font">{formData.clientName}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="uppercase text-[#888888] sub-font font-medium">Status</span>
                                            <span className="text-[#C5C1BA] sub-font">{formData.status}</span>
                                        </div>
                                        
                                        <div className="flex justify-between">
                                            <span className="uppercase text-[#888888] sub-font font-medium">Due</span>
                                            <span className="text-[#C5C1BA] sub-font">{formData.dueDate}</span>
                                        </div>
                                        
                                        <div className="flex justify-between">
                                            <span className="uppercase text-[#888888] sub-font font-medium">Items</span>
                                            <span className="text-[#C5C1BA] sub-font">{formData.items.length}</span>
                                        </div>
                                        
                                        <div className="flex justify-between items-end pt-4">
                                            <span className="uppercase text-[#888888]">Total</span>
                                            <span className="text-xl main-font text-[#C8102E] font-semibold">${formData.amount}</span>
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-6">
                                    <h3 className="text-[14px] font-semibold sub-font text-[#C8102E] uppercase mb-2">Ready to send?</h3>
                                    <p className="text-[13px] text-[#888888] mb-6 leading-relaxed sub-font">Review the invoice details and submit to create it.</p>
                                    <button type="submit" className="w-full bg-[#C8102E] text-white font-semibold py-2 rounded sub-font text-sm mb-4 cursor-pointer">Submit</button>
                                </section>
                            </div>

                        </form>
                    </main>
                </div>
            </div>

            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)}/>
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)}/>
        </>
    );
}