import ProfileModal from "../profile/ProfileModal";
import { Link } from "react-router-dom";

interface UserData {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
}

type Props = {
    isProfileModalOpen: boolean;
    setIsProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    userData: UserData | null;
};

interface MenuSection {
    name: string;
    baseImgPath: string;
    activeImgPath: string;
    destination: string;
}

const overviewSections: MenuSection[] = [
    { name: "Calendar", baseImgPath: "/dashboard_images/calendar_icon.png", activeImgPath: "/dashboard_images/calendar3_icon.png", destination: "/calendar" },
    { name: "Jobs", baseImgPath: "/dashboard_images/hammer_icon.png", activeImgPath: "/dashboard_images/hammer2_icon.png", destination: "/jobs" },
    { name: "Workers", baseImgPath: "/dashboard_images/person_icon.png", activeImgPath: "/dashboard_images/person2_icon.png", destination: "/workers" },
    { name: "Settings", baseImgPath: "/dashboard_images/settings_icon.png", activeImgPath: "/dashboard_images/settings2_icon.png", destination: "/settings" }
]

const groups = [
    { label: "Overview", items: overviewSections },
];

export default function DashboardWorkerNavbar({ isProfileModalOpen, setIsProfileModalOpen, userData }: Props) {
    return (
        <aside className="fixed flex flex-col w-64 h-screen bg-[#161616] text-[#888888] border-r border-[#333333]">
            <div className="p-6 border-b border-[#333333]">
                <h1 className="text-white text-xl main-font font-bold leading-tight">Igor Drywall Co LLC</h1>
                <p className="text-[12px] tracking-[0.2em] sub-font font-normal mt-1">OPERATIONS PLATFORM</p>
            </div>
    
            <nav className="flex-1 mt-6">
                {groups.map((group) => (
                    <div key={group.label} className="mb-6">
                        <h2 className="px-6 mb-2 text-xs text-[#888888] tracking-widest sub-font font-medium uppercase">{group.label}</h2>
                        <ul>
                            {group.items.map((item) => 
                                <Link to={item.destination} key={item.name} className="cursor-pointer w-full sub-font flex items-center px-6 py-3 transition-colors duration-200 group border-l-4 border-transparent hover:bg-[#2d1519] hover:text-white hover:border-[#C8102E]">
                                    <div className="relative w-5 h-5 mr-4">
                                        <img src={item.baseImgPath} alt={item.name} className="absolute inset-0 w-5 h-5 object-contain group-hover:hidden"/>
                                        <img src={item.activeImgPath} alt={item.name} className="absolute inset-0 w-5 h-5 object-contain hidden group-hover:block" />
                                    </div>                                        
                                    <span className="text-[15px] sub-font font-medium">{item.name}</span>
                                </Link>
                            )}
                        </ul>
                    </div>
                ))}
            </nav>
    
            <div className="p-4 border-t border-[#333333] flex items-center justify-between bg-[#161616]">
                { userData && (
                    <div className="flex items-center justify-center">
                        <button onClick={() => setIsProfileModalOpen(prev => !prev)} className="main-font font-semibold w-9.5 h-9.5 bg-[#C8102E] text-white rounded-full cursor-pointer mt-2">{userData.firstName.charAt(0).toUpperCase()}</button>                            <div className="ml-3">
                            <p className="text-white text-sm main-font font-semibold">{userData.firstName} {userData.lastName}</p>
                            <p className="text-xs sub-font opacity-50">{userData.role.charAt(0)}{userData.role.slice(1).toLowerCase()}</p>
                        </div>
    
                        {isProfileModalOpen && (
                            <div className="absolute left-10 bottom-10 z-10 mt-5.5">
                                <ProfileModal data={userData}/>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </aside>
    );
}