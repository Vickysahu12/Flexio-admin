export default function AdminCard({ icon: Icon, title, action, className = '', children }) {
  return (
    <div className={`bg-[#141414] border border-[#1f1f1f] rounded-2xl p-6 ${className}`}>
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#1c1c1c] text-[#c8ff00]">
              <Icon size={15} />
            </div>
          )}
          <h2 className="text-white text-sm font-bold tracking-[0.1em]">{title}</h2>
        </div>
        {action}
      </div>

      {children}
    </div>
  );
}