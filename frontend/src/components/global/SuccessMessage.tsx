interface AlertProps {
    message: string | null;
    onClose?: () => void;
}

export default function SuccessMessage({ message, onClose }: AlertProps) {
    if (!message) return null;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between gap-3 bg-[#111a12] border border-green-900/50 p-4 rounded-lg shadow-2xl shadow-black/50">
                <div className="flex items-center gap-3">
                    <div className="shrink-0 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <p className="text-green-200 text-sm font-medium tracking-wide">{message}</p>
                </div>
                
                {onClose && (
                    <button onClick={onClose} className="text-green-900 hover:text-green-200 transition-colors p-1"aria-label="Close success">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}