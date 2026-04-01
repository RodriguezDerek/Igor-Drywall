import { Link } from "react-router-dom"

export default function HeroSection() {
    return (
        <div style={{ backgroundImage: "url(/public_images/home_page.png)" }} className="h-175 bg-cover bg-center bg-black/80 bg-blend-darken flex items-center justify-evenly">
                
                <div className="relative z-10 max-w-2xl px-14">
 
                    <div className="inline-flex items-center gap-2 border bg-[#C8102E]/10 border-[#C8102E]/20 rounded-full px-4 py-1.5 mb-8">
                        <span className="w-2 h-2 rounded-full bg-[#C8102E] shrink-0" />
                        <span className="text-[#C8102E] text-xs uppercase tracking-widest sub-font font-medium">Licensed · Insured · Guaranteed</span>
                    </div>
            
                    <h1 className="text-white font-bold main-font leading-none text-7xl mb-6">Work Done <br />Right, Every{" "}<em className="text-[#C8102E] italic">Single</em>{" "}Time.</h1>
            
                    <p className="text-[#A8A8A8] mb-10 leading-relaxed max-w-lg text-base font-light">At Igor Drywall Company, we provide high-quality drywall services built on craftsmanship and reliability. Transparent estimates, dependable service, and flawless finishes — every time.</p>
            
                    <div className="flex items-center gap-4 flex-wrap">
                        <Link to="/quote" className="bg-[#C8102E] hover:bg-[#b90f2c] rounded-sm transition-colors text-white sub-font font-semibold px-8 py-4 text-sm tracking-wide">Request a Free Quote →</Link>
                        <Link to="/services" className="border border-[#545454] hover:border-[#888888] rounded-sm transition-colors text-white sub-font font-semibold px-8 py-4 text-sm tracking-wide">View Our Services</Link>
                    </div>
            
                </div>

                <div className="h-full w-[40%] flex items-center justify-center">
                    <div className="w-80 shrink-0">

                        {/* Section label */}
                        <p className="text-white/40 text-xs uppercase tracking-[0.2em] py-4 border-b border-[#383838] w-100">Featured Services</p>

                        <div className="flex flex-col">

                            <div className="group flex items-center justify-between w-100 py-4 border-b border-[#383838]">
                                <div className="flex items-stretch gap-3">
                                    <div className="w-0.5 shrink-0 bg-[#6A1515]" />
                                    <div>
                                        <p className="text-white text-sm font-semibold">New Wall & Ceiling Installation</p>
                                        <p className="text-white/40 text-xs mt-0.5">Residential · Completed</p>
                                    </div>
                                </div>
                                <span className="text-xs px-3 py-2 shrink-0 ml-3 rounded-sm bg-[#C8102E]/20 text-[#C8102E]">+ Residential</span>
                            </div>

                            <div className="group flex items-center justify-between w-100 py-4 border-b border-[#383838]">
                                <div className="flex items-stretch gap-3">
                                    <div className="w-0.5 shrink-0 bg-[#888888]" />
                                    <div>
                                        <p className="text-white text-sm font-semibold">Residential Drywall Installation</p>
                                        <p className="text-white/40 text-xs mt-0.5">Commercial · Completed</p>
                                    </div>
                                </div>
                                <span className="text-xs px-3 py-2 shrink-0 ml-3 rounded-sm bg-[#888888] text-[#404040]">+ Commercial</span>
                            </div>

                            <div className="group flex items-center justify-between w-100 py-4 border-b border-[#383838]">
                                <div className="flex items-stretch gap-3">
                                    <div className="w-0.5 shrink-0 bg-[#BBBBBB]" />
                                    <div>
                                        <p className="text-white text-sm font-semibold">Drywall Repair & Patching</p>
                                        <p className="text-white/40 text-xs mt-0.5">Residential · Completed</p>
                                    </div>
                                </div>
                                <span className="text-xs px-3 py-2 shrink-0 ml-3 rounded-sm bg-[#BBBBBB]/30 text-[#858585]">+ Residential</span>
                            </div>
                            
                            <div className="group flex items-center justify-between w-100 py-4 border-b border-[#383838]">
                                <div className="flex items-stretch gap-3">
                                    <div className="w-0.5 shrink-0 bg-[#444444]" />
                                    <div>
                                        <p className="text-white text-sm font-semibold">Ceiling Drywall Installation</p>
                                        <p className="text-white/40 text-xs mt-0.5">Commercial · Completed</p>
                                    </div>
                                </div>
                                <span className="text-xs px-3 py-2 shrink-0 ml-3 rounded-sm bg-[#444444]/20 text-[#6A6A6A]">+ Commercial</span>
                            </div>
                        
                        </div>
                    </div>
                </div> 
        </div>
    )
}