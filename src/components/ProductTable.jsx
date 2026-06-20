import { Pencil, Trash2 } from 'lucide-react';
import ToggleSwitch from './ToggleSwitch';

function stockStatus(stock) {
  if (stock === 0) return { color: '#5a5a5a', label: 'Out of Stock' };
  if (stock <= 15) return { color: '#ef4444', label: `${stock} in stock` };
  return { color: '#c8ff00', label: `${stock} in stock` };
}

export default function ProductsTable({ products, onToggleActive, onEdit, onDelete }) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="text-left text-[#6a6a6a] text-[11px] font-semibold tracking-[0.1em] border-b border-[#1f1f1f]">
            <th className="px-6 py-4">PRODUCT</th>
            <th className="px-2 py-4">CATEGORY</th>
            <th className="px-2 py-4">PRICE</th>
            <th className="px-2 py-4">STOCK</th>
            <th className="px-2 py-4">STATUS</th>
            <th className="px-6 py-4 text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const status = stockStatus(product.stock);
            return (
              <tr key={product.id} className="border-t border-[#1f1f1f] hover:bg-[#181818] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#222] flex items-center justify-center text-[#7a7a7a] text-sm font-bold shrink-0">
                      {product.name[0]}
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold tracking-[0.02em]">{product.name}</p>
                      <p className="text-[#6a6a6a] text-[10px] font-mono-data tracking-[0.05em]">{product.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-4 text-[#9a9a9a] text-sm">{product.category}</td>
                <td className="px-2 py-4 text-white text-sm font-semibold">{product.price}</td>
                <td className="px-2 py-4">
                  <span className="flex items-center gap-2 text-[#cfcfcf] text-sm">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: status.color }} />
                    {status.label}
                  </span>
                </td>
                <td className="px-2 py-4">
                  <ToggleSwitch checked={product.active} onChange={() => onToggleActive(product.id)} label={`${product.name} active status`} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => onEdit(product.id)} aria-label="Edit product" className="text-[#8a8a8a] hover:text-white transition-colors">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => onDelete(product.id)} aria-label="Delete product" className="text-[#8a8a8a] hover:text-[#ef4444] transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {products.length === 0 && (
        <div className="px-6 py-14 text-center">
          <p className="text-[#8a8a8a] text-sm">No products match this filter.</p>
        </div>
      )}
    </div>
  );
}