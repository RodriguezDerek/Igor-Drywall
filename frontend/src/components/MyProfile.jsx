import React from "react";

function MyProfile({ userInfo }){
    if (!userInfo) {
        return <p className="text-center text-gray-500">Loading profile...</p>;
    } 

    return(
        <div className=" h-[88%] w-full max-w-sm mx-auto bg-white rounded-xl shadow-md text-center space-y-4">
            {/* Avatar */}
            <div className="w-15 h-15 mx-auto rounded-full bg-red-800 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.5-2 4.5-4.5S14.7 3 12 3 7.5 5 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5V21h18v-3c0-3-6-4.5-9-4.5z" /></svg>
            </div>

            <div>
                <h2 className="text-lg plus-jakarta-700">{userInfo.firstName} {userInfo.lastName}</h2>
                <p className="text-gray-500 text-[12px] plus-jakarta-500 pt-1">{userInfo.email}</p>
            </div>

            {/* Info Boxes */}
            <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                        <p className="text-left text-[13px] plus-jakarta-700">Date Added</p>
                        <div className="w-40 text-[13px] plus-jakarta-700 border border-gray-400 rounded-md px-3 py-2 mt-1 text-center text-black">{userInfo.dateAdded}</div>
                    </div>

                    <div>
                        <p className="text-left text-[13px] plus-jakarta-700">Status</p>
                        <div className="w-40 text-[13px] plus-jakarta-700 border border-gray-400 rounded-md px-3 py-2 mt-1 text-center text-black">{userInfo.role}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MyProfile;   