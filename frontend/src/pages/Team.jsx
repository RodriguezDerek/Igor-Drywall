import React from "react";
import { useState, useEffect } from "react";
import { isTokenExpired, authFetch } from "../util/auth";
import DashboardNavbar from "../components/DashboardNavbar";
import ProfileIcon from "../components/ProfileIcon";
import ErrorToast from '../components/ErrorToast';
import SuccessToast from '../components/SuccessToast';

function Team(){
    const [enabledUsers, setEnabledUsers] = useState([]);
    const [pendingUsers, setPendingUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    async function removeUser(id){
        try {
            const data = await authFetch(`http://localhost:8080/api/v1/users/remove/${id}`, {
                method: "DELETE"
            });

            setSuccessMessage(data.message || "User removed successfully.")
            setErrorMessage("");
            fetchEnabledUsers();
            fetchPendingUsers();

        } catch(error) {
            console.log("Remove User Error: ", error);
            setErrorMessage(error.message);
        }
    }

    async function enabledUser(id){
        try {
            const data = await authFetch(`http://localhost:8080/api/v1/users/authorize/enable/${id}`, {
                method: "PUT",
            })

            setSuccessMessage(data.message || "User enabled successfully.");
            setErrorMessage("");    
            fetchEnabledUsers();
            fetchPendingUsers();

        } catch(error) {
            console.log("Enabled User Error: ", error);
            setErrorMessage(error.message);
        }
    }

    async function fetchEnabledUsers(){
        try{
            const data = await authFetch("http://localhost:8080/api/v1/users/all-enabled-users", {
                method: "GET"
            });

            setEnabledUsers(data);
            setErrorMessage("");

        } catch(error) {
            console.error("Fetch Enabled Users Error: ", error);
            setErrorMessage(error.message);
        }
    }

    async function fetchPendingUsers(){
        try {
            const data = await authFetch("http://localhost:8080/api/v1/users/all-pending-users", {
                method: "GET"
            });

            setPendingUsers(data);
            setErrorMessage("");

        } catch(error) {
            console.error("Fetch Pending Users error:", error);
            setErrorMessage(error.message);           
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token || isTokenExpired(token)){
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("role");
            window.location.href = "/home";
        }

        fetchEnabledUsers();
        fetchPendingUsers();
    }, []);


    return(
        <>
            <div className="flex bg-gray-100 min-h-screen">
                {/* Sidebar */}
                <DashboardNavbar />

                {/* Right side (header + content) */}
                <div className="flex flex-col w-full ml-[280px] h-full bg-gray-100">
                    
                    {/* Header */}
                    <div className="w-full h-20 flex items-center justify-between px-6 py-2 bg-white border-b border-gray-200">
                        <h1 className="text-[18px] font-semibold text-black plus-jakarta-700">View Team</h1>
                        <ProfileIcon />
                    </div>

                    {/* Main content */}
                    <div className="w-full h-full bg-gray-100 p-6 space-y-6">
                        {/* Row 1 */}
                        <div className="bg-white rounded-lg shadow p-4">
                            <h1 className="text-xl font-semibold pl-2 pt-3 pb-3 plus-jakarta-700">Team Members</h1>

                            <table className="min-w-full bg-white border border-gray-300 text-sm rounded-lg overflow-hidden">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="text-left px-4 py-3 border-b border-gray-400 plus-jakarta-700">Name</th>
                                        <th className="text-left px-4 py-3 border-b border-gray-400 plus-jakarta-700">Email</th>
                                        <th className="text-left px-4 py-3 border-b border-gray-400 plus-jakarta-700">Phone Number</th>
                                        <th className="text-left px-4 py-3 border-b border-gray-400 plus-jakarta-700">Role</th>
                                        <th className="text-left px-4 py-3 border-b border-gray-400 plus-jakarta-700">Date Added</th>
                                        <th className="text-left px-4 py-3 border-b border-gray-400 plus-jakarta-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enabledUsers && enabledUsers.length > 0 ? (
                                        enabledUsers.map((user) => (
                                            <tr key={user.id} className="border-t border-gray-400">
                                                <td className="px-4 py-3 plus-jakarta-500">{user.firstName} {user.lastName}</td>
                                                <td className="px-4 py-3 plus-jakarta-500">{user.email}</td>
                                                <td className="px-4 py-3 plus-jakarta-500">{user.phoneNumber}</td>
                                                <td className="px-4 py-3 plus-jakarta-500">{user.role}</td>
                                                <td className="px-4 py-3 plus-jakarta-500">{user.dateAdded}</td>
                                                <td className="px-4 py-3">
                                                    {user.role === "WORKER" && (
                                                        <button onClick={() => removeUser(user.id)} className="custom-red-color-background text-white px-3 py-1 rounded-lg cursor-pointer text-sm plus-jakarta-700">Remove</button>
                                                    )}
                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4 text-gray-500 plus-jakarta-500">No enabled users found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>

                        {/* Row 2 */}
                        <div className="bg-white rounded-lg shadow p-4">
                            <h1 className="text-xl font-semibold pl-2 pt-3 pb-3 plus-jakarta-700">Pending Requests</h1>

                            <table className="min-w-full bg-white border border-gray-300 text-sm rounded-lg overflow-hidden">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="text-left px-4 py-3 border-b border-gray-400 plus-jakarta-700">Name</th>
                                        <th className="text-left px-4 py-3 border-b border-gray-400 plus-jakarta-700">Email</th>
                                        <th className="text-left px-4 py-3 border-b border-gray-400 plus-jakarta-700">Phone Number</th>
                                        <th className="text-left px-4 py-3 border-b border-gray-400 plus-jakarta-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingUsers && pendingUsers.length > 0 ? (
                                        pendingUsers.map((user) => (
                                            <tr key={user.id} className="border-t border-gray-400">
                                                <td className="px-4 py-3 plus-jakarta-600">{user.firstName} {user.lastName}</td>
                                                <td className="px-4 py-3 plus-jakarta-600">{user.email}</td>
                                                <td className="px-4 py-3 plus-jakarta-600">{user.phoneNumber}</td>
                                                <td className="px-4 py-3">
                                                    <button onClick={() => enabledUser(user.id)} className="custom-red-color-background text-white px-3 py-1 rounded-lg cursor-pointer text-sm plus-jakarta-700">Accept</button>
                                                    <button onClick={() => removeUser(user.id)} className="bg-white border-1 custom-red-color-border custom-red-color-text px-3 py-1 ml-2 rounded-lg cursor-pointer text-sm hover:bg-[#FFDDDD] plus-jakarta-700">Decline</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4 text-gray-500 plus-jakarta-500">No Pending users found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
            <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
            <SuccessToast message={successMessage} onClose={() => setSuccessMessage("")} />
        </>
    );
}
export default Team;