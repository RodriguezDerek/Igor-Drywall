import DashboardNavbar from "../components/navbar/DashboardNavbar";
import SettingHeader from "../components/setting/SettingHeader";
import SettingSection from "../components/setting/SettingSection";

export default function Setting() {
    return (
        <div className="flex min-h-screen">
            <DashboardNavbar />
        
            <div className="ml-64 flex-1 flex flex-col bg-white">
                <SettingHeader />
                        
                <main className="p-8 bg-[#0D0D0D] h-full">
                    <SettingSection />
                </main>
            </div>
        </div>
    );
}