import { X } from 'lucide-react';
import { USER_STATUS_STYLES } from './mockData';

const AVATAR_COLORS = ['#c8ff00', '#5da9ff', '#ff6b9d', '#ff9f5a'];

function initials(name) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function avatarColor(name) {
  const sum = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

export default function UserDetailsPanel({ user, onClose, onToggleBan }) {
  const isBanned = user.status === 'Banned';

  return (
    <aside className="w-[420px] shrink-0 bg-[#0a0a0a] border-l border-[#1f1f1f] min-h-screen px-7 py-7">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-white text-lg font-bold tracking-tight">User Details</h2>
        <button onClick={onClose} className="text-[#8a8a8a] hover:text-white transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="flex flex-col items-center text-center mb-6">
        <div
          className="w-[88px] h-[88px] rounded-full flex items-center justify-center text-xl font-bold mb-4 ring-2"
          style={{ background: avatarColor(user.name), color: '#000', boxShadow: `0 0 0 3px #0a0a0a, 0 0 0 5px #c8ff00` }}
        >
          {initials(user.name)}
        </div>
        <h3 className="text-white text-xl font-bold">{user.name}</h3>
        <p className="text-[#8a8a8a] text-sm mt-1">{user.email}</p>

        <div className="flex items-center gap-2 mt-4">
          <span
            className="text-[10px] font-bold px-3 py-1.5 rounded-md tracking-[0.05em] uppercase"
            style={USER_STATUS_STYLES[user.status] || USER_STATUS_STYLES.Active}
          >
            {user.status}
          </span>
          <span className="text-[10px] font-bold px-3 py-1.5 rounded-md tracking-[0.05em] uppercase bg-[#1c1c1c] text-[#9a9a9a] border border-[#2a2a2a]">
            {user.membership}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-7">
        <div className="bg-[#121212] border border-[#1f1f1f] rounded-xl p-4">
          <p className="text-[#6a6a6a] text-[10px] font-semibold tracking-[0.1em] mb-1.5">TOTAL ORDERS</p>
          <p className="text-white text-2xl font-bold">{user.orders}</p>
        </div>
        <div className="bg-[#121212] border border-[#1f1f1f] rounded-xl p-4">
          <p className="text-[#6a6a6a] text-[10px] font-semibold tracking-[0.1em] mb-1.5">JOINED DATE</p>
          <p className="text-white text-2xl font-bold">{user.joined.split(' ')[1]?.replace(',', '') + " '" + user.joined.split(' ')[2]?.slice(-2)}</p>
        </div>
      </div>

      <p className="text-[#6a6a6a] text-[11px] font-semibold tracking-[0.1em] mb-3">RECENT ORDER HISTORY</p>
      <div className="space-y-2.5 mb-8">
        {user.orderHistory.length === 0 && (
          <p className="text-[#5a5a5a] text-sm">No orders yet.</p>
        )}
        {user.orderHistory.map((order) => (
          <div key={order.id} className="bg-[#121212] border border-[#1f1f1f] rounded-xl px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-semibold">{order.id}</p>
              <p className="text-[#7a7a7a] text-xs mt-0.5">{order.item}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold" style={{ color: '#c8ff00' }}>{order.price}</p>
              <p className="text-[#6a6a6a] text-[10px] mt-0.5 whitespace-nowrap">{order.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <button
          onClick={() => alert(`Notification sent to ${user.name} — hook this up to your notifications API.`)}
          style={{ background: '#c8ff00' }}
          className="w-full py-3 rounded-xl text-black text-xs font-bold tracking-[0.05em] hover:opacity-90 transition-opacity"
        >
          SEND NOTIFICATION
        </button>
        <button
          onClick={() => onToggleBan(user.id)}
          className="w-full py-3 rounded-xl border text-xs font-bold tracking-[0.05em] transition-colors"
          style={{
            borderColor: isBanned ? '#c8ff00' : '#ff5a5a',
            color: isBanned ? '#c8ff00' : '#ff5a5a',
          }}
        >
          {isBanned ? 'UNBAN USER' : 'BAN USER'}
        </button>
      </div>
    </aside>
  );
}