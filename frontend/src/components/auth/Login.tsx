import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../global/ErrorMessage";
import SuccessMessage from "../global/SuccessMessage";

interface LoginRequestState {
    email: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState<LoginRequestState>({
        email: '',
        password: ''
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name] : value 
        }));
    }

    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault(); 

        if (!formData.email || !formData.password) {
            setErrorMessage("Please fill out all required fields.");
            setTimeout(() => setErrorMessage(null), 3000);
            return;
        }
        
        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const contentType = response.headers.get("content-type");
            let data = null;
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            }

            if (response.ok) {
                setSuccessMessage("Login Successful")
                localStorage.setItem('user', JSON.stringify(data))

                setTimeout(() => {
                    navigate("/home");
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
                    <div className="text-center mb-6">
                        <h2 className="text-white text-2xl sub-font font-semibold mb-2">Welcome back</h2>
                        <p className="text-[#888888] sub-font text-sm">Sign in to manage your operations</p>
                    </div>

                    <div className="h-px bg-[#333333] w-full mb-6"></div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-[10px] font-medium text-[#888888] uppercase tracking-widest mb-2 ml-1">Email Address</label>
                            <input name="email" onChange={handleChange} value={formData.email} type="email" placeholder="john@example.com" className="sub-font w-full bg-[#1E1E1E] border border-[#333333] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                        </div>

                        <div>
                            <label className="block text-[10px] font-medium text-[#888888] uppercase tracking-widest mb-2 ml-1">Password</label>
                            <input name="password" onChange={handleChange} value={formData.password} type="password" placeholder="************" className="sub-font w-full bg-[#1E1E1E] border border-[#333333] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]"/>
                        </div>

                        <button type="submit" className="cursor-pointer w-full bg-[#C8102E] text-white sub-font font-medium py-3 rounded-lg transition-all flex items-center justify-center group">Sign In →</button>

                        <div className="text-center">
                            <Link to="/forgot-password" className="cursor-pointer text-[#C8102E] text-xs font-medium hover:underline transition-colors">Forgot your password?</Link>                    
                        </div>
                    </form>

                    <div className="h-px bg-[#333333] w-full mt-6 mb-6"></div>

                    <p className="text-center text-xs text-[#888888]">Don't have an account?{' '}
                        <Link to="/signup" className="cursor-pointer text-[#C8102E] transition-colors hover:underline">Create one free</Link>
                    </p>
                
                </div>
            </div>

            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)}/>
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)}/>
        </>
    );
}