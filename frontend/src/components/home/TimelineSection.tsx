interface TimelineStep {
    number: string;
    title: string;
    description: string;
    icon: string;
}

export default function TimelineSection() {
    
    const steps : TimelineStep[] = [
        { number: "01", title: "Submit a Quote", description: "Tell us about your project online. It takes under 5 minutes and there's no obligation to proceed.", icon: "/public_images/clipboard_icon.png" },
        { number: "02", title: "Approve & Schedule", description: "Review your personalised estimate, approve it online, and choose a date that works for you.", icon: "/public_images/checkmark_icon.png" },
        { number: "03", title: "Work Gets Done", description: "A verified tradesperson arrives on time and completes the work to our full quality standard.", icon: "/public_images/hammer_icon.png" },
        { number: "04", title: "Pay & Review", description: "Receive a clear invoice, pay securely online, and leave a review. Simple as that.", icon: "/public_images/invoice_icon.png" },
    ]

    return (
        <section className="bg-[#131313] text-white py-20 px-6 font-serif">
            <div className="max-w-7xl mx-auto text-center">

                <div className="flex flex-col items-center mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px w-8 bg-[#C8102E]"></div>
                        <span className="text-[#C8102E] text-sm uppercase tracking-widest sub-font">How It Works</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl main-font font-semibold mb-6">Simple. Transparent. Done Right.</h2>
                    <p className="text-[#7A7A7A] max-w-xl mx-auto sub-font text-sm leading-relaxed">Four straightforward steps from first contact to finished job. No confusion, no chasing — just results.</p>
                </div>

                <div className="relative">
                    <div className="hidden lg:block absolute top-8 h-px bg-[#C8102E] z-0" style={{ left: '12%', right: '12%' }}></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center group">
                                
                                {/* Circle Number */}
                                <div className="w-16 h-16 rounded-full border border-[#333333] bg-[#131313] flex items-center justify-center mb-6">
                                    <span className="text-xl text-[#7A7A7A] main-font ">{step.number}</span>
                                </div>

                                <img src={step.icon} className="mb-4 w-8 h-8"/>

                                <h3 className="main-font text-xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-[#7A7A7A] sub-font text-sm leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </section>
    );
}