export default function AdminFooter() {
  return (
    <footer className="flex items-center justify-between px-8 py-6 mt-2 border-t border-[#1a1a1a]">
      <p className="text-[#5a5a5a] text-[11px] font-mono-data tracking-[0.05em]">
        © 2024 FLEXIO. ADMIN ENGINE V.2.0.4
      </p>
      <div className="flex items-center gap-6">
        <button className="text-[#8a8a8a] text-[11px] font-semibold tracking-[0.05em] hover:text-white transition-colors">
          HELP CENTER
        </button>
        <button className="text-[#8a8a8a] text-[11px] font-semibold tracking-[0.05em] hover:text-white transition-colors">
          API ACCESS
        </button>
      </div>
    </footer>
  );
}
