import { Link } from "react-router-dom";
import { useState } from "react";
import DashboardDropDown from "./DashboardDropDown";
import ProfileModal from "../profile/ProfileModal";

interface UserData {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
}

export default function Navbar() {
    const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState<boolean>(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
    
    const storedUser = localStorage.getItem("user");
    const userData: UserData | null = storedUser ? JSON.parse(storedUser) : null;
    
    return (
        <div className="w-full">
            <div className="bg-[#C8102E] text-white text-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between h-10 px-6">
                    <p className="sub-font">Available Monday - Saturday, 7AM - 4PM</p>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <img className="h-3" src="/public_images/phone_icon.png" alt="phone icon" />
                            <p className="sub-font">(203) 675-8166</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <img className="h-3" src="/public_images/email_icon.png" alt="phone icon" />
                            <p className="sub-font underline">igordrywall69@gmail.com</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <img className="h-3" src="/public_images/location_icon.png" alt="phone icon" />
                            <p className="sub-font">Serving All of Connecticut</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#131313] text-white border-b border-[#333333]">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-17">
                    <h1 className="main-font text-xl font-semibold tracking-wide">Igor Drywall Co LLC</h1>

                    <div className="flex items-center gap-12 text-gray-300">
                        <Link to="/" className="nav-link sub-font hover:text-white">Home</Link>
                        <Link to="/about" className="nav-link sub-font hover:text-white">About</Link>
                        <Link to="/services" className="nav-link sub-font hover:text-white">Services</Link>
                        <Link to="/gallery" className="nav-link sub-font hover:text-white">Gallery</Link>
                        <Link to="/quote" className="nav-link sub-font hover:text-white">Quote</Link>
                        {userData && (
                            <div className="relative"> 
                                <button onClick={() => setIsDashboardDropdownOpen(prev => !prev)} className="nav-link sub-font hover:text-white">Dashboard ▼</button>

                                {isDashboardDropdownOpen && (
                                    <div className="absolute left-0 top-full z-10 mt-5.5">
                                        <DashboardDropDown userRole={userData.role}/>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {userData ? (
                        <div className="relative">
                            <button onClick={() => setIsProfileModalOpen(prev => !prev)} className="main-font font-semibold w-9.5 h-9.5 bg-[#C8102E] rounded-full cursor-pointer mt-2">{userData.firstName.charAt(0).toUpperCase()}</button>

                            {isProfileModalOpen && (
                                <div className="absolute right-0 top-full z-10 mt-5.5">
                                    <ProfileModal data={userData}/>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-8">
                            <Link to="/login" className="sub-font text-gray-300 hover:text-white">Log In</Link>
                            <Link to="/signup" className="sub-font bg-[#C8102E] px-5 py-2 rounded-md hover:bg-red-700 transition">Sign up</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}