import { X, Plus } from 'lucide-react';

export default function SizeStockEditor({ sizes, onUpdateStock, onAddSize, onRemoveSize }) {
  function handleAddSize() {
    const label = window.prompt('Size label (e.g. US 11.0)');
    if (label && label.trim()) onAddSize(label.trim());
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[#8a8a8a] text-[11px] font-semibold tracking-[0.12em] mb-3">STOCK PER SIZE</p>
        <div className="space-y-2">
          {sizes.map((s, i) => (
            <div key={s.size} className="flex items-center justify-between bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-2.5">
              <span className="text-[#cfcfcf] text-sm">{s.size}</span>
              <input
                type="number"
                min={0}
                value={s.stock}
                onChange={(e) => onUpdateStock(i, Math.max(0, Number(e.target.value)))}
                style={{ color: '#c8ff00' }}
                className="w-16 bg-transparent text-right text-sm font-semibold outline-none"
              />
            </div>
          ))}
          {sizes.length === 0 && <p className="text-[#5a5a5a] text-xs">No sizes added yet.</p>}
        </div>
      </div>

      <div>
        <p className="text-[#8a8a8a] text-[11px] font-semibold tracking-[0.12em] mb-3">MULTI-CHIP SIZE SELECT</p>
        <div className="flex flex-wrap items-center gap-2">
          {sizes.map((s, i) => (
            <span
              key={s.size}
              style={{ background: '#c8ff00' }}
              className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full text-black text-xs font-bold"
            >
              {s.size}
              <button onClick={() => onRemoveSize(i)} aria-label={`Remove ${s.size}`} className="hover:opacity-70">
                <X size={12} />
              </button>
            </span>
          ))}
          <button
            onClick={handleAddSize}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-[#3a3a3a] text-[#9a9a9a] text-xs font-semibold hover:border-[#c8ff00] hover:text-[#c8ff00] transition-colors"
          >
            <Plus size={12} /> ADD SIZE
          </button>
        </div>
      </div>
    </div>
  );
}