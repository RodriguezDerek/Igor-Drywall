import { Link } from "react-router-dom";

export default function Navbar() {
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
                </div>

                <div className="flex items-center gap-8">
                    <Link to="/login" className="sub-font text-gray-300 hover:text-white">Log In</Link>
                    <Link to="/signup" className="sub-font bg-[#C8102E] px-5 py-2 rounded-md hover:bg-red-700 transition">Sign up</Link>
                </div>
            </div>
        </div>
    </div>
  );
}