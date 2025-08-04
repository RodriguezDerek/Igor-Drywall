import React, { useState } from 'react';
import ProfileModal from './ProfileModal';

function ProfileIcon(){
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Profile button */}
            <div onClick={() => setOpen(!open)} className="w-10 h-10 rounded-full custom-red-color-background flex items-center justify-center cursor-pointer mr-20">
                <svg className="w-5 h-5 text-white cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.5-2 4.5-4.5S14.7 3 12 3 7.5 5 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5V21h18v-3c0-3-6-4.5-9-4.5z"/>
                </svg>
            </div>

            {/* Modal rendered separately, absolutely positioned */}
            {open && (
                <div className="absolute top-20 right-6 z-50">
                    <ProfileModal close={() => setOpen(false)} />
                </div>
            )}
        </>
    );
}

export default ProfileIcon;
