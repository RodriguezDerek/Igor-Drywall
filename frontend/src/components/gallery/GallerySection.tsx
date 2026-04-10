export default function GallerySection() {
    return (
        <section className="bg-[#131313] py-20 px-6 text-white">
            <div className="max-w-7xl mx-auto">
                {/* Top Accent & Label */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-px w-12 bg-[#C8102E]"></div>
                    <span className="text-xs sub-font font-medium tracking-[0.2em] text-[#C8102E] uppercase">
                        Our Work
                    </span>
                </div>

                <h2 className="text-5xl main-font font-semibold mb-8 leading-tight">Past Projects & Completed Jobs</h2>
                <p className="max-w-2xl text-base text-[#A8A8A8] sub-font font-normal leading-relaxed">A selection of completed work across all our trade disciplines. Every project shown was delivered on time, on budget, and to our full workmanship standard.</p>
            </div>
        </section>
    );
}