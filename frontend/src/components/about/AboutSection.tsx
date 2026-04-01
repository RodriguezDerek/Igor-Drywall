import { Link } from "react-router-dom";

export default function AboutSection() {
    return (
        <section className="bg-[#131313] border-b border-b-[#333333] text-white py-16 px-6 md:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="space-y-8">
                    <div className="space-y-4 w-160">
                        <div className="flex items-center gap-4">
                            <div className="h-px w-8 bg-[#C8102E]"></div>
                            <span className="uppercase tracking-widest text-xs sub-font font-bold text-[#C8102E]">Our Story</span>
                        </div>
                        <h2 className="text-[56px] main-font font-semibold leading-tight">Built by tradespeople,<br />for Everyone</h2>
                    </div>

                    <div className="space-y-6 text-[#A8A8A8] text-base leading-relaxed w-150">
                        <p>Igor Drywall was founded in 2019 by a team of experienced drywall professionals who were tired of seeing homeowners and contractors deal with rushed jobs, poor workmanship, and unreliable service. We set out to build the kind of company we always believed the industry needed — one that puts quality, reliability, and attention to detail at the centre of every project.</p>
                        <p>Today, we work with homeowners, builders, and businesses across the area, delivering clean, precise drywall installation and finishing that stands the test of time. Every project we take on carries our name, and we take real pride in every wall and ceiling we complete.</p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link to="/gallery" className="sub-font bg-[#C8102E] hover:bg-red-700 text-white px-8 py-3 rounded-md font-medium transition-colors inline-block text-center">Work With Us</Link>
                        <Link to="/services" className="sub-font border border-[#333333] hover:bg-[#272727] text-[#A8A8A8] px-8 py-3 rounded-md font-medium transition-colors inline-block text-center">Our Services</Link>
                    </div>
                </div>

                <div className="relative">
                    <div className="bg-[#1E1E1E] rounded-xl border border-[#333333] p-4 md:p-6 shadow-2xl">
                        <div className="overflow-hidden rounded-lg mb-8">
                            <img src="/public_images/about_image.webp" alt="Red pickup truck" className="w-full h-auto object-cover"/>
                        </div>

                        <div className="border-t border-[#333333] pt-8 pb-4 px-2">
                            <div className="flex gap-6">
                                <div className="w-1 bg-[#C8102E] shrink-0"></div>
                                <div className="space-y-4">
                                    <p className="text-lg italic font-serif">"We don't just install drywall. We treat every project like it's our own home."</p>
                                    <div>
                                        <p className="sub-font text-[#7A7A7A] text-sm">— Igor Rodriguez, Founder & CEO</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-linear-to-r from-transparent via-[#C8102E] to-transparent rounded-full opacity-50"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}