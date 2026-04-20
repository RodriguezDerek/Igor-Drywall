import DashboardNavbar from "../components/navbar/DashboardNavbar";
import PendingWorkerList from "../components/worker/PendingWorkerList";
import WorkerHeader from "../components/worker/WorkerHeader";
import WorkerList from "../components/worker/WorkerList";

type UserData = {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
}

export default function Workers() {
    const storedUser = localStorage.getItem("user");
    const userData: UserData | null = storedUser ? JSON.parse(storedUser) : null;

    return (
        <div className="flex min-h-screen">
                <DashboardNavbar />
        
                <div className="ml-64 flex-1 flex flex-col bg-white">
                    <WorkerHeader /> 

                    <main className="p-8 bg-[#0D0D0D] h-full">
                            <WorkerList />

                            {userData && userData.role === "ADMIN" && (
                                <PendingWorkerList />
                            )}
                    </main>
            </div>
        </div>
    );
}