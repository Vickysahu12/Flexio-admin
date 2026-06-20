import { useRef } from 'react';
import { UploadCloud, Camera, X } from 'lucide-react';

function dropHandlers(onFile) {
  return {
    onDragOver: (e) => e.preventDefault(),
    onDrop: (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) onFile(file);
    },
  };
}

export default function MediaUploader({ masterImage, additionalImages, onSetMaster, onRemoveMaster, onAddAdditional, onRemoveAdditional }) {
  const masterInputRef = useRef(null);
  const additionalInputRef = useRef(null);

  return (
    <div className="flex flex-wrap gap-4">
      {/* master slot */}
      <input
        ref={masterInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onSetMaster(e.target.files[0])}
      />
      {masterImage ? (
        <div className="relative w-[210px] h-[200px] rounded-xl overflow-hidden border border-[#262626] shrink-0">
          <img src={masterImage} alt="Master product" className="w-full h-full object-cover" />
          <button
            onClick={onRemoveMaster}
            aria-label="Remove master image"
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black"
          >
            <X size={13} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => masterInputRef.current?.click()}
          {...dropHandlers(onSetMaster)}
          className="w-[210px] h-[200px] rounded-xl border border-dashed border-[#3a3a3a] flex flex-col items-center justify-center gap-2 text-center px-4 hover:border-[#c8ff00] transition-colors shrink-0"
        >
          <UploadCloud size={20} className="text-[#6a6a6a]" />
          <span className="text-[#9a9a9a] text-xs font-bold tracking-[0.05em]">DRAG & DROP MASTER IMAGE</span>
          <span className="text-[#5a5a5a] text-[10px] font-mono-data">RAW, PNG, OR TIFF (MAX 50MB)</span>
        </button>
      )}

      {/* uploaded additional images */}
      {additionalImages.map((src, i) => (
        <div key={src} className="relative w-[170px] h-[200px] rounded-xl overflow-hidden border border-[#262626] shrink-0">
          <img src={src} alt={`Product angle ${i + 1}`} className="w-full h-full object-cover" />
          <button
            onClick={() => onRemoveAdditional(i)}
            aria-label="Remove image"
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black"
          >
            <X size={13} />
          </button>
        </div>
      ))}

      {/* add-more slot */}
      <input
        ref={additionalInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onAddAdditional(e.target.files[0])}
      />
      <button
        onClick={() => additionalInputRef.current?.click()}
        {...dropHandlers(onAddAdditional)}
        className="w-[100px] h-[200px] rounded-xl border border-dashed border-[#3a3a3a] flex items-center justify-center text-[#6a6a6a] hover:border-[#c8ff00] hover:text-[#c8ff00] transition-colors shrink-0"
      >
        <Camera size={18} />
      </button>
    </div>
  );
}