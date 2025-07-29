import React from 'react';
import { useState, useEffect } from 'react';
import { getUserId } from '../util/auth';
import ErrorToast from '../components/ErrorToast';
import MyProfile from './MyProfile';
import AccountSettings from './AccountSettings';

function ProfileModal({ close }) {
    const [errorMessage, setErrorMessage] = useState("");
    const [isMyProfileOpen, setIsMyProfileOpen] = useState(true);
    const [isAccountSettingsOpen, setAccountIsSettingsOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    function handleLogout() {

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

    return(
        <>
            
        </>                                  
    );
}
export default ProfileModal;