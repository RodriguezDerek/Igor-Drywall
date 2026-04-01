import Navbar from "../components/global/Navbar";
import AboutSection from "../components/about/AboutSection";
import TeamSection from "../components/about/TeamSection";
import Footer from "../components/global/Footer";
import CoreValues from "../components/about/CoreValues";

export default function About() {
    return (
        <>
            <Navbar />
            <AboutSection />
            <TeamSection />
            <CoreValues />
            <Footer />
        </>
    ); 
}