import { useMemo, useState } from 'react';
import { Bell, SlidersHorizontal, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import AdminFooter from '../components/AdminFooter';
import FilterTabs from '../components/FilterTabs';
import UsersTable from '../components/UsersTable';
import UserDetailsPanel from '../components/UserDetailsPanel';
import Pagination from '../components/Pagination';
import { USERS, USER_FILTERS } from '../components/mockData';

const PAGE_SIZE = 10;

export default function UsersPage() {
  const [users, setUsers] = useState(USERS);
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesFilter = filter === 'All' || u.status === filter;
      const matchesQuery =
        !query.trim() ||
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [users, filter, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const selectedUser = users.find((u) => u.id === selectedUserId) || null;

  function handleFilterChange(next) {
    setFilter(next);
    setPage(1);
  }

  function handleToggleBan(id) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === 'Banned' ? 'Active' : 'Banned' } : u))
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Sidebar />

      <div className="flex-1 min-w-0 flex">
        <div className="flex-1 min-w-0">
          <Topbar />

          <main className="px-8 pb-8 pt-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
              <div className="flex items-center gap-3">
                <h1 className="text-white text-2xl font-bold tracking-tight">All Users</h1>
                <span className="text-[#9a9a9a] text-[10px] font-bold tracking-[0.08em] bg-[#1c1c1c] border border-[#2a2a2a] px-2.5 py-1 rounded-md">
                  {users.length.toLocaleString()} TOTAL
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-[260px]">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6a6a6a]" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                    placeholder="Search by name or email..."
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-[#5a5a5a] focus:border-[#c8ff00] outline-none transition-colors"
                  />
                </div>
                <button
                  onClick={() => alert('Wire this up to your notifications feed.')}
                  className="w-10 h-10 rounded-xl border border-[#262626] flex items-center justify-center text-[#9a9a9a] hover:text-white hover:border-[#3a3a3a] transition-colors"
                >
                  <Bell size={16} />
                </button>
                <button
                  onClick={() => alert('Wire this up to your advanced filters.')}
                  className="w-10 h-10 rounded-xl border border-[#262626] flex items-center justify-center text-[#9a9a9a] hover:text-white hover:border-[#3a3a3a] transition-colors"
                >
                  <SlidersHorizontal size={16} />
                </button>
              </div>
            </div>

            <div className="mb-5">
              <FilterTabs options={USER_FILTERS} active={filter} onChange={handleFilterChange} />
            </div>

            <UsersTable users={pageItems} onViewDetail={(u) => setSelectedUserId(u.id)} />

            <Pagination currentPage={page} totalPages={totalPages} totalItems={filtered.length} pageSize={PAGE_SIZE} onPageChange={setPage} />
          </main>

          <AdminFooter />
        </div>

        {selectedUser && (
          <UserDetailsPanel
            user={selectedUser}
            onClose={() => setSelectedUserId(null)}
            onToggleBan={handleToggleBan}
          />
        )}
      </div>
    </div>
  );
}