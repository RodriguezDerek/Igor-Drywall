import React from 'react';

function Footer() {
  return (
    <footer className="relative bg-cover bg-center text-white" style={{ backgroundImage: "url('/footer_images/footer.webp')" }}>
      
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/90 z-10" />

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Logo + About */}
            <div>
                {/* Logo placeholder */}
                <img src="/logo.png" alt="Igor Drywall Logo" className="-mb-2 -ml-5 w-80 h-32 object-contain"/>
                <p className="text-sm leading-relaxed text-gray-300">Igor Drywall Co. is a New Haven contractor offering drywall installation and repair for homes and businesses. Since 2013, we've been known for quality work and customer satisfaction.</p>
            </div>

            {/* Services */}
            <div>
                <h3 className="text-white font-semibold text-lg mb-3 border-b border-red-700 inline-block pb-1">Services</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                    <li>Drywall Installation</li>
                    <li>Drywall Repair</li>
                    <li>Taping & Coating</li>
                    <li>Commercial Services</li>
                    <li>Water Damage Repair</li>
                    <li>Drywall Dust Cleaning</li>
                </ul>
            </div>

            {/* Working Hours */}
            <div>
                <h3 className="text-white font-semibold text-lg mb-3 border-b border-red-700 inline-block pb-1">Working Hours</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                    <li><span className="font-bold text-white">Monday:</span> 7am - 4pm</li>
                    <li><span className="font-bold text-white">Tuesday:</span> 7am - 4pm</li>
                    <li><span className="font-bold text-white">Wednesday:</span> 7am - 4pm</li>
                    <li><span className="font-bold text-white">Thursday:</span> 7am - 4pm</li>
                    <li><span className="font-bold text-white">Friday - Saturday:</span> 7am - 3pm</li>
                    <li><span className="font-bold text-white">Sunday:</span> <span className="text-red-500">Closed</span></li>
                </ul>
            </div>

            {/* Contact Us */}
            <div>
                <h3 className="text-white font-semibold text-lg mb-3 border-b border-red-700 inline-block pb-1">Contact Us</h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                    {/* icon here */}
                    Connecticut, 06101
                    </li>
                    <li className="flex items-center gap-2">
                    {/* icon here */}
                    (203) - 675 - 8166
                    </li>
                    <li className="flex items-center gap-2">
                    {/* icon here */}
                    igordrywall69@gmail.com
                    </li>
                </ul>
            </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400 relative z-20 pt-6 pb-6">Copyright © 2025 - All rights reserved</div>

    </footer>
  );
}

export default Footer;
