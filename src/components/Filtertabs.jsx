export default function FilterTabs({ options, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            style={isActive ? { background: '#c8ff00' } : {}}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-[0.05em] transition-colors ${
              isActive ? 'text-black' : 'bg-[#1b1b1b] text-[#9a9a9a] hover:text-white'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}