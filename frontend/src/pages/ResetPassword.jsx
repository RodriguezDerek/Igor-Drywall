import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function ResetPassword(){
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    function handleNewPassword(event){
        setNewPassword(event.target.value);
    }

    function handleConfirmPassword(event){
        setConfirmPassword(event.target.value);
    }

    async function handleSubmit(event){
        event.preventDefault();

        if(!newPassword.trim()){
            setErrorMessage("Password is required.");
            return;
        }

        if(newPassword !== confirmPassword){
            setErrorMessage("Password's do not match.");
            return;
        }

        try{
            const response = await fetch("http://localhost:8080/api/v1/auth/reset-password", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "token": token,
                  "newPassword": newPassword
                })
            });

            const data = await response.json();

            if(response.ok){
                setSuccessMessage(data.message)
                setTimeout(() => {
                        window.location.href = "/login";
                    }, 2000); // wait 2 seconds before redirecting
            } else {
                setErrorMessage(data.message || "An error occurred when reseting password.")
            }


        } catch(error){
            setErrorMessage("An error occurred while reseting your password. Please try again later.")
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">

                <h2 className="text-2xl font-semibold text-center mb-6">Reset Your Password</h2>

                <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
                <SuccessToast message={successMessage} onClose={() => setSuccessMessage("")} />
                
                <form onSubmit={handleSubmit}>
                    <input type="password" placeholder="New Password" className="w-full mb-4 p-3 border border-gray-300 rounded" value={newPassword} onChange={handleNewPassword} />
                    <input type="password" placeholder="Confirm Password" className="w-full mb-4 p-3 border border-gray-300 rounded" value={confirmPassword} onChange={handleConfirmPassword} />
                    <button type="submit" className="w-full bg-red-700 text-white py-3 rounded hover:bg-red-800 transition">Reset Password</button>
                </form>

            </div>
        </div>
    );
} 
export default ResetPassword;