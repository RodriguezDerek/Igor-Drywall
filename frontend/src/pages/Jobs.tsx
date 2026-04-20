import JobHeader from "../components/jobs/JobHeader";
import DashboardNavbar from "../components/navbar/DashboardNavbar";

export default function Jobs() {

    return (
        <div className="flex min-h-screen">
            <DashboardNavbar />
        
            <div className="ml-64 flex-1 flex flex-col bg-white">
                <JobHeader />
                        
                <main className="p-8 bg-[#0D0D0D] h-full">
                </main>
            </div>
        </div>
    );
}