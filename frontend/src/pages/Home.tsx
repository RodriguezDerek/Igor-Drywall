import Footer from "../components/global/Footer";
import Navbar from "../components/navbar/Navbar"
import HeroSection from "../components/home/HeroSection";
import ServiceSection from "../components/home/ServiceSection";
import SlidingBar from "../components/home/SlidingBar";
import StatSection from "../components/home/StatSection";
import TimelineSection from "../components/home/TimelineSection";
import WhyUsSection from "../components/home/WhyUsSection";

export default function Home() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <SlidingBar />
            <ServiceSection />
            <StatSection />
            <TimelineSection />
            <WhyUsSection />
            <Footer />
        </>
    );
}