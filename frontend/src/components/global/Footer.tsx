import { Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#131313] text-white pt-14 pb-4 px-6">
            <div className="max-w-7xl mx-auto">
                
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12">
    
                    <div className="lg:col-span-6 space-y-6">
                        <h2 className="text-3xl main-font font-bold">Igor Drywall Co LLC</h2>
                        <p className="text-[#7A7A7A] sub-font text-sm leading-relaxed max-w-lg">Professional trade services built on a foundation of trust, transparency, and industry-leading technology. Since 2019, we’ve bridge the gap between complex projects and elite craftsmanship, connecting homeowners and commercial developers with fully licensed, vetted tradespeople across the metro area. Our commitment is simple: delivering precision workmanship and a seamless, dependable service experience through every stage of the build.</p>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="main-font font-bold text-lg mb-6 text-white">Company</h3>
                        <ul className="space-y-3 text-[#7A7A7A] text-sm sub-font">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                            <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
                            <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                            <li><Link to="/quote" className="hover:text-white transition-colors">Quote</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="main-font font-bold text-lg mb-6 text-white">Services</h3>
                        <ul className="space-y-3 text-[#7A7A7A] text-sm sub-font">
                            <li><Link to="/services" className="hover:text-white transition-colors">Drywall Installation</Link></li>
                            <li><Link to="/services" className="hover:text-white transition-colors">Drywall Repair</Link></li>
                            <li><Link to="/services" className="hover:text-white transition-colors">Drywall Finishing</Link></li>
                            <li><Link to="/services" className="hover:text-white transition-colors">Taping & Mudding</Link></li>
                            <li><Link to="/services" className="hover:text-white transition-colors">Skim Coats</Link></li>
                            <li><Link to="/services" className="hover:text-white transition-colors">Commercial Drywall Services</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="main-font font-bold text-lg mb-6 text-white">Contact</h3>
                        <ul className="space-y-3 text-[#7A7A7A] text-sm sub-font">
                            <li>(344) 304-3043</li>
                            <li>igordrywall69@gmail.com</li>
                            <li>New Haven, CT</li>
                            <li>Mon - Sat: 7:00AM - 3:00PM</li>
                        </ul>
                        <Link to="/quote" className="inline-block bg-[#C8102E] hover:bg-[#b7102c] text-white px-5 py-2.5 rounded-sm sub-font font-medium text-xs transition-all">Get a Free Quote</Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-4 mt-14 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[11px] text-[#555555] sub-font tracking-tight">© {currentYear} Igor Drywall Co LLC. All rights reserved. Registered trade contractor.</p>

                    <div className="flex gap-8 items-baseline">
                        <span className="text-[11px] text-[#555555] sub-font cursor-default hover:text-gray-400 transition-colors">Privacy Policy</span>
                        <span className="text-[11px] text-[#555555] sub-font cursor-default hover:text-gray-400 transition-colors">Terms of Service</span>
                        <span className="text-[11px] text-[#555555] sub-font cursor-default hover:text-gray-400 transition-colors">Cookie Policy</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}