import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../util/auth';
import ProfileIcon from './ProfileIcon';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-3 lg:px-8">
            <div className="flex justify-between items-center h-21">
            
                <div className="flex-shrink-0 -ml-20">
                    <img src="/logo.png" alt="Logo" className="h-20 w-auto"/>
                </div>

                <div className="hidden md:flex space-x-10">
                    <Link to="/home" className="nav-link text-gray-900 hover:custom-red-color-font font-medium cursor-pointer">Home</Link>
                    <Link to="/about" className="nav-link text-gray-900 hover:custom-red-color-font font-medium cursor-pointer">About</Link>
                    <Link to="/service" className="nav-link text-gray-900 hover:custom-red-color-font font-medium cursor-pointer">Services</Link>
                    <Link to="/project" className="nav-link text-gray-900 hover:custom-red-color-font font-medium cursor-pointer">Projects</Link>
                </div>

                {isLoggedIn() ? (
                    <ProfileIcon />
                ) : (
                    <div className="hidden md:flex items-center space-x-4">
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