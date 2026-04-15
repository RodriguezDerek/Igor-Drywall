import { useState } from "react";
import CalendarHeader from "../components/calendar/CalendarHeader";
import DashboardNavbar from "../components/navbar/DashboardNavbar";
import CalendarSection from "../components/calendar/CalendarSection";

export default function Calendar() {
    const [monthYear, setMonthYear] = useState<string>(() => {
        const today = new Date();
        return today.toISOString().slice(0, 7);
    });

    return (
        <div className="flex min-h-screen">
            <DashboardNavbar />

            <div className="ml-64 flex-1 flex flex-col bg-white">
                <CalendarHeader monthYear={monthYear} onMonthYearChange={setMonthYear} />            

                <main className="bg-[#0D0D0D] h-full">
                    <CalendarSection monthYear={monthYear}/>
                </main>
            </div>
        </div>
    );
}