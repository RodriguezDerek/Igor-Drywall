import React from 'react';
import { useState } from 'react';
import ProfileModal from './ProfileModal';

function ProfileIcon(){
    const [open, setOpen] = useState(false);

    return (
        <>
            <div onClick={() => setOpen(!open)} className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center cursor-pointer">
                <svg className="w-5 h-5 text-white cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.5-2 4.5-4.5S14.7 3 12 3 7.5 5 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5V21h18v-3c0-3-6-4.5-9-4.5z"/>
                </svg>
            </div>
            {open && <ProfileModal close={() => setOpen(false)} />}
        </>
    );
}

export default ProfileIcon;