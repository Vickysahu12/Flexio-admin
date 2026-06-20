import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import AdminFooter from '../components/AdminFooter';
import FilterTabs from '../components/FilterTabs';
import ProductsTable from '../components/ProductTable';
import Pagination from '../components/Pagination';
import { PRODUCTS, PRODUCT_FILTERS } from '../components/mockData';

const PAGE_SIZE = 10;

export default function ProductsPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(PRODUCTS);
  const [filter, setFilter] = useState('ALL');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesFilter =
        filter === 'ALL' ||
        (filter === 'ACTIVE' && p.active) ||
        (filter === 'INACTIVE' && !p.active) ||
        p.category.toUpperCase() === filter;
      const matchesQuery =
        !query.trim() ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [products, filter, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleFilterChange(next) {
    setFilter(next);
    setPage(1);
  }

  function handleToggleActive(id) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  }

  function handleEdit(id) {
    // wire this to a real edit form / modal once the Products API exists
    alert(`Edit product ${id} — hook this up to your edit flow.`);
  }

  function handleDelete(id) {
    if (confirm('Remove this product from the catalog?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Topbar />

        <main className="px-8 pb-8 pt-4">
          <div className="flex items-start justify-between mb-7">
            <div>
              <h1 className="text-white text-3xl font-bold tracking-tight">PRODUCTS</h1>
              <p className="text-[#8a8a8a] text-sm mt-1">Manage your high-pressure inventory and drops.</p>
            </div>
            <button
              onClick={() => navigate('/products/new')}
              style={{ background: '#c8ff00' }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-black text-xs font-bold tracking-[0.05em] hover:opacity-90 transition-opacity shrink-0"
            >
              <Plus size={15} /> ADD NEW PRODUCT
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <FilterTabs options={PRODUCT_FILTERS} active={filter} onChange={handleFilterChange} />

            <div className="relative w-full sm:w-[260px]">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6a6a6a]" />
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search catalog..."
                className="w-full bg-[#141414] border border-[#262626] rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-[#5a5a5a] focus:border-[#c8ff00] outline-none transition-colors"
              />
            </div>
          </div>

          <ProductsTable products={pageItems} onToggleActive={handleToggleActive} onEdit={handleEdit} onDelete={handleDelete} />

          <Pagination currentPage={page} totalPages={totalPages} totalItems={filtered.length} pageSize={PAGE_SIZE} onPageChange={setPage} />
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}