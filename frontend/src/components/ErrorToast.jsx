import React from 'react';

function ErrorToast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="animate-slideInFade fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center justify-between w-[90%] max-w-md">
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-4 font-bold text-xl hover:text-red-200 cursor-pointer" aria-label="Close">&times;</button>
    </div>
  );
}
export default ErrorToast;
