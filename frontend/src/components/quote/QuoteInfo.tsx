
interface StatItem {
    value: string;
    description: string;
}

interface ProcessItem {
    id: string;
    label: string;
    description: string;
}

const stats: StatItem[] = [
    {value: "24h", description: "Average response time"},
    {value: "$0", description: "No obligation to proceed"},
    {value: "100%", description: "Licensed professionals"}
]

const processes: ProcessItem[] = [
    {id: "01", label: "Submit your Request", description: "Fill in your contact and project details using the form."},
    {id: "02", label: "We Review & Follow Up", description: "We review your request and contact you within 24 hours to confirm details and provide a full estimate."},
    {id: "03", label: "Approve & Schedule", description: "Once you're happy with the estimate, we lock in a date and assign the right tradesperson for the job."},
    {id: "04", label: "Job Completed & Invoiced", description: "We complete the work to standard and send you a clear, itemised invoice via the platform."}
]

export default function QuoteInfo() {
    return (
        <section className="bg-[#131313] text-white py-16 px-6 lg:px-20 border-b border-r border-[#333333] w-full">
            <div className="max-w-6xl mx-auto">
                
                <div className="mb-10">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="h-0.5 w-12 bg-[#C8102E]"></span>
                        <span className="text-[#C8102E] uppercase tracking-widest text-xs sub-font font-medium">Free Estimate</span>
                    </div>
                    <h2 className="text-6xl font-semibold main-font mb-6">Request a <br /> Quote Today</h2>
                    <p className="text-[#A8A8A8] max-w-lg sub-font text-lg leading-relaxed">Fill in the form and we'll review your project details. Most estimates are delivered within one business day.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-[#161616] border border-[#333333] rounded-lg p-4 w-full">
                            <div className="text-[#C8102E] text-2xl main-font mb-1">{stat.value}</div>
                            <div className="text-[#7A7A7A] text-sm sub-font">{stat.description}</div>
                        </div>
                    ))}
                </div>

                <div className="space-y-0">
                    {processes.map((step, index) => (
                        <div key={index} className="flex items-start gap-6 py-8 border-t border-[#333333]">
                            <div className="shrink-0 w-10 h-10 border border-[#333333] flex items-center justify-center rounded text-base main-font text-[#7A7A7A]">{step.id}</div>
                            <div>
                                <h4 className="text-base sub-font font-semibold mb-1">{step.label}</h4>
                                <p className="text-[#7A7A7A] sub-font text-sm leading-relaxed max-w-2xl">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}