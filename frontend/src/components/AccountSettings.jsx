import React from "react";
import { useState } from "react";
import { getUserId } from "../util/auth";
import ModalErrorToast from "./ModalErrorToast"; 
import ModalSuccessToast from "./ModalSuccessToast";
import { isValidPhoneNumber } from 'libphonenumber-js';

function AccountSettings({ userInfo }) {
    const [newFirstName, setNewFirstName] = useState(userInfo ? userInfo.firstName : "");
    const [newLastName, setNewLastName] = useState(userInfo ? userInfo.lastName : "");
    const [newEmail, setNewEmail] = useState(userInfo ? userInfo.email : "");
    const [newPhoneNumber, setNewPhoneNumber] = useState(userInfo ? userInfo.phoneNumber : "");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    function handleFirstNameChange(e) {
        setNewFirstName(e.target.value);
    }

    function handleLastNameChange(e) {
        setNewLastName(e.target.value);
    }

    function handleEmailChange(e) {
        setNewEmail(e.target.value);
    }

    function handlePhoneNumberChange(e) {
        setNewPhoneNumber(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!newFirstName.trim() || !newLastName.trim() || !newEmail.trim()) {
            setErrorMessage("Fields cannot be empty.");
            return;
        }

        if (userInfo.firstName.trim() === newFirstName.trim() && userInfo.lastName.trim() === newLastName.trim() && userInfo.email.trim() === newEmail.trim() && userInfo.phoneNumber.trim() === newPhoneNumber.trim()) {
            setErrorMessage("No changes detected. Please update your information before saving.");
            return;
        }

        
        const phoneNumberPattern = /^[0-9\s\-\+\(\)]+$/;
        if (!phoneNumberPattern.test(newPhoneNumber.trim())) {
            setErrorMessage("Phone number can contain only digits, spaces, +, -, and parentheses.");
            return;
        }

        if (newPhoneNumber.trim().length > 25) {
            setErrorMessage("Phone number is too long.");
            return;
        }

        const userId = getUserId();

        if (userId) {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/users/update/${userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        firstName: newFirstName,
                        lastName: newLastName,
                        email: newEmail,
                        phoneNumber: newPhoneNumber,
                    }),
                });

                if (response.status === 401) {
                    localStorage.clear();
                    window.location.href = "/home";
                    return
                }

                if (response.ok) {
                    const data = await response.json();

                    if(newEmail.trim() != userInfo.email.trim()){
                        localStorage.clear();
                        setSuccessMessage(data.message + " Please sign in again.");
                        setErrorMessage("");
                        setTimeout(() => { window.location.href = "/home"; }, 1000);
                    } else {
                        setSuccessMessage(data.message);
                        setErrorMessage("");
                    }

                } else {
                    const errorData = await response.json();
                    setErrorMessage(errorData.message || "An error occurred when updating account settings.");
                    setSuccessMessage("");
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

    return (
        <>
        <div className="flex flex-col items-center justify-center h-[88%] p-4">
            <div className="text-lg font-semibold text-gray-900 mb-4">Account Settings</div>
            <div className="w-full max-w-md rounded-lg">
                <div className="flex flex-col gap-y-3">
                    <div className="flex items-center gap-3">
                        <label className="w-24 text-xs text-gray-700 font-semibold">First Name</label>
                        <input type="text" onChange={handleFirstNameChange} value={newFirstName} className="border border-gray-400 rounded-md px-2 py-1 text-xs w-full"/>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="w-24 text-xs text-gray-700 font-semibold">Last Name</label>
                        <input type="text" onChange={handleLastNameChange} value={newLastName} className="border border-gray-400 rounded-md px-2 py-1 text-xs w-full"/>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="w-24 text-xs text-gray-700 font-semibold">Email</label>
                        <input type="email" onChange={handleEmailChange} value={newEmail} className="border border-gray-400 rounded-md px-2 py-1 text-xs w-full"/>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="w-24 text-xs text-gray-700 font-semibold">Phone Number</label>
                        <input type="text" onChange={handlePhoneNumberChange} value={newPhoneNumber} placeholder="e.g. +1 555 123 4567" className="border border-gray-400 rounded-md px-2 py-1 text-xs w-full"/>
                    </div>

                    <div className="flex justify-end mt-3">
                        <button onClick={handleSubmit} className="custom-red-color-background text-white text-xs font-medium px-4 py-1 rounded-md cursor-pointer">Submit</button>
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
