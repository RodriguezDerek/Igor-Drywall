type ProjectTableDTO = {
    projectId: number;
    title: string;
    address: string;
    priority: string;
    projectStatus: string;
    startDate: string;
    clientName: string;
}; 

interface CalendarDayProps {
    date: Date;
    projects: ProjectTableDTO[] | null;
    onSelect: (date: Date) => void;
    isSelected: boolean;
}

export default function CalendarDay({ date, projects, onSelect, isSelected }: CalendarDayProps) {
    const iso = date.toISOString().split("T")[0];
    const day = date.getDate();
    const projectsForDay = projects ? projects.filter(p => p.startDate === iso) : [];
    const hasProjects = projectsForDay.length > 0;

    const projectsToShow = projectsForDay.slice(0, 2);
    const remainingProjects = projectsForDay.slice(2);

    return (
        <div onClick={() => onSelect(date)} className={`relative bg-[#161616] border-[0.5px] h-26 p-2 text-md cursor-pointer transition ${ isSelected ? "border-[#C8102E] bg-[#C8102E]/24 text-[#C8102E]" : "border-[#333333] text-[#888888] hover:border-[#888888]/16 hover:bg-[#888888]/10 hover:text-white" }`}>
            <div className="sub-font text-sm">
                <p className="mb-4">{day < 10 ? `0${day}` : day}</p>
                
                {remainingProjects && remainingProjects.length > 0 && (
                    <div className="absolute top-2 right-2 flex justify-center items-center bg-[#888888]/14 rounded-2xl border border-[#888888] w-16 h-5.25">
                        <h1 className="sub-font text-[#888888] text-[12px]"> +{remainingProjects.length} more</h1>
                    </div>
                )}
                
                {hasProjects && projectsToShow.map((project, index) => (
                    <div key={index} className="mt-1 bg-[#888888]/14 rounded-xs border-l-3 border-[#888888]">
                        <h1 className="pl-2 pt-0.5 pr-0.5 pb-0.5 sub-font text-[#888888] text-[12px]">{project.clientName} - <span className="italic">{project.projectStatus}</span></h1>
                    </div>
                ))}
            </div>
        </div>
    );
}