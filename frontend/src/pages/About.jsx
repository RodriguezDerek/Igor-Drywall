import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
    return (
      <>
          <Navbar />

          <div>
              <h1 className="text-4xl font-bold text-center mt-10">About Us</h1>
              <p className="text-center mt-4 text-gray-600 max-w-2xl mx-auto px-4">Igor Drywall is your trusted partner for expert drywall installation and repair. With years of experience, we deliver quality craftsmanship, reliable service, and solutions tailored to every project. From small repairs to full renovations, our skilled team is committed to your satisfaction. At Igor Drywall, we build more than walls—we build trust and lasting quality.</p>
          </div>

          <Footer />
      </>
    );
}
export default About;