import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar";
import ServiceDetail from "../components/service/ServiceDetail";
import ServicesList from "../components/service/ServicesList";

export default function Service() {
    return (
        <>
            <Navbar />
            <ServicesList />
            <ServiceDetail />
            <Footer />
        </>
    );
}