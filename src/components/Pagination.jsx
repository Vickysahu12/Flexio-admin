import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, totalItems, pageSize, onPageChange }) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <p className="text-[#6a6a6a] text-[11px] font-mono-data tracking-[0.05em]">
        SHOWING {start}-{end} OF {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="w-8 h-8 rounded-lg border border-[#262626] flex items-center justify-center text-[#9a9a9a] hover:text-white disabled:opacity-40 transition-colors"
        >
          <ChevronLeft size={15} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={page === currentPage ? { background: '#c8ff00' } : {}}
            className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
              page === currentPage ? 'text-black' : 'border border-[#262626] text-[#9a9a9a] hover:text-white'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="w-8 h-8 rounded-lg border border-[#262626] flex items-center justify-center text-[#9a9a9a] hover:text-white disabled:opacity-40 transition-colors"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}