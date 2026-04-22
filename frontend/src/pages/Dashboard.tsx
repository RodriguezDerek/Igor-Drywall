import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardProjectTable from "../components/dashboard/DashboardProjectTable";
import DashboardQuoteTable from "../components/dashboard/DashboardQuoteTable";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardWorkerTable from "../components/dashboard/DashboardWorkerTable";
import DashboardNavbar from "../components/navbar/DashboardNavbar";

export default function Dashboard() {
    return (
        <div className="flex min-h-screen">
            <DashboardNavbar />

            <div className="ml-64 flex-1 flex flex-col bg-white">
                <DashboardHeader />
                
                <main className="p-8 bg-[#0D0D0D] h-full">
                    <DashboardStats />
                    <DashboardProjectTable />
                    <DashboardQuoteTable />
                    <DashboardWorkerTable />
                </main>
            </div>
        </div>
    );
}