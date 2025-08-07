import React from 'react';
import { useState, useEffect } from 'react';
import { getUserId } from '../util/auth';
import MyProfile from './MyProfile';
import AccountSettings from './AccountSettings';
import { Link } from 'react-router';

function ProfileModal({ close }) {
    const [isMyProfileOpen, setIsMyProfileOpen] = useState(true);
    const [isAccountSettingsOpen, setAccountIsSettingsOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    function openMyProfile() {
    setIsMyProfileOpen(true);
    setAccountIsSettingsOpen(false);
    }

    function openAccountSettings() {
        setIsMyProfileOpen(false);
        setAccountIsSettingsOpen(true);
    }


    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
         window.location.href = "/home";
    }    

    async function fetchUserData() {
        const userId = getUserId();

        if(userId){
            try {
                const response = await fetch(`http://localhost:8080/api/v1/users/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                });

                const data = await response.json();
                setUserData(data);

            } catch (error) {
                setErrorMessage("Failed to fetch user data.");
                return;
            }
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [getUserId()]);

    return(
        <>
        <div className="bg-white shadow-lg rounded-2xl w-160 h-76 border border-gray-200 mt-2 animate-fadeIn flex flex-row">
            {/* Left column - 40% */}
            <div className="basis-[40%] h-full bg-white border-r-4 border-gray-200 p-6 flex flex-col justify-between rounded-l-2xl">
                {/* Top Section */}
                <div>
                    {/* Avatar + Info */}
                    <div className="flex items-center space-x-4 mb-6 pr-4">
                        <div className="custom-red-color-bg w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.5-2 4.5-4.5S14.7 3 12 3 7.5 5 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5V21h18v-3c0-3-6-4.5-9-4.5z"/></svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm">
                                {userData ? `${userData.lastName}, ${userData.firstName}` : 'Loading...'}
                            </h4>

                            <p className="text-xs text-gray-500">
                                {userData ? `${userData.email}` : 'Loading...'}
                            </p>
                        </div>
                    </div>

                    {/* Nav Options */}
                    <div className="space-y-1">
                        
                        <div className="flex text-gray-900 py-1.5 rounded-lg custom-red-hover-effect pl-2">
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.7 0 4.5-2 4.5-4.5S14.7 3 12 3 7.5 5 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5V21h18v-3c0-3-6-4.5-9-4.5z"/>
                                </svg>
                                <span onClick={openMyProfile} className="text-sm font-medium pl-1 cursor-pointer">My Profile</span>
                            </div>
                        </div>

                        <div className="flex text-gray-900 py-1.5 rounded-lg custom-red-hover-effect pl-2">
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.43 12.98l1.77-1.02-1.77-1.02c-.14-.49-.34-.96-.59-1.4l.99-1.73-1.77-1.02-.99 1.73c-.43-.25-.91-.45-1.4-.59L13.04 2.8h-2.08l-.34 1.82c-.49.14-.96.34-1.4.59l-1.73-.99-1.02 1.77 1.73.99c-.25.43-.45.91-.59 1.4L2.8 10.96v2.08l1.82.34c.14.49.34.96.59 1.4l-1.73.99 1.02 1.77 1.73-.99c.43.25.91.45 1.4.59l.34 1.82h2.08l.34-1.82c.49-.14.96-.34 1.4-.59l1.73.99 1.02-1.77-1.73-.99c.25-.43.45-.91.59-1.4l1.82-.34z"/>
                                </svg>
                                <span onClick={openAccountSettings} className="text-sm font-medium pl-1 cursor-pointer">Account Settings</span>
                            </div>
                        </div>

                        <div className="flex text-gray-900 py-1.5 rounded-lg custom-red-hover-effect pl-2">
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 3h18v2H3zm2 4h14v14H5zm4 4v6h6v-6H9z"/>
                                </svg>
                                <Link to="/overview" className="text-sm font-medium pl-1 cursor-pointer">Dashboard</Link>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Logout button (bottom) */}
                <button onClick={handleLogout} className="flex items-center space-x-2 custom-logout pl-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
                    <span className="text-sm font-medium pl-1 cursor-pointer">Log out</span>
                </button>
            </div>


            {/* Right column - 60% */}
            <div className="basis-[65%] h-full rounded-r-2xl flex flex-col justify-end">
                <div className="flex justify-end pt-2 pb-2 pr-4">
                    <button onClick={close} className="cursor-pointer text-md font-bold">
                        ✕
                    </button>
                </div>

                {isAccountSettingsOpen && <AccountSettings userInfo={userData}/>}
                {isMyProfileOpen && <MyProfile userInfo={userData} />}

            </div>
        </div>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        </>
    );
}
export default ProfileModal;