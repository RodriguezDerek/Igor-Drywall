export default function InvoiceHeader() {
    const currentDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date());

    return (
        <header className="flex items-center justify-between bg-[#161616] px-8 py-4 text-white border-b border-[#333333]">

            <div className="flex flex-col">
                <h1 className="main-font text-lg font-semibold tracking-wide">Invoices</h1>
                <nav className="flex items-center gap-2 mt-1 text-xs font-normal">
                    <span className="text-[#888888] cursor-pointer">Home</span>
                    <span className="text-[#C8102E] text-[10px] select-none">&gt;</span>
                    <span className="text-[#888888]">Invoices</span>
                </nav>
            </div>

            <div className="flex items-center gap-6">
                <span className="text-sm sub-font font-medium text-[#7A7A7A]">{currentDate}</span>
                
                <div className="h-6 w-px bg-gray-800" aria-hidden="true" />

                <div className="flex items-center gap-3">                    
                    <button type="button" className="cursor-pointer rounded bg-[#C8102E] px-4 py-2 text-xs sub-font font-semibold text-white">+ Create Invoice</button>
                </div>
            </div>

        </header>
    );
}