import React from 'react';

function ModalSuccessToast({ message, onClose }) {
    if (!message) return null;

    return (
        <div className="animate-slideInFade fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-3 py-1 rounded-md shadow-md z-50 flex items-center justify-between w-[85%] max-w-sm">
            <span className="text-xs font-semibold">{message}</span>
            <button onClick={onClose} className="ml-2 text-lg font-semibold hover:text-green-200 cursor-pointer" aria-label="Close">&times;</button>
        </div>
    );
}

export default ModalSuccessToast;
