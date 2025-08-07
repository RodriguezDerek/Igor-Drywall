import React from "react";
import { useState } from "react";
import { getUserId } from "../util/auth"
import ModalErrorToast from "./ModalErrorToast"; 
import ModalSuccessToast from "./ModalSuccessToast";

function AccountSettings( {userInfo} ){
    const [newFirstName, setNewFirstName] = useState(userInfo ? userInfo.firstName : "");
    const [newLastName, setNewLastName] = useState(userInfo ? userInfo.lastName : "");
    const [newEmail, setNewEmail] = useState(userInfo ? userInfo.email : "");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    

    function handleFirstNameChange(e){
        setNewFirstName(e.target.value);
    }

    function handleLastNameChange(e){
        setNewLastName(e.target.value);
    }

    function handleEmailChange(e){
        setNewEmail(e.target.value);
    }
    
    async function handleSubmit(e){
        e.preventDefault();

        if(!newFirstName.trim() || !newLastName.trim() || !newEmail.trim()){
            setErrorMessage("Fields cannot be empty.");
            return;
        }

        const userId = getUserId();
        
        if(userId){
            try {
                const response = await fetch(`http://localhost:8080/api/v1/users/update/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        firstName: newFirstName,
                        lastName: newLastName,
                        email: newEmail
                    })
                });

                const data = await response.json();

                if(response.ok){
                    setSuccessMessage(data.message || "Account settings updated successfully.");

                } else {
                    setErrorMessage(data.message || "An error occurred when updating account settings.")
                    return;
                }

            } catch (error) {
                setErrorMessage("Failed to update account settings.");
                return;
            }
        } else {
            setErrorMessage("User not found.");
            return;
        }
    }

    if (!userInfo) {
        return <p className="text-center text-gray-500">Loading profile...</p>;
    } 

    return(
        <>
            <div className="flex flex-col items-center justify-center h-[88%] p-6">
                <div className="text-xl font-semibold text-gray-900 mb-6">Account Settings</div>
                <div className="w-full max-w-xl rounded-lg">
                    <div className="flex flex-col gap-y-4">

                        <div className="flex items-center gap-4">
                            <label className="w-32 text-sm text-gray-700 font-semibold">First Name</label>
                            <input type="text" onChange={handleFirstNameChange} value={newFirstName} className="border border-gray-400 rounded-md px-3 py-1 text-sm w-full" />
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="w-32 text-sm text-gray-700 font-semibold">Last Name</label>
                            <input type="text" onChange={handleLastNameChange} value={newLastName} className="border border-gray-400 rounded-md px-3 py-1 text-sm w-full" />
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="w-32 text-sm text-gray-700 font-semibold">Email</label>
                            <input type="text" onChange={handleEmailChange} value={newEmail} className="border border-gray-400 rounded-md px-3 py-1 text-sm w-full" />
                        </div>

                        <div className="flex justify-end mt-4">
                            <button onClick={handleSubmit} className="custom-red-color-background text-white text-sm font-medium px-5 py-1.5 rounded-md cursor-pointer">Submit</button>
                        </div>

                    </div>
                </div>
            </div>
            <ModalErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
            <ModalSuccessToast message={successMessage} onClose={() => setSuccessMessage("")} />
        </>
    );
}
export default AccountSettings;