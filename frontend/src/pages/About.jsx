import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
    return (
    <>
        <Navbar />

        <section className="slide-in-medium flex flex-col md:flex-row items-stretch justify-center gap-12 px-6 md:px-20 py-16 bg-white rounded-3xl">
            {/* Text Section */}
            <div className="md:w-5/12 flex flex-col justify-center">
                <h4 className="custom-red-color-text font-semibold text-sm mb-2">About Us</h4>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Bringing Over a Decade of Drywall Expertise to Every Home and Project</h2>
                <p className="text-gray-700 text-base leading-relaxed">At Igor Drywall, we've built a reputation on reliable service, quality craftsmanship, and honest communication. With over 30 years of combined experience and 500+ projects completed, we handle everything from quick fixes to full renovations. Whether it's a single room or an entire building, we approach every job with care, precision, and professionalism. Great drywall work isn't just about smooth walls — it's about lasting results and a process you can trust.</p>
            </div>

            {/* Image Section */}
            <div className="md:w-5/12 flex items-center justify-center">
                <img src="/service_images/truck.webp" alt="Red truck parked on rocks near trees" className="w-full h-auto rounded-3xl object-cover"/>
            </div>
        </section>

        <section className="slide-up text-center px-6 md:px-32 py-16 bg-white">
            <h4 className="custom-red-color-text font-semibold text-sm mb-2">Our Mission and Values</h4>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Driven by Quality, Built with Care</h2>
            <p className="text-gray-700 text-base leading-relaxed max-w-6xl mx-auto">To provide dependable, high-quality drywall services that bring lasting value, comfort, and beauty to every space we touch. At Igor Drywall, we believe that excellent craftsmanship is more than just technical skill — it's about showing up on time, communicating clearly, and treating every job with the same care we'd give our own home. From small repairs to full renovations, our goal is to deliver results that not only meet expectations, but exceed them — every wall, every time. We focus on building trust through consistency, precision, and clear communication. No matter the size of the job, we approach each project with the same commitment to excellence and customer satisfaction.</p>
        </section>

        <section className="slide-up bg-white px-6 md:px-20 pb-16">
            <div className="flex flex-wrap justify-center gap-6">

                {/* Card 1 */}
                <div className="max-w-xs w-full h-84 border border-gray-400 rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col">
                <div className="bg-red-100 w-10 h-10 flex items-center justify-center rounded-full mb-4">
                    <img src="/maroon_icons/maroon_hammer.png" alt="Hammer icon" className="w-5 h-5" />
                </div>
                <h3 className="pt-4 font-semibold text-xl mb-3">Quality Workmanship</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                    We don't cut corners. Every detail matters, and we take pride in delivering clean, smooth, and durable results that stand the test of time — because true craftsmanship leaves no shortcuts.
                </p>
                </div>

                {/* Card 2 */}
                <div className="max-w-xs w-full h-84 border border-gray-400 rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col">
                <div className="bg-red-100 w-10 h-10 flex items-center justify-center rounded-full mb-4">
                    <img src="/maroon_icons/maroon_clock.png" alt="Clock icon" className="w-5 h-5" />
                </div>
                <h3 className="pt-4 font-semibold text-xl mb-3">Reliability</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                    When we say we'll be there, we mean it. From meeting deadlines to keeping you informed, you can count on us to be consistent, dependable, and professional from day one.
                </p>
                </div>

                {/* Card 3 */}
                <div className="max-w-xs w-full h-84 border border-gray-400 rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col">
                <div className="bg-red-100 w-10 h-10 flex items-center justify-center rounded-full mb-4">
                    <img src="/maroon_icons/maroon_talk.png" alt="Communication icon" className="w-5 h-5" />
                </div>
                <h3 className="pt-4 font-semibold text-xl mb-3">Clear Communication</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                    A successful project starts with trust and transparency. We keep the conversation open — always listening, explaining, and making sure you're comfortable and confident every step of the way.
                </p>
                </div>

                {/* Card 4 */}
                <div className="max-w-xs w-full h-84 border border-gray-400 rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col">
                <div className="bg-red-100 w-10 h-10 flex items-center justify-center rounded-full mb-4">
                    <img src="/maroon_icons/maroon_building.png" alt="Respect icon" className="w-5 h-5" />
                </div>
                <h3 className="pt-4 font-semibold text-xl mb-3">Respect for Your Space</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                    Whether we're in your home or on a job site, we treat the space with care. That means working cleanly, safely, and with respect — leaving behind only quality work, not a mess.
                </p>
                </div>

            </div>
        </section>

        <Footer />
    </>
    );
}
export default About;