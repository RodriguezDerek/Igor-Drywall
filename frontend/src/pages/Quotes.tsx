import DashboardNavbar from "../components/navbar/DashboardNavbar";
import QuoteHeader from "../components/quote/QuoteHeader";

export default function Quotes() {
    return (
        <div className="flex min-h-screen">
                <DashboardNavbar />
                
                <div className="ml-64 flex-1 flex flex-col bg-white">
                    <QuoteHeader />

                    <main className="p-8 bg-[#0D0D0D] h-full">

                    </main>
                </div>
        </div>
    );
}