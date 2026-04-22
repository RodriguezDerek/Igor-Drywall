import SettingPassword from "./SettingPassword";
import SettingUserDetail from "./SettingUserDetail";

interface UserData {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
}

export default function SettingSection() {
    const storedUser = localStorage.getItem("user");
    const userData: UserData | null = storedUser ? JSON.parse(storedUser) : null;

    return (
        <>
            {userData && (
                <div>
                    <SettingUserDetail userData={userData} />
                    <SettingPassword />
                </div>                
            )}
        </>
    );
}