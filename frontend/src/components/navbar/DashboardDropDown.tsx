import SuccessMessage from "../global/SuccessMessage";
import ErrorMessage from "../global/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface DashboardDropDownProps {
    userRole: string;
}

interface MenuSection {
    name: string;
    imgPath: string;
    destination: string;
}

const overviewSections: MenuSection[] = [
    { name: "Dashboard", imgPath: "/dashboard_images/graph_icon.png", destination: "/dashboard" },
    { name: "Calendar", imgPath: "/dashboard_images/calendar_icon.png", destination: "/calendar" }
]

const manageSections: MenuSection[] = [
    { name: "Jobs", imgPath: "/dashboard_images/hammer_icon.png", destination: "/jobs" },
    { name: "Workers", imgPath: "/dashboard_images/person_icon.png", destination: "/workers" },
    { name: "Quotes", imgPath: "/dashboard_images/doc_icon.png", destination: "/quotes"},
    { name: "Invoices", imgPath: "/dashboard_images/invoice_icon.png", destination: "/invoices"}
]

const signoutSection = [
    { name: "Sign Out", imgPath: "/dashboard_images/signout_icon.png" }
]

const groups = [
    { label: "Overview", items: overviewSections },
    { label: "Manage", items: manageSections }
];

export default function DashboardDropDown({ userRole }: DashboardDropDownProps) {
    const navigate = useNavigate();
    
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
            <div className="w-50 bg-[#131313] text-[#e0e0e0] border border-[#333333] dropdown-animate">
                {groups.map((group) => (
                    <div key={group.label} className="border-b border-[#333333] pb-1">
                        <h3 className="px-4 pt-3 pb-1 text-xs sub-font font-medium text-[#888888] uppercase tracking-wider">{group.label}</h3>

                        <ul className="space-y-0.5">
                            {group.items.map((item) => {
                                if ((item.name === "Dashboard" || item.name === "Quotes" || item.name === "Invoices") && userRole !== "ADMIN") {
                                    return null
                                } else {
                                    return (
                                        <Link to={item.destination} key={item.name}   className="flex items-center gap-3 px-4 py-2 cursor-pointer dropdown-item-animate">
                                            <img src={item.imgPath} alt="" className="w-3 h-3 opacity-70 mr-1" />
                                            <span className="text-sm text-[#888888] sub-font font-normal">{item.name}</span>
                                        </Link>
                                    );
                                }
                            })}
                        </ul>
                    </div>
                ))}
                
                <div className="py-2">
                    {signoutSection.map((item) => (
                        <button onClick={handleSignOut} key={item.name} className="flex items-center gap-3 px-4 py-2 cursor-pointer">
                            <img src={item.imgPath} alt="" className="w-3 h-3 opacity-70 mr-1" />
                            <span className="text-sm text-[#888888] sub-font font-normal">{item.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)}/>
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)}/>
        </>
    );
}