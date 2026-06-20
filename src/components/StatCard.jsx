export default function StatCard({ icon: Icon, label, value, change, changeType }) {
  const isFlat = changeType === 'flat';
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-2xl p-5 flex-1 min-w-[220px]">
      <div className="flex items-center justify-between mb-5">
        <div className="w-10 h-10 rounded-lg bg-[#1b1b1b] flex items-center justify-center">
          <Icon size={17} style={{ color: '#c8ff00' }} />
        </div>
        <span
          className={`text-[10px] font-mono-data font-semibold px-2 py-1 rounded-md tracking-[0.05em] ${
            isFlat ? 'bg-[#1f1f1f] text-[#9a9a9a]' : 'text-black'
          }`}
          style={isFlat ? {} : { background: '#c8ff00' }}
        >
          {change}
        </span>
      </div>
      <p className="text-[#8a8a8a] text-[11px] font-semibold tracking-[0.12em] mb-2">{label}</p>
      <p className="text-white text-[28px] font-bold leading-none">{value}</p>
    </div>
  );
}
