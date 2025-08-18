import React from "react";
import CalendarDay from "./CalendarDay";

export default function CalendarGrid({ year, month, projects }){

    function getDaysArray(year, month) {
        const days = [];

        const firstDayOfMonth = new Date(year, month, 1);
        const startDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)

        const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

        // 🟥 Previous month's last few days
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate();

        for (let i = startDayOfWeek - 1; i >= 0; i--) {
            const day = prevMonthDays - i;
            const date = new Date(prevYear, prevMonth, day);
            days.push({ date, monthOffset: -1 });
        }

        // 🟩 Current month
        for (let day = 1; day <= totalDaysInMonth; day++) {
            const date = new Date(year, month, day);
            days.push({ date, monthOffset: 0 });
        }

        // 🟦 Next month's days
        const totalCells = 42;
        const remaining = totalCells - days.length;

        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = month === 11 ? year + 1 : year;

        for (let i = 1; i <= remaining; i++) {
            const date = new Date(nextYear, nextMonth, i);
            days.push({ date, monthOffset: 1 });
        }

        return days;
    }


    const daysArray = getDaysArray(year, month);

    return(
        <div className="grid grid-cols-7 gap-2 mt-4">
            {daysArray.map((obj, index) => (
                <CalendarDay
                    key={index}
                    date={obj.date}
                    projects={projects}
                    isCurrentMonth={obj.monthOffset === 0}
                />
            ))}
        </div>
    );
}

