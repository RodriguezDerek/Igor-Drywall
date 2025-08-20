import React from "react";

export default function SearchDetails({ projectDetails }) {
    if (!projectDetails) return null;

    return (
        <div className="bg-white p-4 rounded-md shadow-md mt-4 text-sm space-y-2 border custom-red-color-border">
            <h3 className="text-lg font-semibold custom-red-color-text border-b custom-red-color-border pb-2 mb-3">
                Project Details
            </h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <Detail label="Project Name" value={projectDetails.name} />
                <Detail label="Status" value={projectDetails.projectStatus} />
                <Detail label="Client Name" value={projectDetails.clientName} />
                <Detail label="Client Phone" value={projectDetails.clientPhoneNumber} />
                <Detail label="Contractor Name" value={projectDetails.contractorName} />
                <Detail label="Contractor Phone" value={projectDetails.contractorPhoneNumber} />
                <Detail label="Address" value={projectDetails.address} />
                <Detail label="Start Date" value={projectDetails.startDate} />
                <Detail label="Team Members" value={projectDetails.team} />
                <div className="col-span-2">
                    <Detail label="Description" value={projectDetails.description} />
                </div>
            </div>
        </div>
    );
}

function Detail({ label, value }) {
    return (
        <div>
            <p className="custom-red-color-text font-medium">{label}</p>
            <p className="text-gray-800">{value || "Not provided"}</p>
        </div>
    );
}
