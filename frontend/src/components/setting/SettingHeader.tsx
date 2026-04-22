export default function SettingHeader() {
    const currentDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date());

    return (
        <header className="flex items-center justify-between bg-[#161616] px-8 py-4 text-white border-b border-[#333333]">

            <div className="flex flex-col">
                <h1 className="main-font text-lg font-semibold tracking-wide">Settings</h1>
                <nav className="flex items-center gap-2 mt-1 text-xs font-normal">
                    <span className="text-[#888888] cursor-pointer">Home</span>
                    <span className="text-[#C8102E] text-[10px] select-none">&gt;</span>
                    <span className="text-[#888888]">Settings</span>
                </nav>
            </div>

            <div className="flex items-center gap-6">
                <span className="text-sm sub-font font-medium text-[#7A7A7A]">{currentDate}</span>
            </div>

        </header>
    );
}