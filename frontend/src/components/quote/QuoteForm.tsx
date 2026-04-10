import { useState } from "react";
import { formatPhoneNumber } from "../../utils/utils";
import ErrorMessage from "../global/ErrorMessage";
import SuccessMessage from "../global/SuccessMessage";

interface CreateQuoteRequestState {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    propertyAddress: string;
    serviceType: string;
    propertyType: string;
    projectDescription: string;
    startDate: string;
    budgetRange: string;
}

export default function QuoteForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState<CreateQuoteRequestState> ({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        propertyAddress: '',
        serviceType: '',
        propertyType: '',
        projectDescription: '',
        startDate: '',
        budgetRange: ''
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: name === "phoneNumber" ? formatPhoneNumber(value) : value 
        }));
    };

    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.propertyAddress || !formData.serviceType || !formData.propertyType || !formData.projectDescription || !formData.startDate ||  !formData.budgetRange) {
            setErrorMessage("Please fill out all required fields.");
            setTimeout(() => setErrorMessage(null), 3000);
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/v1/quotes/quote", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json()

            if (response.ok) {
                setSuccessMessage(data.message);
                setTimeout(() => setSuccessMessage(null), 3000);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    propertyAddress: '',
                    serviceType: '',
                    propertyType: '',
                    projectDescription: '',
                    startDate: '',
                    budgetRange: ''
                });
                
            } else {
                setErrorMessage(data.message);
                setTimeout(() => setErrorMessage(null), 3000);
            }

        } catch (error) {
            console.error(error);
            setErrorMessage("An unexpected error occurred. Please try again.");            
            setTimeout(() => setErrorMessage(null), 3000);
        }
    }
    
    return (
        <>
            <div className="bg-[#161616] text-white py-12 px-10 w-full border-b border-[#333333]">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">                
                        <section>
                            <h2 className="text-3xl font-semibold main-font mb-2">Your Information</h2>
                            <hr className="border-[#333333] mb-8" />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888]">First Name</label>
                                    <input required name="firstName" onChange={handleChange} value={formData.firstName} type="text" placeholder="First name" className="sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888]">Last Name</label>
                                    <input required name="lastName" onChange={handleChange} value={formData.lastName} type="text" placeholder="Smith" className="sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 mb-3">
                                <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888]">Email Address</label>
                                <input name="email" onChange={handleChange} value={formData.email} type="email" placeholder="johnsmith@email.com" className="sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                            </div>

                            <div className="flex flex-col gap-2 mb-3">
                                <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888]">Phone Number</label>
                                <input required name="phoneNumber" onChange={handleChange} value={formData.phoneNumber} type="tel" placeholder="000-000-0000" maxLength={12} className="sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888]">Property Address</label>
                                <input required name="propertyAddress" onChange={handleChange} value={formData.propertyAddress} type="text" placeholder="123 Main Street, City" className="sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-semibold main-font mb-2">Project Details</h2>
                            <hr className="border-[#333333] mb-8" />

                            <div className="flex flex-col gap-2 mb-3">
                                <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888]">Service Type</label>
                                <select required name="serviceType" onChange={handleChange} value={formData.serviceType} className={`sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors ${formData.serviceType === "" ? "text-[#484848]" : "text-white"}`}>
                                    <option value="">Select a service...</option>
                                    <option value="DRYWALL_INSTALLATION">Installation</option>
                                    <option value="DRYWALL_REPAIR">Repair</option>
                                    <option value="WALL_AND_CEILING_FINISHING">Finishing</option>
                                    <option value="TAPING_AND_MUDDING">Taping & Mudding</option>
                                    <option value="COMMERCIAL_DRYWALL">Commerical Drywall</option>
                                    <option value="SKIM_COAT">Skim Coat</option>
                                    <option value="MULTIPLE">Multiple</option>                         
                                </select>
                            </div>

                            <div className="flex flex-col gap-2 mb-3">
                                <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888]">Project Type</label>
                                <select required name="propertyType" onChange={handleChange} value={formData.propertyType} className={`sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors ${formData.propertyType === "" ? "text-[#484848]" : "text-white"}`}>
                                    <option value="">Select a project...</option>
                                    <option value="RESIDENTIAL_HOUSE">House</option>
                                    <option value="RESIDENTIAL_APARTMENT">Apartment</option>
                                    <option value="COMMERCIAL_BUILDING">Commerical Building</option>    
                                    <option value="INDUSTRIAL">Industrial Building</option>                                      
                                </select>
                            </div>

                            <div className="flex flex-col gap-2 mb-3">
                                <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888]">Project Description</label>
                                <textarea required name="projectDescription" onChange={handleChange} value={formData.projectDescription} rows={5} placeholder="Describe the work needed — include size, scope, urgency, and any relevant details..." className="sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888]">Start Date</label>
                                    <input required name="startDate" onChange={handleChange} value={formData.startDate} type="date" className={`sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors ${formData.startDate === "" ? "text-[#484848]" : "text-white"}`}/>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-widest sub-font font-medium text-[#888888]">Budget Range</label>
                                    <select required name="budgetRange" onChange={handleChange} value={formData.budgetRange} className={`sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors ${formData.budgetRange === "" ? "text-[#484848]" : "text-white"}`}>
                                        <option value="">Select a budget...</option>
                                        <option value="under-1k">Under $1,000</option>
                                        <option value="1k-5k">$1,000 - $5,000</option>
                                        <option value="5k-10k">$5,000 - $10,000</option>
                                        <option value="10k-25k">$10,000 - $25,000</option>
                                        <option value="25k-50k">$25,000 - $50,000</option>
                                        <option value="50k-plus">$50,000+</option>                                     
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="cursor-pointer w-full bg-[#C8102E] hover:bg-[#A60D26] text-white sub-font font-semibold py-2 rounded transition-colors flex items-center justify-center gap-2">Submit Quote Request <span className="text-lg sub-font">→</span></button>

                            <p className="text-center text-[10px] text-[#717171] mt-6 tracking-wide">By submitting, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.</p>
                            
                        </section>

                    </form>
                </div>
            </div>

            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)}/>
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)}/>
        </>
    );
}