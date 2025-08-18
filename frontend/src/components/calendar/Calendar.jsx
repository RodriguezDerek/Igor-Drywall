import React from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";

export default function Calendar({ year, month, onPrev, onNext, projects }){
    
    return(
        <>
            <div className="bg-white rounded-xl shadow-md p-4">
                <CalendarHeader year={year} month={month} onPrev={onPrev} onNext={onNext}/>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 mt-4">
                <CalendarGrid projects={projects} year={year} month={month}/>
            </div>
        </>
    );
}