export default function TabsUnderline({ options, active, onChange }) {
  return (
    <div className="flex items-center gap-6 -mb-px">
      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`relative pb-3 text-sm font-semibold tracking-wide transition-colors ${
              isActive ? 'text-[#c8ff00]' : 'text-[#8a8a8a] hover:text-white'
            }`}
          >
            {option}
            {isActive && (
              <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#c8ff00] rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}