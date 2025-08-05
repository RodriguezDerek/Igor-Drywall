import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../util/auth';
import ProfileIcon from './ProfileIcon';

function Navbar() {
  return (
    <nav className="bg-white shadow-md w-full h-20.5">
      {/* Remove padding here */}
      <div className="w-full">
        <div className="flex justify-between items-center h-20 px-0">

          {/* Logo: No margin, no padding */}
          <div className="flex-shrink-0 ml-22">
            <img src="/logo.png" alt="Logo" className="h-20 w-auto" />
          </div>

          {/* Navigation links */}
          <div className="hidden md:flex space-x-10 mr-10">
            <Link to="/home" className="nav-link text-gray-900 hover:custom-red-color-font font-medium cursor-pointer">Home</Link>
            <Link to="/about" className="nav-link text-gray-900 hover:custom-red-color-font font-medium cursor-pointer">About</Link>
            <Link to="/service" className="nav-link text-gray-900 hover:custom-red-color-font font-medium cursor-pointer">Services</Link>
            <Link to="/project" className="nav-link text-gray-900 hover:custom-red-color-font font-medium cursor-pointer">Projects</Link>
          </div>

          {/* Right-side login/register or profile */}
          {isLoggedIn() ? ( 
            <ProfileIcon />
          ) : (
            <div className="hidden md:flex items-center space-x-4 pr-4 mr-20">
              <Link to="/register" className="px-4 py-2 custom-red-color-font border custom-red-color-border rounded hover:bg-red-50 transition cursor-pointer">Register</Link>
              <Link to="/login" className="px-6 py-2 text-white rounded custom-red-color-background transition cursor-pointer">Login</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
