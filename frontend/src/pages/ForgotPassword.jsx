import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SuccessToast from "../components/SuccessToast";
import ErrorToast from "../components/ErrorToast";


function ForgotPassword(){
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    function handleEmailChange(event){
        setEmail(event.target.value);
    }

    async function handleSubmit(event){
        event.preventDefault();

        if(!email.trim()){
            setErrorMessage("Email is required.");
            return;
        }

        try{
            const response = await fetch("http://localhost:8080/api/v1/auth/forgot-password", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email.trim()
                })
            });

            if(response.ok){
                const data = await response.json();
                setSuccessMessage(data.message);
                setErrorMessage("");
                return;
                
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "An error occurred when trying to send reset password email.")
                return;
            }

        } catch(error){
            console.error("Forgot Password:", error);
            setErrorMessage("An error occurred while sending the reset link. Please try again later.");
            setSuccessMessage("");
        }
    }

    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      
            <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8 text-center">
                
                {/* Icon */}
                <div className="mb-4 flex justify-center">
                    <div className="bg-red-100 p-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-red-700 mb-2">Forgot Password</h2>
                <p className="text-sm text-gray-600 mb-6">Enter your email and we'll send you a link to reset your password.</p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email" className="w-full h-12 bg-gray-100 rounded px-4 py-2 placeholder:text-sm" placeholder="you@example.com" value={email} onChange={handleEmailChange} />
                    
                    <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
                    <SuccessToast message={successMessage} onClose={() => setSuccessMessage("")} />

                    <button type="submit" className="bg-red-700 text-white py-3 px-6 rounded-md w-full mt-2 font-medium hover:bg-red-800 transition">Submit</button>
                </form>

                {/* Back to login */}
                <div className="mt-6">
                    <Link to="/login" className="text-sm text-red-700 hover:underline">← Back to Login</Link>
                </div>
            </div>

        </div>
    );
} 
export default ForgotPassword;