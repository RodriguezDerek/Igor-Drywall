import React from "react";
import CalendarHeader from "./CalendarHeader";

export default function Calendar({ year, month, jobs }){
    
    return(
        <div className="bg-white rounded-xl shadow-md p-4">
            <CalendarHeader year={year} month={month} />
        </div>
    );
}