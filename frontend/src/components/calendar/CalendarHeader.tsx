interface CalendarHeaderProps {
    monthYear: string;
    onMonthYearChange: React.Dispatch<React.SetStateAction<string>>;
}

export default function CalendarHeader({ monthYear, onMonthYearChange }: CalendarHeaderProps) {
    return (
        <header className="flex items-center justify-between bg-[#161616] px-8 py-4 text-white border-b border-[#333333]">

            <div className="flex flex-col">
                <h1 className="main-font text-lg font-semibold tracking-wide">Calendar</h1>
                <nav className="flex items-center gap-2 mt-1 text-xs font-normal">
                    <span className="text-[#888888] cursor-pointer">Home</span>
                    <span className="text-[#C8102E] text-[10px] select-none">&gt;</span>
                    <span className="text-[#888888]">Calendar</span>
                </nav>
            </div>

            <div className="flex items-center gap-6">
                <input type="month" value={monthYear || ""} onChange={(e) => onMonthYearChange(e.target.value)} className="sub-font font-normal bg-[#1E1E1E] border border-[#333333] rounded p-2 text-sm focus:outline-none focus:border-[#C8102E] transition-colors placeholder:text-[#484848]" />                
                <div className="h-6 w-px bg-gray-800" aria-hidden="true" />

                <div className="flex items-center gap-3">                    
                    <button type="button" className="cursor-pointer rounded bg-[#C8102E] px-4 py-2 text-xs sub-font font-semibold text-white">+ Create Job</button>
                </div>
            </div>

        </header>
    );
}