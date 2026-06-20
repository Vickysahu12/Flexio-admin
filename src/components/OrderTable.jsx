import { ORDER_STATUS_STYLES } from './mockData';

const AVATAR_COLORS = ['#c8ff00', '#5da9ff', '#ff6b9d', '#ff9f5a'];

function initials(name) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function avatarColor(name) {
  const sum = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

export default function OrdersTable({ orders, onUpdateStatus }) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-2xl overflow-x-auto">
      <table className="w-full min-w-[920px]">
        <thead>
          <tr className="text-left text-[#6a6a6a] text-[11px] font-semibold tracking-[0.1em] border-b border-[#1f1f1f]">
            <th className="px-6 py-4">ORDER ID</th>
            <th className="px-2 py-4">CUSTOMER</th>
            <th className="px-2 py-4">DATE</th>
            <th className="px-2 py-4">ITEMS</th>
            <th className="px-2 py-4">TOTAL</th>
            <th className="px-2 py-4">PAYMENT</th>
            <th className="px-2 py-4">STATUS</th>
            <th className="px-6 py-4 text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-[#1f1f1f] hover:bg-[#181818] transition-colors">
              <td className="px-6 py-4 text-sm font-mono-data font-semibold" style={{ color: '#c8ff00' }}>
                {order.id}
              </td>
              <td className="px-2 py-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{ background: avatarColor(order.customer), color: '#000' }}
                  >
                    {initials(order.customer)}
                  </div>
                  <span className="text-white text-sm whitespace-nowrap">{order.customer}</span>
                </div>
              </td>
              <td className="px-2 py-4 text-[#9a9a9a] text-sm whitespace-nowrap">{order.date}</td>
              <td className="px-2 py-4 text-[#9a9a9a] text-sm whitespace-nowrap">{order.items}</td>
              <td className="px-2 py-4 text-white text-sm font-semibold whitespace-nowrap">{order.total}</td>
              <td className="px-2 py-4 text-[#9a9a9a] text-xs font-mono-data whitespace-nowrap">{order.payment}</td>
              <td className="px-2 py-4">
                <span
                  className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-md tracking-[0.05em] uppercase"
                  style={ORDER_STATUS_STYLES[order.status] || ORDER_STATUS_STYLES.Confirmed}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onUpdateStatus(order.id)}
                  className="text-[10px] font-bold tracking-[0.05em] border border-[#333] rounded-lg px-3 py-2 text-[#cfcfcf] hover:border-[#c8ff00] hover:text-[#c8ff00] transition-colors whitespace-nowrap"
                >
                  UPDATE STATUS
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {orders.length === 0 && (
        <div className="px-6 py-14 text-center">
          <p className="text-[#8a8a8a] text-sm">No orders match this filter.</p>
        </div>
      )}
    </div>
  );
}