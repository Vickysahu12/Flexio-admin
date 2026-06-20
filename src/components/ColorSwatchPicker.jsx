import { Plus } from 'lucide-react';

export default function ColorSwatchPicker({ colors, selected, onSelect, onAddColor }) {
  function handleAdd() {
    const hex = window.prompt('Hex color (e.g. #ff5a36)');
    if (hex && /^#([0-9a-f]{3}){1,2}$/i.test(hex.trim())) {
      onAddColor(hex.trim());
    } else if (hex) {
      alert('That doesn\'t look like a valid hex color.');
    }
  }

  return (
    <div>
      <p className="text-[#8a8a8a] text-[11px] font-semibold tracking-[0.12em] mb-3">COLOR SWATCH</p>
      <div className="flex items-center gap-3">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onSelect(color)}
            aria-label={`Select color ${color}`}
            className="w-9 h-9 rounded-full border-2 transition-all"
            style={{
              background: color,
              borderColor: selected === color ? '#fff' : 'transparent',
              boxShadow: selected === color ? '0 0 0 2px #0a0a0a, 0 0 0 3px #c8ff00' : 'none',
            }}
          />
        ))}
        <button
          onClick={handleAdd}
          aria-label="Add color"
          className="w-9 h-9 rounded-full border border-dashed border-[#3a3a3a] flex items-center justify-center text-[#9a9a9a] hover:border-[#c8ff00] hover:text-[#c8ff00] transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}