import { useState } from "react";
import ErrorMessage from "../global/ErrorMessage";
import SuccessMessage from "../global/SuccessMessage";
import { Link, useNavigate } from "react-router-dom";

interface UserData {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
}

interface ProfileModalProps {
    data: UserData;
}

interface ModalData {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

interface MenuSection {
    name: string;
    imgPath: string;
    destination: string;
}

const menuSections: MenuSection[] = [
    { name: "Dashboard", imgPath: "/dashboard_images/graph_icon.png", destination: "/dashboard" },
    { name: "Calendar", imgPath: "/dashboard_images/calendar_icon.png", destination: "/calendar" },
    { name: "Jobs", imgPath: "/dashboard_images/hammer_icon.png", destination: "/jobs" },
    { name: "Quotes", imgPath: "/dashboard_images/doc_icon.png", destination: "/quotes" },
    { name: "Invoices", imgPath: "/dashboard_images/invoice_icon.png", destination: "/invoices" },
]

export default function ProfileModal({ data }: ProfileModalProps) {
    const navigate = useNavigate();
    
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    
    const modalData: ModalData = {firstName: data.firstName, lastName: data.lastName, email: data.email, role: data.role};
    const formattedName = modalData.firstName.charAt(0).toUpperCase() + modalData.firstName.slice(1) + " " + modalData.lastName.charAt(0).toUpperCase() + modalData.lastName.slice(1);
    const formattedRole = modalData.role.charAt(0) + modalData.role.slice(1).toLowerCase();

    async function handleSignOut() {
        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/logout", {
                method: "POST",
                credentials: "include",
            });

        if (!response.ok) {
            setErrorMessage("Logout Failed");            
            setTimeout(() => setErrorMessage(null), 3000);
            return;
        }

        const data = await response.json();
        setSuccessMessage(data.message);
        setTimeout(() => setSuccessMessage(null), 3000);
        localStorage.removeItem("user");
        navigate("/login");

        } catch (error) {
            console.error(error);
            setErrorMessage("An unexpected error occurred. Please try again.");            
            setTimeout(() => setErrorMessage(null), 3000);
        }
    }

    return (
        <>
            <div className="w-80 bg-[#121212] text-gray-300 border border-[#333333] modal-animate">                
                <div className="flex items-center gap-4 p-5 bg-linear-to-b from-[#131313] to-[#1B0508] border-b border-[#333333] modal-section-animate">                    <div className="w-11 h-11 rounded-full bg-[#C8102E] flex items-center justify-center text-white text-lg main-font font-semibold">{modalData.firstName.charAt(0).toUpperCase()}</div>
                    <div>
                        <h2 className="text-white main-font text-base font-semibold leading-tight">{formattedName}</h2>
                        <p className="text-[#7A7A7A] sub-font text-xs pt-0.5">{formattedRole}</p>
                    </div>
                </div>

                <div className="py-2">
                    {menuSections.map((item) => {
                        if ((item.name === "Dashboard" || item.name === "Quotes" || item.name === "Invoices") && data.role !== "ADMIN") {
                            return null;
                        } else {
                            return (
                                <Link to={item.destination} key={item.name}   className="bg-[#131313] flex items-center gap-4 px-5 py-2 cursor-pointer modal-section-animate">
                                    <img src={item.imgPath} alt="" className="w-3 h-3 opacity-100" />
                                    <span className="text-[14px] text-[#888888] sub-font font-medium">{item.name}</span>
                                </Link>
                            );
                        }
                    })}
                </div>

                <div className="border-t border-[#333333] py-2">
                    <Link to="/settings" className="flex items-center gap-4 px-5 py-2 bg-[#131313] cursor-pointer">
                        <img src="/dashboard_images/settings_icon.png" alt="" className="w-3 h-3 opacity-100" />
                        <span className="text-[14px] text-[#888888] sub-font font-medium">Account Settings</span>
                    </Link>
                </div>

                <div className="border-t border-[#333333] px-5 py-3 flex justify-between items-center bg-[#131313]">
                    <span className="text-xs text-[#888888] underline truncate max-w-37.5">{modalData.email}</span>
                    
                    <button onClick={handleSignOut} className="cursor-pointer flex items-center gap-2 text-[#C8102E] font-medium">
                        <span className="text-[14px] text-[#C8102E] sub-font font-medium">Sign Out</span>
                        <img src="/dashboard_images/signout2_icon.png" alt="" className="w-3 h-3" />
                    </button>
                </div>
            </div>

            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)}/>
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)}/>
        </>
    );
}
