import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageSlider from '../components/ImageSlider';
import { Link } from 'react-router-dom';

function Home() {

  return (
    <>
        <Navbar />
        {/* Hero Section */}
        <div className="relative bg-cover bg-center h-140 flex items-center" style={{ backgroundImage: "url('/home_images/hero.png')" }}>
          
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/90 z-10"></div>

            {/* Content */}
            <div className="slide-in-slow relative z-10 max-w-3xl text-white px-8 pl-40">
                <h1 className="text-5xl plus-jakarta-800 leading-tight">Building Better Walls <br/>for your <span className="custom-red-color-text">Future</span></h1>
                <p className="mt-6 plus-jakarta-400 text-gray-200 text-[15px]">We deliver high-quality drywall services with unmatched precision, reliability, and meticulous attention to detail. Whether you're renovating your home or outfitting a commercial space, our expert team ensures every project is completed to the highest standards.</p>
                <div className="mt-4 flex space-x-4">
                    <Link to="/service" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[14px] custom-red-color-background text-white plus-jakarta-600 px-5 py-2 rounded shadow transition">Our Services</Link>
                    <Link to="/project" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[14px] border border-white text-white plus-jakarta-600 px-5 py-2 rounded hover:bg-white hover:text-black transition">View Projects</Link>
                </div>
            </div>
        </div>

        {/* About Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-16 bg-white pt-16">

          {/* Text Section */}
          <div className="slide-in-right-slow max-w-xl pl-10">
            <p className="custom-red-color-text plus-jakarta-700 mb-2">About Us</p>
            <h2 className="text-4xl plus-jakarta-800 leading-tight mb-6">Committed to Excellence in Craftsmanship and Service</h2>
            <p className="text-gray-600 mb-8 plus-jakarta-500 text-[15px]">Igor Drywall is your trusted partner for expert drywall installation and repair. With years of experience, we deliver quality craftsmanship, reliable service, and solutions tailored to every project. From small repairs to full renovations, our skilled team is committed to your satisfaction. At Igor Drywall, we build more than walls—we build trust and lasting quality.</p>
            <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="custom-red-color-background text-white plus-jakarta-500 text-[15px] px-6 py-3 rounded">Discover More</Link>
          </div>

          {/* Image Slider Section */}
          <ImageSlider />

        </div>

        {/* Services Section */}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-20 mt-2 mb-6">
          <div className="slide-in-slow max-w-7xl ml-0 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-13 h-1 custom-red-color-bg"></div>
              <div>
                <h2 className="text-3xl font-semibold text-black plus-jakarta-700">
                  Drywall <span className="custom-red-color-text plus-jakarta-700">Services</span>
                </h2>
                <h3 className="text-3xl font-semibold text-black plus-jakarta-700">
                  That Fit Your Project
                </h3>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            
            <div className="slide-in-slow border border-gray-200 rounded-md p-6 text-left">
              <div className="bg-red-100 p-3 inline-block rounded mb-4">
                <div className="w-6 h-6 text-red-700 flex justify-center align-center" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <img src="/home_images/hammer_icon.png" className="w-10 h-6"/>
                </div>
              </div>
              <h3 className="text-lg plus-jakarta-700 mb-2">Drywall Installation</h3>
              <p className="text-gray-600 text-sm plus-jakarta-400">Professional drywall installation tailored to fit projects of all sizes, ensuring clean lines, secure fitting, and high-quality finishes that serve as the perfect foundation for painting or texturing.</p>
            </div>

            <div className="slide-in-medium border border-gray-200 rounded-md p-6 text-left">
              <div className="bg-red-100 p-3 inline-block rounded mb-4">
                <div className="w-6 h-6 text-red-700 flex justify-center align-center" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <img src="/home_images/wrench_icon.png" className="w-10 h-6"/>
                </div>
              </div>
              <h3 className="text-lg plus-jakarta-700 mb-2">Drywall Repair</h3>
              <p className="text-gray-600 text-sm plus-jakarta-400">Dependable and efficient drywall repair services for all types of damage, including holes, dents, cracks, and wear from everyday use—restoring your walls to a smooth, like-new condition.</p>
            </div>

            <div className="slide-in-fast border border-gray-200 rounded-md p-6 text-left">
              <div className="bg-red-100 p-3 inline-block rounded mb-4">
                <div className="w-6 h-6 text-red-700 flex justify-center align-center" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <img src="/home_images/tape_icon.png" className="w-10 h-6"/>
                </div>
              </div>
              <h3 className="text-lg plus-jakarta-700 mb-2">Taping & Coating</h3>
              <p className="text-gray-600 text-sm plus-jakarta-400">Expert taping and multi-layer coating techniques that eliminate seams and create a flawless surface, ready for final paint or wall covering, giving your space a polished and professional appearance.</p>
            </div>

            <div className="slide-in-slow border border-gray-200 rounded-md p-6 text-left">
              <div className="bg-red-100 p-3 inline-block rounded mb-4">
                <div className="w-6 h-6 text-red-700 flex justify-center align-center" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <img src="/home_images/building_icon.png" className="w-10 h-6"/>
                </div>
              </div>
              <h3 className="text-lg plus-jakarta-700 mb-2">Commercial Services</h3>
              <p className="text-gray-600 text-sm plus-jakarta-400">Custom drywall solutions designed specifically for commercial spaces, with a focus on meeting building codes, accommodating large-scale layouts, and minimizing disruption to daily operations.</p>
            </div>

            <div className="slide-in-medium border border-gray-200 rounded-md p-6 text-left">
              <div className="bg-red-100 p-3 inline-block rounded mb-4">
                <div className="w-6 h-6 text-red-700 flex justify-center align-center" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <img src="/home_images/water_icon.png" className="w-10 h-6"/>
                </div>
              </div>
              <h3 className="text-lg plus-jakarta-700 mb-2">Water Damage Repair</h3>
              <p className="text-gray-600 text-sm plus-jakarta-400">Specialized repair services for drywall damaged by leaks, floods, or humidity—removing compromised sections and replacing them with structurally sound, mold-resistant materials.</p>
            </div>

            <div className="slide-in-fast border border-gray-200 rounded-md p-6 text-left">
              <div className="bg-red-100 p-3 inline-block rounded mb-4">
                <div className="w-6 h-6 text-red-700 flex justify-center align-center" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <img src="/home_images/trash_icon.png" className="w-10 h-6"/>
                </div>
              </div>
              <h3 className="text-lg plus-jakarta-700 mb-2">Drywall Dust Cleaning</h3>
              <p className="text-gray-600 text-sm plus-jakarta-400">Thorough post-project clean-up that removes all drywall dust and debris from the work area, ensuring a spotless, safe, and ready-to-use environment once your installation or repair is complete.</p>
            </div>
          </div>

          <div className="slide-in-medium mt-10 flex justify-center">
            <Link to="/service" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="plus-jakarta-600 custom-red-color-background text-white px-6 py-2 rounded-md text-sm transition">Explore More</Link>
          </div>
        </section>

        <Footer />
    </>
  );
}
export default Home;