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
          <p className="text-sm custom-red-color-text font-semibold mb-2">Services</p>
          <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-4">Professional <span className="custom-red-color-text">Drywall Services</span><br />for Your Next Project</h1>
          <p className="text-gray-600 mb-6">From new construction to remodeling, Igor Drywall delivers precise, dependable drywall services tailored to fit your space and vision.</p>
          
          <div className="flex gap-4">
            <button className="cursor-pointer custom-red-color-background text-white px-5 py-2 rounded-md font-medium shadow transition">Our Services</button>
            <Link to="/project" className="cursor-pointer border border-gray-400 px-5 py-2 rounded-md font-medium text-gray-800 hover:bg-gray-100 transition">View Projects</Link>
          </div>
        </div>

        <div className="md:w-1/2 w-full h-86 relative flex items-center justify-end slide-in-right-medium">
          <div className="relative w-full h-full">
            <img src="/service_images/service.jpg" alt="Drywall Workers" className="absolute inset-0 w-full h-full object-cover rounded-l-lg shadow-lg" />
            <div className="absolute inset-0 w-full h-full bg-black/70 z-10 rounded-l-lg"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section class="bg-gray-50 py-16 px-6 md:px-20 pt-22 pb-22 slide-up">
        <div class="text-center mb-12">
          <p class="custom-red-color-text font-semibold text-sm">Our Services</p>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Expert Drywall Solutions for<br class="hidden md:block" /> Your Home or Business</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div class="rounded-2xl p-8 bg-white shadow hover:shadow-lg transition min-h-[260px]">
            <div class="custom-red-color-bg rounded-full w-10 h-10 flex items-center justify-center mb-4">
              <img src="/icon_images/hammer1.png" alt="Installation Icon" class="w-5 h-5" />
            </div>
            <h3 class="font-semibold text-xl mb-2">Drywall Installation</h3>
            <p class="text-gray-600 text-sm">We provide top-tier drywall installation services tailored to your specific project requirements—whether it’s new construction or a remodel. Our team ensures precise cuts, clean finishes, and durable results every time.</p>
          </div>

          <div class="rounded-2xl p-8 bg-white shadow hover:shadow-lg transition min-h-[260px]">
            <div class="custom-red-color-bg rounded-full w-10 h-10 flex items-center justify-center mb-4">
              <img src="/icon_images/wrench1.png" alt="Repair Icon" class="w-5 h-5" />
            </div>
            <h3 class="font-semibold text-xl mb-2">Drywall Repair</h3>
            <p class="text-gray-600 text-sm">From small dings to major cracks and water damage, we handle all types of drywall repair. Our process includes patching, sanding, and refinishing for seamless results that blend perfectly with the existing wall.</p>
          </div>

          <div class="rounded-2xl p-8 bg-white shadow hover:shadow-lg transition min-h-[260px]">
            <div class="custom-red-color-bg rounded-full w-10 h-10 flex items-center justify-center mb-4">
              <img src="/icon_images/tape1.png" alt="Taping Icon" class="w-5 h-5" />
            </div>
            <h3 class="font-semibold text-xl mb-2">Taping & Coating</h3>
            <p class="text-gray-600 text-sm">Achieve smooth, flawless walls with our expert taping and coating services. We apply joint compound and tape meticulously to ensure professional, polished surfaces that are ready for paint or finishing.</p>
          </div>

          <div class="rounded-2xl p-8 bg-white shadow hover:shadow-lg transition min-h-[260px]">
            <div class="custom-red-color-bg rounded-full w-10 h-10 flex items-center justify-center mb-4">
              <img src="/icon_images/trash1.png" alt="Dust Icon" class="w-5 h-5" />
            </div>
            <h3 class="font-semibold text-xl mb-2">Drywall Dust Cleaning</h3>
            <p class="text-gray-600 text-sm">Construction dust is no joke. Our team provides full drywall dust cleanup after installation or sanding, ensuring your space is clean, safe, and ready to use without lingering particles or debris.</p>
          </div>

          <div class="rounded-2xl p-8 bg-white shadow hover:shadow-lg transition min-h-[260px]">
            <div class="custom-red-color-bg rounded-full w-10 h-10 flex items-center justify-center mb-4">
              <img src="/icon_images/water1.png" alt="Water Icon" class="w-5 h-5" />
            </div>
            <h3 class="font-semibold text-xl mb-2">Water Damage Repair</h3>
            <p class="text-gray-600 text-sm">Water-damaged drywall can weaken structures and cause mold growth. We assess and repair affected areas with high-quality materials and industry-best techniques to restore strength and aesthetics.</p>
          </div>

          <div class="rounded-2xl p-8 bg-white shadow hover:shadow-lg transition min-h-[260px]">
            <div class="custom-red-color-bg rounded-full w-10 h-10 flex items-center justify-center mb-4">
              <img src="/icon_images/building1.png" alt="Commercial Icon" class="w-5 h-5" />
            </div>
            <h3 class="font-semibold text-xl mb-2">Commercial Services</h3>
            <p class="text-gray-600 text-sm">Our commercial drywall services are customized for offices, retail spaces, and other businesses. From framing to finishing, we deliver code-compliant, visually appealing results at any scale.</p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section class="flex flex-col md:flex-row items-center justify-between px-6 md:pl-20 md:pr-0 py-16 bg-white">
        <div class="md:w-1/2 max-w-xl mb-10 md:mb-0 slide-in-right-medium">
          <p class="text-sm custom-red-color-text font-semibold mb-2">Our Location</p>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            Statewide Service —<br class="hidden md:block" />Serving All of Connecticut
          </h2>
          <p class="text-gray-600 mb-6">
            We proudly serve all of Connecticut, delivering reliable drywall craftsmanship and dedicated service to homes and businesses across the state.
          </p>
          <ul class="space-y-3 font-medium text-gray-800">
            <li class="flex items-center text-gray-800">
              <svg class="w-5 h-5 custom-red-color-text mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 10.5c0 5.25-7 11-7 11s-7-5.75-7-11a7 7 0 1114 0z" />
              </svg>
              Residential Projects
            </li>
            <li class="flex items-center text-gray-800">
              <svg class="w-5 h-5 custom-red-color-text mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 10.5c0 5.25-7 11-7 11s-7-5.75-7-11a7 7 0 1114 0z" />
              </svg>
              Commercial Properties
            </li>
            <li class="flex items-center text-gray-800">
              <svg class="w-5 h-5 custom-red-color-text mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 10.5c0 5.25-7 11-7 11s-7-5.75-7-11a7 7 0 1114 0z" />
              </svg>
              Renovation & New Construction
            </li>
          </ul>
        </div>

        <div class="md:w-1/2 w-full h-80 relative rounded-none md:rounded-l-xl overflow-hidden slide-in-right-medium">
          <img src="/service_images/truck.webp" alt="Truck on rocks" class="absolute inset-0 w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/60 z-10"></div>
        </div>
      </section>

      <Footer />
    </>
  );
}
export default Service;