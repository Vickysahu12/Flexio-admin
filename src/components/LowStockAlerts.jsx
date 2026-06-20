import { AlertTriangle } from 'lucide-react';

export default function LowStockAlerts({ items, onRestockAll }) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-2xl w-full lg:w-[320px] shrink-0 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4" style={{ background: '#2a1414' }}>
        <AlertTriangle size={15} className="text-[#ef4444]" />
        <h2 className="text-[#f87171] font-bold text-xs tracking-[0.08em]">LOW STOCK ALERTS</h2>
      </div>

      <div className="p-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 bg-[#181818] border border-[#232323] rounded-xl px-3 py-3">
            <div className="w-11 h-11 rounded-lg bg-[#222] flex items-center justify-center text-[#7a7a7a] text-sm font-bold shrink-0">
              {item.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">{item.name}</p>
              <p className="text-[#6a6a6a] text-[10px] font-mono-data tracking-[0.05em]">{item.sku}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[#ef4444] text-lg font-bold leading-none">{String(item.left).padStart(2, '0')}</p>
              <p className="text-[#6a6a6a] text-[9px] tracking-[0.1em]">LEFT</p>
            </div>
          </div>
        ))}

        <button
          onClick={onRestockAll}
          className="w-full border border-dashed border-[#3a3a3a] rounded-xl py-3 text-[#9a9a9a] text-xs font-semibold tracking-[0.08em] hover:border-[#c8ff00] hover:text-[#c8ff00] transition-colors"
        >
          RESTOCK ALL LOW ITEMS
        </button>
      </div>
    </div>
  );
}
