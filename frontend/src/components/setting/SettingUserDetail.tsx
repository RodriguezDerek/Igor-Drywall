import { useState } from "react";
import { authFetch, formatPhoneNumber } from "../../utils/utils";
import ErrorMessage from "../global/ErrorMessage";
import SuccessMessage from "../global/SuccessMessage";

interface UserData {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
}

interface SettingUserDetailProp {
    userData: UserData;
}

interface UpdateUserDetailsRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export default function SettingUserDetail({ userData }: SettingUserDetailProp) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState<UpdateUserDetailsRequest>({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: formatPhoneNumber(userData.phoneNumber)
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: name === "phoneNumber" ? formatPhoneNumber(value) : value 
        }));
    };

    async function UpdateUserDetails(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            const response = await authFetch(`http://localhost:8080/api/v1/users/user/details/${userData.userId}`, {
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

    return (
        <>
            <form onSubmit={UpdateUserDetails} className="w-full">
                <div className="mb-6">
                    <h1 className="text-2xl text-white main-font font-semibold">Profile</h1>
                    <p className="text-sm sub-font text-[#888888] mt-1">Your name, contact details, and role.</p>
                </div>

                <div className="w-full h-px bg-[#333333] mb-6" />

                <div className="border border-[#333333] rounded-xl p-5 bg-[#121212]">
                    <h2 className="sub-font font-medium text-base text-[#7A7A7A] pb-5 border-[#333333] border-b">Personal Information</h2>

                    <div className="grid grid-cols-2 gap-6 pt-5">
                        <div>
                            <label className="sub-font block text-xs font-medium text-[#888888] mb-2 tracking-wider">FIRST NAME</label>
                            <input name="firstName" onChange={handleChange} value={formData.firstName} type="text" placeholder="First name" className="text-white w-full sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                        </div>

                        <div>
                            <label className="sub-font block text-xs font-medium text-[#888888] mb-2 tracking-wider">LAST NAME</label>
                            <input name="lastName" onChange={handleChange} value={formData.lastName} type="text" placeholder="Last name" className="text-white w-full sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                        </div>

                        <div>
                            <label className="sub-font block text-xs font-medium text-[#888888] mb-2 tracking-wider">EMAIL ADDRESS</label>
                            <input name="email" onChange={handleChange} value={formData.email} type="text" placeholder="Email" className="text-white w-full sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                        </div>

                        <div>
                            <label className="sub-font block text-xs font-medium text-[#888888] mb-2 tracking-wider">PHONE NUMBER</label>
                            <input name="phoneNumber" onChange={handleChange} value={formData.phoneNumber} type="text" placeholder="Phone number" className="text-white w-full sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <button type="submit" className="bg-[#C8102E] hover:bg-[#a3152d] transition px-5 py-2 rounded-md text-sm text-white sub-font font-medium">Update Info</button>
                </div>

            </form>

            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)}/>
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)}/>
        </>
    );
}