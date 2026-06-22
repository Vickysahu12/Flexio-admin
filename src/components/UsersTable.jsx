import { USER_STATUS_STYLES } from './mockData';

const AVATAR_COLORS = ['#c8ff00', '#5da9ff', '#ff6b9d', '#ff9f5a'];

function initials(name) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function avatarColor(name) {
  const sum = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

export default function UsersTable({ users, onViewDetail }) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-2xl overflow-x-auto">
      <table className="w-full min-w-[920px]">
        <thead>
          <tr className="text-left text-[#6a6a6a] text-[11px] font-semibold tracking-[0.1em] border-b border-[#1f1f1f]">
            <th className="px-6 py-4">USER</th>
            <th className="px-2 py-4">CONTACT</th>
            <th className="px-2 py-4">ORDERS</th>
            <th className="px-2 py-4">JOINED</th>
            <th className="px-2 py-4">STATUS</th>
            <th className="px-6 py-4 text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-[#1f1f1f] hover:bg-[#181818] transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                    style={{ background: avatarColor(user.name), color: '#000' }}
                  >
                    {initials(user.name)}
                  </div>
                  <span className="text-white text-sm font-semibold whitespace-nowrap">{user.name}</span>
                </div>
              </td>
              <td className="px-2 py-4 whitespace-nowrap">
                <p className="text-[#cfcfcf] text-sm">{user.email}</p>
                <p className="text-[#6a6a6a] text-xs">{user.phone}</p>
              </td>
              <td className="px-2 py-4 text-white text-sm font-semibold">{user.orders}</td>
              <td className="px-2 py-4 text-[#9a9a9a] text-sm whitespace-nowrap">{user.joined}</td>
              <td className="px-2 py-4">
                <span
                  className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-md tracking-[0.05em] uppercase"
                  style={USER_STATUS_STYLES[user.status] || USER_STATUS_STYLES.Active}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onViewDetail(user)}
                  className="text-xs font-bold tracking-[0.02em]"
                  style={{ color: '#c8ff00' }}
                >
                  VIEW DETAIL
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div className="px-6 py-14 text-center">
          <p className="text-[#8a8a8a] text-sm">No users match this filter.</p>
        </div>
      )}
    </div>
  );
}