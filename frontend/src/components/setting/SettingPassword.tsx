import { useState } from "react";
import ErrorMessage from "../global/ErrorMessage";
import SuccessMessage from "../global/SuccessMessage";
import { authFetch } from "../../utils/utils";

interface UpdatePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export default function SettingPassword() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [formData, setFormData] = useState<UpdatePasswordRequest>({
        currentPassword: '',
        newPassword: ''
    });

    async function updatePassword(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!formData.currentPassword || !formData.newPassword || !confirmPassword) {
            setErrorMessage("Please fill out all required fields.");
            setTimeout(() => setErrorMessage(null), 3000);
            return;
        }
        
        if (formData.newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            setTimeout(() => setErrorMessage(null), 3000);
            return;
        }

        try {
            const response = await authFetch("", {
                method: "PUT",
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
                setTimeout(() => setSuccessMessage(null), 3000);
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

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: value 
        }));
    };
    
    return (
        <>
            <form onSubmit={updatePassword} className="w-full">
                <div className="mb-6">
                    <h1 className="text-2xl text-white main-font font-semibold">Password</h1>
                    <p className="text-sm sub-font text-[#888888] mt-1">Update your login password.</p>
                </div>

                <div className="w-full h-px bg-[#333333] mb-6" />

                <div className="border border-[#333333] rounded-xl p-5 bg-[#121212]">
                    <h2 className="sub-font font-medium text-base text-[#7A7A7A] pb-5 border-[#333333] border-b">Change Password</h2>

                    <div className="pt-5">
                        <div>
                            <label className="sub-font block text-xs font-medium text-[#888888] mb-2 uppercase tracking-wider">Current Password</label>
                            <input name="currentPassword" type="password" onChange={handleChange} value={formData.currentPassword} placeholder="Current password" className="text-white w-full sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                        </div>

                        <div className="mt-5">
                            <label className="sub-font block text-xs font-medium text-[#888888] uppercase mb-2 tracking-wider">New Password</label>
                            <input name="newPassword" type="password" onChange={handleChange} value={formData.newPassword} placeholder="New password" className="text-white w-full sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                        </div>

                        <div className="mt-5">
                            <label className="sub-font block text-xs font-medium text-[#888888] uppercase mb-2 tracking-wider">Confirm Password</label>
                            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="Confirm Password" className="text-white w-full sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <button type="submit" className="bg-[#C8102E] hover:bg-[#a3152d] transition px-5 py-2 rounded-md text-sm text-white sub-font font-medium">Update Password</button>
                </div>

            </form>

            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)}/>
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)}/>
        </>
    );
}