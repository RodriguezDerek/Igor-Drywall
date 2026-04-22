import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../global/ErrorMessage';
import SuccessMessage from '../global/SuccessMessage';
import { formatPhoneNumber } from '../../utils/utils';

interface SignUpRequestState {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export default function SignUp() {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); 
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [formData, setFormData] = useState<SignUpRequestState>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: ''
    });

    function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(e.target.value);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: name === "phoneNumber" ? formatPhoneNumber(value) : value 
        }));
    }

    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.phoneNumber || !confirmPassword) {
            setErrorMessage("Please fill out all required fields.");
            setTimeout(() => setErrorMessage(null), 3000);
            return;
        }

        if (formData.password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            setTimeout(() => setErrorMessage(null), 3000);
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
                setTimeout(() => {
                    navigate("/login");
                }, 1500);

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
            <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center p-4 font-sans selection:bg-red-500/30">
                <div className="mb-8 text-center">
                        <Link to="/home" className="block text-white text-3xl main-font font-bold mb-2 hover:opacity-90 transition-opacity">Igor Drywall Co LLC</Link>
                        <p className="text-[#888888] sub-font text-sm tracking-wide uppercase">Access your operations dashboard</p>
                </div>

                <div className="w-full max-w-120 bg-[#161616] border border-[#333333] rounded-2xl pl-8 pb-8 pr-8 pt-6 shadow-2xl">
                    <div className="text-center mb-4">
                        <h2 className="text-white text-lg font-semibold">Create Account</h2>
                    </div>

                    <div className="h-px bg-[#333333] w-full mb-6"></div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-medium text-[#888888] uppercase tracking-widest mb-2 ml-1">First Name</label>
                                <input required name="firstName" onChange={handleChange} value={formData.firstName} type="text" placeholder="Enter first name" className="sub-font w-full bg-[#1E1E1E] border border-[#333333] rounded-lg py-2 px-4 text-white focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                            </div>


                            <div>
                                <label className="block text-[10px] font-medium text-[#888888] uppercase tracking-widest mb-2 ml-1">Last Name</label>
                                <input required name="lastName" onChange={handleChange} value={formData.lastName} type="text" placeholder="Enter last name" className="sub-font w-full bg-[#1E1E1E] border border-[#333333] rounded-lg py-2 px-4 text-white focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-medium text-[#888888] uppercase tracking-widest mb-2 ml-1">Email</label>
                            <input required name="email" onChange={handleChange} value={formData.email} type="email" placeholder="you@example.com" className="sub-font w-full bg-[#1E1E1E] border border-[#333333] rounded-lg py-2 px-4 text-white focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                        </div>

                        <div>
                            <label className="block text-[10px] font-medium text-[#888888] uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                            <input required name="phoneNumber" onChange={handleChange} value={formData.phoneNumber} type="tel" maxLength={12} placeholder="000-000-0000" className="sub-font w-full bg-[#1E1E1E] border border-[#333333] rounded-lg py-2 px-4 text-white focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                        </div>

                        <div>
                            <label className="block text-[10px] font-medium text-[#888888] uppercase tracking-widest mb-2 ml-1">Password</label>
                            <input required name="password" onChange={handleChange} value={formData.password} type="password" placeholder="Enter password" className="sub-font w-full bg-[#1E1E1E] border border-[#333333] rounded-lg py-2 px-4 text-white focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                        </div>

                        <div>
                            <label className="block text-[10px] font-medium text-[#888888] uppercase tracking-widest mb-2 ml-1">Confirm Password</label>
                            <input required name="confirmPassword" onChange={handleConfirmPasswordChange} value={confirmPassword} type="password" placeholder="Confirm password" className="sub-font w-full bg-[#1E1E1E] border border-[#333333] rounded-lg py-2 px-4 text-white focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                        </div>

                        <button type="submit" className="cursor-pointer w-full bg-[#C8102E] text-white sub-font font-medium py-2 rounded-lg transition-all flex items-center justify-center group">Create Account →</button>
                    </form>

                    <div className="h-px bg-[#333333] w-full mt-6 mb-6"></div>

                    <p className="text-center text-xs text-[#888888]">Already have an account?{' '}
                        <Link to="/login" className="cursor-pointer text-[#C8102E] transition-colors hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>

            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)}/>
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)}/>
        </>
    );
}