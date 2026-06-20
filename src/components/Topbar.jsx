import { Search, Bell } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="flex items-center gap-4 px-8 pt-8 pb-2">
      <div className="flex-1 max-w-[480px] relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6a6a6a]" />
        <input
          type="text"
          placeholder="SEARCH SYSTEM..."
          className="w-full bg-[#141414] border border-[#262626] rounded-xl pl-11 pr-4 py-3 text-[#8a8a8a] text-xs font-mono-data tracking-[0.1em] placeholder:text-[#5a5a5a] focus:border-[#c8ff00] outline-none transition-colors"
        />
      </div>

      <button
        aria-label="Notifications"
        className="w-11 h-11 shrink-0 rounded-xl border border-[#262626] flex items-center justify-center text-white hover:border-[#3a3a3a] transition-colors"
      >
        <Bell size={17} />
      </button>

      <button
        style={{ background: '#c8ff00' }}
        className="shrink-0 px-5 py-3 rounded-xl text-black text-xs font-bold tracking-[0.08em] hover:opacity-90 transition-opacity"
      >
        EXPORT REPORT
      </button>
    </header>
  );
}
