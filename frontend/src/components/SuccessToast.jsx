import React from 'react';

function SuccessToast({ message, onClose }) {
    if (!message) return null;

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center justify-between w-[90%] max-w-md animate-slideInFade">
            <span className="text-sm font-medium">{message}</span>
            <button onClick={onClose} className="ml-4 font-bold text-xl hover:text-green-200" aria-label="Close">&times;</button>
        </div>
    );
}

export default SuccessToast;
