import { useState } from "react";
import CalendarDay from "./CalendarDay";
import CalendarList from "./CalendarList";

type ProjectTableDTO = {
    projectId: number;
    title: string;
    address: string;
    priority: string;
    projectStatus: string;
    startDate: string;
    clientName: string;
}; 

interface CalendarGridProps {
    monthYear: string; // "2026-04"
    projects: ProjectTableDTO[] | null
} 

export default function CalendarGrid({ monthYear, projects }: CalendarGridProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const selectedIso = selectedDate ? selectedDate.toISOString().split("T")[0] : null; // 2026-04-20 format
    const selectedDayProjects = selectedIso && projects ? projects.filter(p => p.startDate === selectedIso) : [];

    const [yearStr, monthStr] = monthYear.split("-");
    const year = Number(yearStr);
    const month = Number(monthStr) - 1;
    const daysArray = getDaysArray(year, month);

    function getDaysArray(year: number, month: number) {
        const days = [];

        const firstDayOfMonth = new Date(year, month, 1);
        const startDayOfWeek = firstDayOfMonth.getDay();

        const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

        // ⬜ Empty cells for alignment
        for (let i = 0; i < startDayOfWeek; i++) {
            days.push(null);
        }

        // 🟩 Current month days
        for (let day = 1; day <= totalDaysInMonth; day++) {
            const date = new Date(year, month, day);
            days.push({ date, monthOffset: 0 });
        }

        return days;
    }

    return (
        <>
            <div className="grid grid-cols-7">
                {daysArray.map((obj, index) =>
                    obj ? (
                        <CalendarDay key={index} date={obj.date} projects={projects} onSelect={setSelectedDate} isSelected={selectedDate?.toDateString() === obj.date.toDateString()} />
                    ) : (
                        <div key={index} className="relative bg-[#161616] border-[0.5px] border-[#333333] h-26 p-2 text-md text-[#888888]"></div>
                    )
                )}
            </div>

            {selectedDate ? (
                <CalendarList date={selectedDate} projectsToShow={selectedDayProjects} />
            ) : (
                <div>
                    <div className="h-16.5 flex justify-between items-center px-4 py-3 bg-[#161616] border-b border-t border-[#333333] mt-10"></div>
                    <div className="h-39.25 flex flex-col items-center justify-center py-8 border-b border-[#333333] bg-[#161616] mb-10"></div>
                </div>
            )}
        </>
    );
}