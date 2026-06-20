import { useMemo, useState } from 'react';
import { Download, Plus, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import AdminFooter from '../components/AdminFooter';
import TabsUnderline from '../components/TabsUnderline';
import OrdersTable from '../components/OrderTable';
import Pagination from '../components/Pagination';
import { ORDERS, ORDER_STATUS_TABS } from '../components/mockData';

const PAGE_SIZE = 10;
// Cancelled is treated as a manual override, not part of the normal
// forward flow, so it's left out of the auto-cycle on "Update Status".
const STATUS_CYCLE = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];

export default function OrdersPage() {
  const [orders, setOrders] = useState(ORDERS);
  const [activeTab, setActiveTab] = useState('All Orders');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesTab = activeTab === 'All Orders' || o.status === activeTab;
      const matchesQuery =
        !query.trim() ||
        o.id.toLowerCase().includes(query.toLowerCase()) ||
        o.customer.toLowerCase().includes(query.toLowerCase());
      return matchesTab && matchesQuery;
    });
  }, [orders, activeTab, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleTabChange(tab) {
    setActiveTab(tab);
    setPage(1);
  }

  function handleUpdateStatus(id) {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const idx = STATUS_CYCLE.indexOf(o.status);
        const next = idx === -1 ? STATUS_CYCLE[0] : STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
        return { ...o, status: next };
      })
    );
  }

  function handleExportCsv() {
    const header = ['Order ID', 'Customer', 'Date', 'Items', 'Total', 'Payment', 'Status'];
    const rows = filtered.map((o) => [o.id, o.customer, o.date, o.items, o.total, o.payment, o.status]);
    const csv = [header, ...rows].map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flexio-orders-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Topbar />

        <main className="px-8 pb-8 pt-4">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
            <div>
              <h1 className="text-white text-3xl font-bold tracking-tight">ALL ORDERS</h1>
              <p className="text-[#8a8a8a] text-sm mt-1">
                Managing {orders.length.toLocaleString()} total orders across all channels.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleExportCsv}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#333] text-[#cfcfcf] text-xs font-bold tracking-[0.05em] hover:border-[#c8ff00] hover:text-[#c8ff00] transition-colors"
              >
                <Download size={14} /> EXPORT CSV
              </button>
              <button
                onClick={() => alert('Hook this up to your order-creation flow once it exists.')}
                style={{ background: '#c8ff00' }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-black text-xs font-bold tracking-[0.05em] hover:opacity-90 transition-opacity"
              >
                <Plus size={14} /> CREATE NEW ORDER
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-5 border-b border-[#1f1f1f]">
            <TabsUnderline options={ORDER_STATUS_TABS} active={activeTab} onChange={handleTabChange} />

            <div className="relative w-full sm:w-[280px] mb-3">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6a6a6a]" />
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search by Order ID or Customer..."
                className="w-full bg-[#141414] border border-[#262626] rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-[#5a5a5a] focus:border-[#c8ff00] outline-none transition-colors"
              />
            </div>
          </div>

          <OrdersTable orders={pageItems} onUpdateStatus={handleUpdateStatus} />

          <Pagination currentPage={page} totalPages={totalPages} totalItems={filtered.length} pageSize={PAGE_SIZE} onPageChange={setPage} />
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}