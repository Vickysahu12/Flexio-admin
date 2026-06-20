import { Wallet, ShoppingCart, ClipboardCheck, Zap, Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import StatCard from '../components/StatCard';
import RecentOrdersTable from '../components/RecentOrdersTable';
import LowStockAlerts from '../components/LowStockAlerts';
import AdminFooter from '../components/AdminFooter';
import { STATS, RECENT_ORDERS, LOW_STOCK_ITEMS } from '../components/mockData';

const STAT_ICONS = { sales: Wallet, orders: ShoppingCart, products: ClipboardCheck, users: Zap };

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Topbar />

        <main className="px-8 pb-8 pt-4">
          <div className="flex flex-wrap gap-5 mb-6">
            {STATS.map((stat) => (
              <StatCard key={stat.id} icon={STAT_ICONS[stat.id]} {...stat} />
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            <RecentOrdersTable orders={RECENT_ORDERS} />
            <LowStockAlerts items={LOW_STOCK_ITEMS} onRestockAll={() => alert('Wire this up to your restock endpoint.')} />
          </div>
        </main>

        <AdminFooter />
      </div>

      <button
        aria-label="Quick add"
        style={{ background: '#c8ff00' }}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-2xl flex items-center justify-center text-black shadow-lg hover:opacity-90 transition-opacity"
      >
        <Plus size={22} />
      </button>
    </div>
  );
}
