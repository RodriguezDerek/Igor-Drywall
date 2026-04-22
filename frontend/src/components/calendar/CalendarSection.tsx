import { useEffect, useState } from "react";
import ErrorMessage from "../global/ErrorMessage";
import SuccessMessage from "../global/SuccessMessage";
import { authFetch } from "../../utils/utils";
import CalendarWeekHeader from "./CalendarWeekHeader";
import CalendarGrid from "./CalendarGrid";

interface CalendarSectionProps {
    monthYear: string;
}

type ProjectTableDTO = {
    projectId: number;
    title: string;
    address: string;
    priority: string;
    projectStatus: string;
    startDate: string;
    clientName: string;
}; 

export default function CalendarSection({ monthYear }: CalendarSectionProps) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [projects, setProjects] = useState<ProjectTableDTO[] | null>(null);

    async function getProjectsByMonth() {
        try {
            const response = await authFetch(`http://localhost:8080/api/v1/projects/calendar?month=${monthYear}`, {
                method: "GET"
            });

            if (response.ok) {
                const data: ProjectTableDTO[] = await response.json();
                setProjects(data);
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");            
                setTimeout(() => setErrorMessage(null), 3000);
            }
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                switch (error.message) {
                    case "FORBIDDEN":
                        setErrorMessage("You do not have permission to view this.");
                        break;
                    case "UNAUTHORIZED":
                        setErrorMessage("Please log in.");
                        break;
                    default:
                        setErrorMessage("Something went wrong.");
                }
            }
            setTimeout(() => setErrorMessage(null), 3000);
        }
    }

    useEffect(() => {
        getProjectsByMonth();
    }, []);
    
    return (
        <>
            <CalendarWeekHeader />
            <CalendarGrid monthYear={monthYear} projects={projects}/>

            <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)}/>
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)}/>
        </>
    );
}