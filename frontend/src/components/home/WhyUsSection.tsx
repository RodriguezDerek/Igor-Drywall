import { useState } from "react";
import { Link } from "react-router-dom";

interface ValueStat {
    id: string;
    title: string;
    content: string;
}

const stats: ValueStat[] = [
    {
        id: "01",
        title: "Transparent, No-Surprise Pricing",
        content: "Every tradesperson on FieldCraft is background-checked, interviewed, and required to provide valid trade licences and insurance certificates before their first job. We don't list anyone we wouldn't hire ourselves.",
    },
    {
        id: "02",
        title: "Vetted Professionals Only",
        content: "We handle the rigorous screening and technical testing so you don't have to. Only the top-rated drywall experts with a proven track record of excellence make it onto the Igor Drywall team, giving you access to the best craftsmanship in the industry.",
    },
    {
        id: "03",
        title: "Quality Guaranteed",
        content: "Our work meets the highest industry standards for durability and finish. If any aspect of the project doesn't meet your expectations or our strict quality benchmarks, Igor Drywall will return to make it right at no extra cost to you.",
    },
    {
        id: "04",
        title: "On-Time Arrival",
        content: "We respect your schedule and the sanctity of your home. Our professionals arrive exactly when they say they will, maintaining a clean workspace and keeping your project on a strict timeline to avoid any unnecessary disruptions to your daily life.",
    },
    {
       id: "05",
       title: "Secure Online Payments",
       content: "Pay safely and conveniently through our encrypted platform once the job is completed to your total satisfaction. The Igor Drywall milestone-based payment system ensures your funds are protected until you've personally signed off on the final result.",
    }
];

export default function WhyUsSection() {

    const [activeIndex, setActiveIndex] = useState<Number | null>(0);

    function toggleStat(index : Number) {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <section className="bg-[#1E1E1E] text-white py-24 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                <div className="max-w-148">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px w-8 bg-[#C8102E]"></div>
                        <span className="text-[#C8102E] sub-font font-medium text-xs uppercase tracking-widest">Why Us</span>
                    </div>
                    
                    <h2 className="text-5xl main-font font-semibold mb-6 leading-tight">We Take the Guesswork Out of Hiring Drywall Pros</h2>
                    <p className="text-[#A8A8A8] sub-font text-lg mb-8 leading-relaxed">Finding reliable drywall contractors can be stressful. Missed appointments, unclear estimates, hidden costs — it adds up. Igor Drywall makes it simple and transparent, handling every step from the initial quote to the final finish.</p>

                    <Link to="/quote" className="bg-[#C8102E] hover:bg-[#b00e28] text-white px-7 py-3 rounded-sm sub-font font-semibold inline-flex items-center gap-2 transition-all group">Request a Quote →</Link>                
                </div>

                <div>
                    {stats.map((item, index) => {
                        const isOpen = activeIndex === index;
                        
                        return (
                            <div key={item.id} className={`border border-[#333333] transition-all duration-300 bg-[#131313] ${ isOpen ? 'bg-[#1E1E1E] border-[#C8102E] relative z-10' : '' }`}>
                                <button onClick={() => toggleStat(index)} className={`cursor-pointer w-full flex items-center justify-between px-7 pt-6 text-left outline-none ${ isOpen ?  'pb-2' : 'pb-6' }`} >
                                
                                    <div className="flex items-center gap-4">
                                        {/* ID Badge */}
                                        <div className={`w-10 h-10 border rounded flex items-center justify-center text-[14px] main-font font-bold transition-all duration-500 ${
                                            isOpen 
                                                ? 'bg-[#C8102E] border-[#C8102E] text-white' 
                                                : 'border-[#333333] text-[#7A7A7A]'
                                            }`}>
                                            {item.id}
                                        </div>
                                        
                                        <span className={`sub-font text-lg font-semibold tracking-tight transition-colors ${ isOpen ? 'text-white' : 'text-gray-300' }`}>{item.title}</span>
                                    </div>
                                </button>

                                <div className={`grid transition-all duration-300 ease-in-out ${ isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0' }`}>
                                    <div className="overflow-hidden">
                                        <div className="sub-font pl-22 pr-18 pb-8 pt-0 text-[#7A7A7A] leading-relaxed text-[0.95rem]">{item.content}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}