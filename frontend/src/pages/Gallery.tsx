import GallerySection from "../components/gallery/GallerySection";
import GalleryView from "../components/gallery/GalleryView";
import Footer from "../components/global/Footer";
import Navbar from "../components/navbar/Navbar";

export default function Gallery() {
    return (
        <>
            <Navbar />
            <GallerySection />
            <GalleryView />
            <Footer />
        </>
    );
}