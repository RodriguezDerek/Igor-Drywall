import React from "react";

export default function CalendarHeader({ year, month }){
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="mb-1 px-2">
            {/* Flex row with arrows and month/year */}
            <div className="flex items-center justify-center">
                {/* Left arrow */}
                <button className="text-gray-600 text-xl font-bold hover:text-black custom-red-color-background p-2 rounded-md cursor-pointer flex items-center justify-center">
                    <img src="/calendar/arrow.png" className="h-2 rotate-180" />
                </button>

                {/* Month + Year */}
                <h2 className="text-xl font-bold text-gray-800 px-10">{monthNames[month]} {year}</h2>

                {/* Right arrow */}
                <button className="text-gray-600 text-xl font-bold hover:text-black custom-red-color-background p-2 rounded-md cursor-pointer flex items-center justify-center">
                    <img src="/calendar/arrow.png" className="h-2" />
                </button>
            </div>

            {/* Horizontal line */}
            <hr className="mt-4 border-t border-[#b8b8b8]" />

            {/* Days of the week row */}
            <div className="flex justify-between text-center text-sm text-[#a0a0a0] mt-4 px-1 font-semibold">
                <div className="w-full">SUN</div>
                <div className="w-full">MON</div>
                <div className="w-full">TUE</div>
                <div className="w-full">WED</div>
                <div className="w-full">THU</div>
                <div className="w-full">FRI</div>
                <div className="w-full">SAT</div>
            </div>
        </div>
    );
}