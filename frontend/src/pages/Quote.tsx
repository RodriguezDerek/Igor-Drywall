import Footer from "../components/global/Footer";
import Navbar from "../components/navbar/Navbar";
import QuoteForm from "../components/quote/QuoteForm";
import QuoteInfo from "../components/quote/QuoteInfo";

export default function Quote() {
    return (
        <>
            <Navbar />
            <div className="flex min-h-screen items-stretch">
                <div className="w-[63%] flex">
                    <QuoteInfo />
                </div>
                <div className="w-[37%] flex">
                    <QuoteForm />
                </div>
            </div>
            <Footer />
        </>
    );
}