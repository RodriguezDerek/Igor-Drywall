import Navbar from "../components/Navbar";
import HeroSection from "../components/home/HeroSection";
import ServiceSection from "../components/home/ServiceSection";
import SlidingBar from "../components/home/SlidingBar";
import StatSection from "../components/home/StatSection";

export default function Home() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <SlidingBar />
            <ServiceSection />
            <StatSection />
        </>
    );
}