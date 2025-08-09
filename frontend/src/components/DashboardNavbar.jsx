import React from "react";
import { useState, useEffect } from 'react';
import { getUserId, getUserRole } from '../util/auth';
import ErrorToast from "./ErrorToast"
import { Link } from "react-router";


function Sidebar() {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

                  if (response.status === 401) {
                    localStorage.clear();
                    window.location.href = "/home";
                    return
                  }
  
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
      }, []);

  return (
    <>
      <div className="w-70 h-screen bg-white flex flex-col justify-between border-r border-gray-200 p-4 fixed top-0 left-0">
        <div>
          <Link to="/home" className="mb-6"><img src="/logo.png" alt="Logo" className="w-50" /></Link>
          <div className="text-[0.8rem] font-medium text-gray-600 mb-2 px-4 pt-8">MAIN MENU</div>
          
          <nav className="space-y-1">
            <a href="/overview" className="flex items-center gap-2 px-4 py-3 rounded-2xl text-gray-600 custom-dashboard-hover-bg text-sm custom-dashboard-hover-text font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" />
              </svg>
              <p className="pl-2">Overview</p>
            </a>
          
            <a href="/schedule" className="flex items-center gap-2 px-4 py-3 rounded-2xl text-gray-600 custom-dashboard-hover-bg text-sm custom-dashboard-hover-text font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" />
              </svg>
              <p className="pl-2">Project Schedules</p>
            </a>
            
            <a href="/projects" className="flex items-center gap-2 px-4 py-3 rounded-2xl text-gray-600 custom-dashboard-hover-bg text-sm custom-dashboard-hover-text font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
              </svg>
              <p className="pl-2">Current Projects</p>
            </a>

            {getUserRole() === "ADMIN" && (
              <a href="/team" className="flex items-center gap-2 px-4 py-3 rounded-2xl text-gray-600 custom-dashboard-hover-bg text-sm custom-dashboard-hover-text font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5V4H2v16h5m10 0v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6m10 0H7" />
                </svg>
                <p className="pl-2">View Team</p>
              </a>
            )}

          </nav>
        </div>

        <div className="flex items-center gap-2 px-4 pb-8 pt-16 border-t border-gray-200">
          <div className="w-8 h-8 rounded-full bg-[#8b0c0c] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.5-2 4.5-4.5S14.7 3 12 3 7.5 5 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5V21h18v-3c0-3-6-4.5-9-4.5z"/>
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium">
              {userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}
            </div>
            <div className="text-xs text-gray-500 font-semibold">
              {userData ? `${userData.role}` : 'Loading...'}
            </div>
          </div>
        </div>
      </div>
      <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
    </>
  );
}

export default Sidebar;
