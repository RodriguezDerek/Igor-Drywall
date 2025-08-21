import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router";

function Service() {

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center md:items-center justify-between px-6 md:px-0 py-16 bg-white pb-22">
        <div className="md:w-1/2 max-w-2xl px-6 md:px-20 slide-in-right-medium">
          <p className="text-sm custom-red-color-text font-semibold mb-2 plus-jakarta-700">Services</p>
          <h1 className="text-3xl md:text-4xl text-black leading-tight mb-4 plus-jakarta-700">Professional <span className="custom-red-color-text plus-jakarta-700">Drywall Services</span><br />for Your Next Project</h1>
          <p className="text-gray-600 mb-6 plus-jakarta-500">From new construction to remodeling, Igor Drywall delivers precise, dependable drywall services tailored to fit your space and vision.</p>
          
          <div className="flex gap-4">
            <button onClick={() => document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" })} className="plus-jakarta-700 text-[15px] cursor-pointer custom-red-color-background text-white px-5 py-2 rounded-md shadow transition">Our Services</button>
            <Link to="/project" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="plus-jakarta-700 text-[15px] cursor-pointer border border-gray-400 px-5 py-2 rounded-md font-medium text-gray-800 hover:bg-gray-100 transition">View Projects</Link>
          </div>
        </div>

        <div className="md:w-1/2 w-full h-86 relative flex items-center justify-end slide-in-right-medium">
          <div className="relative w-full h-full">
            <img src="/service_images/service.jpg" alt="Drywall Workers" className="absolute inset-0 w-full h-full object-cover rounded-l-lg shadow-lg" />
            <div className="absolute inset-0 w-full h-full bg-black/80 z-10 rounded-l-lg"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="bg-gray-50 py-16 px-6 md:px-20 pt-22 pb-22 slide-up">
        <div className="text-center mb-12">
          <p className="custom-red-color-text plus-jakarta-700 text-sm">Our Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-black mt-2 plus-jakarta-800">Expert Drywall Solutions for<br className="hidden md:block" /> Your Home or Business</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="rounded-2xl p-8 bg-white shadow hover:shadow-lg transition min-h-[260px]">
            <div className="custom-red-color-bg rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <img src="/icon_images/hammer1.png" alt="Installation Icon" className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-xl mb-2 plus-jakarta-700">Drywall Installation</h3>
            <p className="text-gray-600 text-[15px] plus-jakarta-500">We provide top-tier drywall installation services tailored to your specific project requirements—whether it’s new construction or a remodel. Our team ensures precise cuts, clean finishes, and durable results every time.</p>
          </div>

          <div className="rounded-2xl p-8 bg-white shadow hover:shadow-lg transition min-h-[260px]">
            <div className="custom-red-color-bg rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <img src="/icon_images/wrench1.png" alt="Repair Icon" className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-xl mb-2 plus-jakarta-700">Drywall Repair</h3>
            <p className="text-gray-600 text-[15px] plus-jakarta-500">From small dings to major cracks and water damage, we handle all types of drywall repair. Our process includes patching, sanding, and refinishing for seamless results that blend perfectly with the existing wall.</p>
          </div>

          <div className="rounded-2xl p-8 bg-white shadow hover:shadow-lg transition min-h-[260px]">
            <div className="custom-red-color-bg rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <img src="/icon_images/tape1.png" alt="Taping Icon" className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-xl mb-2 plus-jakarta-700">Taping & Coating</h3>
            <p className="text-gray-600 text-[15px] plus-jakarta-500">Achieve smooth, flawless walls with our expert taping and coating services. We apply joint compound and tape meticulously to ensure professional, polished surfaces that are ready for paint or finishing.</p>
          </div>

          <div className="rounded-2xl p-8 bg-white shadow hover:shadow-lg transition min-h-[260px]">
            <div className="custom-red-color-bg rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <img src="/icon_images/trash1.png" alt="Dust Icon" className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-xl mb-2 plus-jakarta-700">Drywall Dust Cleaning</h3>
            <p className="text-gray-600 text-[15px] plus-jakarta-500">Construction dust is no joke. Our team provides full drywall dust cleanup after installation or sanding, ensuring your space is clean, safe, and ready to use without lingering particles or debris.</p>
          </div>

          <div className="rounded-2xl p-8 bg-white shadow hover:shadow-lg transition min-h-[260px]">
            <div className="custom-red-color-bg rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <img src="/icon_images/water1.png" alt="Water Icon" className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-xl mb-2 plus-jakarta-700">Water Damage Repair</h3>
            <p className="text-gray-600 text-[15px] plus-jakarta-500">Water-damaged drywall can weaken structures and cause mold growth. We assess and repair affected areas with high-quality materials and industry-best techniques to restore strength and aesthetics.</p>
          </div>

          <div className="rounded-2xl p-8 bg-white shadow hover:shadow-lg transition min-h-[260px]">
            <div className="custom-red-color-bg rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <img src="/icon_images/building1.png" alt="Commercial Icon" className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-xl mb-2 plus-jakarta-700">Commercial Services</h3>
            <p className="text-gray-600 text-[15px] plus-jakarta-500">Our commercial drywall services are customized for offices, retail spaces, and other businesses. From framing to finishing, we deliver code-compliant, visually appealing results at any scale.</p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:pl-20 md:pr-0 py-16 bg-white">
        <div className="md:w-1/2 max-w-xl mb-10 md:mb-0 slide-in-right-medium">
          <p className="text-sm custom-red-color-text plus-jakarta-700 mb-2">Our Location</p>
          <h2 className="text-3xl md:text-4xl plus-jakarta-800 text-black leading-tight mb-4">
            Statewide Service —<br className="hidden md:block" />Serving All of Connecticut
          </h2>
          <p className="text-gray-600 mb-6 plus-jakarta-500">
            We proudly serve all of Connecticut, delivering reliable drywall craftsmanship and dedicated service to homes and businesses across the state.
          </p>
          <ul className="space-y-3 font-medium text-gray-800">
            <li className="flex items-center text-gray-800 plus-jakarta-600">
              <svg className="w-5 h-5 custom-red-color-text mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 10.5c0 5.25-7 11-7 11s-7-5.75-7-11a7 7 0 1114 0z" />
              </svg>
              Residential Projects
            </li>
            <li className="flex items-center text-gray-800 plus-jakarta-600">
              <svg className="w-5 h-5 custom-red-color-text mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 10.5c0 5.25-7 11-7 11s-7-5.75-7-11a7 7 0 1114 0z" />
              </svg>
              Commercial Properties
            </li>
            <li className="flex items-center text-gray-800 plus-jakarta-600">
              <svg className="w-5 h-5 custom-red-color-text mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 10.5c0 5.25-7 11-7 11s-7-5.75-7-11a7 7 0 1114 0z" />
              </svg>
              Renovation & New Construction
            </li>
          </ul>
        </div>

        <div className="md:w-1/2 w-full h-80 relative rounded-none md:rounded-l-xl overflow-hidden slide-in-right-medium">
          <img src="/service_images/truck.webp" alt="Truck on rocks" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 z-10"></div>
        </div>
      </section>

      <Footer />
    </>
  );
}
export default Service;