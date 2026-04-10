import { useState } from "react";
import DashboardAdminNavbar from "./DashboardAdminNavbar";
import DashboardWorkerNavbar from "./DashboardWorkerNavbar";

interface UserData {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
}

export default function DashboardNavbar() {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

    const storedUser = localStorage.getItem("user");
    const userData: UserData | null = storedUser ? JSON.parse(storedUser) : null;

    return (
        <>
            {userData && userData.role === "ADMIN" ? (
                <DashboardAdminNavbar
                    isProfileModalOpen={isProfileModalOpen}
                    setIsProfileModalOpen={setIsProfileModalOpen}
                    userData={userData}
                />
            ) : (
                <DashboardWorkerNavbar
                    isProfileModalOpen={isProfileModalOpen}
                    setIsProfileModalOpen={setIsProfileModalOpen}
                    userData={userData}
                />
            )}
        </>
    );
}