const STATUS_STYLES = {
  SHIPPED: { background: '#c8ff00', color: '#000' },
  PENDING: { background: '#3a2e14', color: '#e3b341' },
  CANCELLED: { background: '#2a1414', color: '#ef4444' },
};

const AVATAR_COLORS = ['#c8ff00', '#5da9ff', '#ff6b9d', '#ff9f5a'];

function initials(name) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function avatarColor(name) {
  const sum = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

export default function RecentOrdersTable({ orders }) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-2xl flex-1">
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#1f1f1f]">
        <h2 className="text-white font-bold text-sm tracking-[0.08em]">RECENT ORDERS</h2>
        <button className="text-xs font-semibold tracking-[0.05em] hover:underline" style={{ color: '#c8ff00' }}>
          VIEW ALL
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left text-[#6a6a6a] text-[11px] font-semibold tracking-[0.1em]">
            <th className="px-6 py-4 font-semibold">ORDER ID</th>
            <th className="px-2 py-4 font-semibold">CUSTOMER</th>
            <th className="px-2 py-4 font-semibold">ITEMS</th>
            <th className="px-2 py-4 font-semibold">TOTAL</th>
            <th className="px-6 py-4 font-semibold text-right">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-[#1f1f1f] hover:bg-[#181818] transition-colors">
              <td className="px-6 py-4 text-white text-sm font-mono-data">{order.id}</td>
              <td className="px-2 py-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{ background: avatarColor(order.customer), color: '#000' }}
                  >
                    {initials(order.customer)}
                  </div>
                  <span className="text-white text-sm">{order.customer}</span>
                </div>
              </td>
              <td className="px-2 py-4 text-[#9a9a9a] text-sm">{order.items}</td>
              <td className="px-2 py-4 text-white text-sm font-semibold">{order.total}</td>
              <td className="px-6 py-4 text-right">
                <span
                  className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-full tracking-[0.05em]"
                  style={STATUS_STYLES[order.status] || STATUS_STYLES.SHIPPED}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
