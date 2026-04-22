export default function CalendarWeekHeader() {
    const week =['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']

    return (
        <div className="grid grid-cols-7 border-b-[0.5px] border-[#333333]">
            {week.map(day => (
                <div key={day} className="py-3 text-center text-xs sub-font font-normal text-[#888888] tracking-wider">
                    {day}
                </div>
            ))}
        </div>
    );
}