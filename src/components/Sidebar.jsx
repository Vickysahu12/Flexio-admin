import { NavLink } from 'react-router-dom';
import { LayoutGrid, Archive, ShoppingBag, Users, Settings, LogOut } from 'lucide-react';
import { useAdminAuth } from '../admin/AdminAuthContext';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'DASHBOARD', icon: LayoutGrid },
  { to: '/products', label: 'PRODUCTS', icon: Archive },
  { to: '/orders', label: 'ORDERS', icon: ShoppingBag },
  { to: '/users', label: 'USERS', icon: Users },
  { to: '/settings', label: 'SETTINGS', icon: Settings },
];

export default function Sidebar() {
  const { admin, logout } = useAdminAuth();

  return (
    <aside className="w-[260px] shrink-0 bg-[#0a0a0a] border-r border-[#1f1f1f] min-h-screen flex flex-col">
      <div className="px-7 pt-8 pb-6">
        <h1 className="text-white font-bold text-2xl tracking-tight">FLEXIO</h1>
      </div>

      <nav className="flex-1 px-3">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mb-1 rounded-lg text-xs font-semibold tracking-[0.1em] transition-colors relative ${
                isActive ? 'bg-[#161616] text-white' : 'text-[#8a8a8a] hover:text-white hover:bg-[#121212]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full" style={{ background: '#c8ff00' }} />
                )}
                <Icon size={17} className={isActive ? 'text-[#c8ff00]' : ''} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 pb-6">
        <div className="flex items-center gap-3 bg-[#121212] border border-[#1f1f1f] rounded-xl px-3 py-2.5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-black font-bold text-xs shrink-0"
            style={{ background: '#c8ff00' }}
          >
            AD
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">
              {admin?.username ? admin.username.toUpperCase() : 'ADMIN 01'}
            </p>
            <p className="text-[#6a6a6a] text-[10px] font-mono-data tracking-[0.1em]">{admin?.role || 'SUPERUSER'}</p>
          </div>
          <button
            onClick={logout}
            title="Log out"
            aria-label="Log out"
            className="ml-auto text-[#6a6a6a] hover:text-[#ef4444] transition-colors shrink-0"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
