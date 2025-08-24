import React from "react";

function WorkerDetails({ projectDetails, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative animate-fadeIn">
                {/* Close button */}
                <button onClick={onClose} className="cursor-pointer absolute top-4 right-4 text-gray-900 hover:text-gray-800 text-xl">&times;</button>

                {/* Title */}
                <h1 className="text-lg text-[#252525] font-semibold mb-4 plus-jakarta-700">{projectDetails.name}</h1>

                <hr className="mb-6 border-0 h-px bg-[#DBDBDB]" />

                {/* Two-column layout */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1 plus-jakarta-700">Client Name</p>
                        <div className="plus-jakarta-500 w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-sm text-[#252525] bg-gray-50">{projectDetails.clientName}</div>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1 plus-jakarta-700">Client Phone Number</p>
                        <div className="plus-jakarta-500 w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-sm text-[#252525] bg-gray-50">{projectDetails.clientPhoneNumber}</div>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1 plus-jakarta-700">Contractor Name</p>
                        <div className="plus-jakarta-500 w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-sm text-[#252525] bg-gray-50">{projectDetails.contractorName}</div>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1 plus-jakarta-700">Contractor Phone Number</p>
                        <div className="plus-jakarta-500 w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-sm text-[#252525] bg-gray-50">{projectDetails.contractorPhoneNumber}</div>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1 plus-jakarta-700">Start Date</p>
                        <div className="plus-jakarta-500 w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-sm text-[#252525] bg-gray-50">{projectDetails.startDate}</div>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1 plus-jakarta-700">Project Status</p>
                        <div className="plus-jakarta-500 w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-sm text-[#252525] bg-gray-50">{projectDetails.projectStatus}</div>
                    </div>

                </div>

                {/* Team */}
                <div className="mt-4">
                    <p className="text-xs font-medium text-gray-500 mb-1 plus-jakarta-700">Team</p>
                    <div className="plus-jakarta-500 w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-sm text-[#252525] bg-gray-50">{projectDetails.team}</div>
                </div>

                {/* Job Address */}
                <div className="mt-4">
                    <p className="text-xs font-medium text-gray-500 mb-1 plus-jakarta-700">Job Address</p>
                    <div className="plus-jakarta-500 w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-sm text-[#252525] bg-gray-50">{projectDetails.address}</div>
                </div>

                {/* Job Description */}
                <div className="mt-4">
                    <p className="text-xs font-medium text-gray-500 mb-1 plus-jakarta-700">Job Description</p>
                    <div className="plus-jakarta-500 w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-sm text-[#252525] bg-gray-50">{projectDetails.description}</div>
                </div>
            </div>
        </div>
    );
}

export default WorkerDetails;
