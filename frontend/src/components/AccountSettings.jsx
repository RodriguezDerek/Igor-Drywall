import React from "react";
import { useState } from "react";

function AccountSettings(){
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");

    function handleFirstNameChange(e){
        setNewFirstName(e.target.value);
    }

    function handleLastNameChange(e){
        setNewLastName(e.target.value);
    }

    function handleEmailChange(e){
        setNewEmail(e.target.value);
    }
    
    async function handleSubmit(){

    }

    return(
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
    );
}
export default AccountSettings;