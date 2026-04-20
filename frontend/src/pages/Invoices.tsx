import InvoiceHeader from "../components/invoice/InvoiceHeader";
import InvoiceStats from "../components/invoice/InvoiceStats";
import InvoiceTable from "../components/invoice/InvoiceTable";
import DashboardNavbar from "../components/navbar/DashboardNavbar";

export default function Invoices() {
    return (
        <div className="flex min-h-screen">
            <DashboardNavbar />
        
            <div className="ml-64 flex-1 flex flex-col bg-white">
                <InvoiceHeader />
                        
                <main className="p-8 bg-[#0D0D0D] h-full">
                    <InvoiceStats />
                    <InvoiceTable />
                </main>
            </div>
        </div>
    );
}