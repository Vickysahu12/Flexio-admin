import { useState } from 'react';
import { User, Store, ShieldCheck, Bell, AlertTriangle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import AdminFooter from '../components/AdminFooter';
import AdminCard from '../components/AdminCard';
import ToggleSwitch from '../components/ToggleSwitch';
import { useAdminAuth } from '../admin/AdminAuthContext';

export default function SettingsPage() {
  const { admin } = useAdminAuth();

  // Profile
  const [fullName, setFullName] = useState(admin?.username || 'Admin 01');
  const [email, setEmail] = useState(admin?.email || 'admin@flexio.vip');

  // Store info
  const [storeName, setStoreName] = useState('FlexIo');
  const [supportEmail, setSupportEmail] = useState('support@flexio.vip');
  const [currency, setCurrency] = useState('USD');
  const [timezone, setTimezone] = useState('GMT+0');

  // Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactor, setTwoFactor] = useState(false);

  // Notification preferences
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyLowStock, setNotifyLowStock] = useState(true);
  const [notifyNewUsers, setNotifyNewUsers] = useState(false);
  const [notifyMarketing, setNotifyMarketing] = useState(false);

  function handleSaveProfile() {
    alert('Profile saved locally — wire this up to your Admin API next.');
  }

  function handleSaveStore() {
    alert('Store info saved locally — wire this up to your Store Settings API next.');
  }

  function handleChangePassword() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Fill all password fields first.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirmation don't match.");
      return;
    }
    alert('Password updated locally — wire this up to your Auth API next.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }

  function handleSaveNotifications() {
    alert('Notification preferences saved locally — wire this up to your backend next.');
  }

  function handleDeactivate() {
    if (confirm('Are you sure you want to deactivate this admin account? This cannot be undone.')) {
      alert('Account deactivation flow — wire this up once the backend supports it.');
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Topbar />

        <main className="px-8 pb-8 pt-4">
          <div className="mb-7">
            <h1 className="text-white text-3xl font-bold tracking-tight">SETTINGS</h1>
            <p className="text-[#8a8a8a] text-sm mt-1">Manage your profile, store, and account preferences.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            {/* Profile */}
            <AdminCard icon={User} title="PROFILE INFORMATION">
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-black font-bold text-sm shrink-0"
                    style={{ background: '#c8ff00' }}
                  >
                    {fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{fullName}</p>
                    <p className="text-[#6a6a6a] text-xs font-mono-data tracking-[0.05em]">{admin?.role || 'SUPERUSER'}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-[0.12em] text-[#8a8a8a] mb-2">FULL NAME</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#c8ff00] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-[0.12em] text-[#8a8a8a] mb-2">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#c8ff00] outline-none transition-colors"
                  />
                </div>

                <button
                  onClick={handleSaveProfile}
                  style={{ background: '#c8ff00' }}
                  className="px-5 py-2.5 rounded-lg text-black text-xs font-bold tracking-[0.05em] hover:opacity-90 transition-opacity"
                >
                  SAVE CHANGES
                </button>
              </div>
            </AdminCard>

            {/* Store Info */}
            <AdminCard icon={Store} title="STORE INFORMATION">
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold tracking-[0.12em] text-[#8a8a8a] mb-2">STORE NAME</label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#c8ff00] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-[0.12em] text-[#8a8a8a] mb-2">SUPPORT EMAIL</label>
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#c8ff00] outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.12em] text-[#8a8a8a] mb-2">CURRENCY</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#c8ff00] outline-none transition-colors"
                    >
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                      <option>INR</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.12em] text-[#8a8a8a] mb-2">TIMEZONE</label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#c8ff00] outline-none transition-colors"
                    >
                      <option>GMT+0</option>
                      <option>GMT+5:30</option>
                      <option>GMT-5</option>
                      <option>GMT+1</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleSaveStore}
                  style={{ background: '#c8ff00' }}
                  className="px-5 py-2.5 rounded-lg text-black text-xs font-bold tracking-[0.05em] hover:opacity-90 transition-opacity"
                >
                  SAVE CHANGES
                </button>
              </div>
            </AdminCard>

            {/* Security */}
            <AdminCard icon={ShieldCheck} title="SECURITY">
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold tracking-[0.12em] text-[#8a8a8a] mb-2">CURRENT PASSWORD</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-[#5a5a5a] focus:border-[#c8ff00] outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.12em] text-[#8a8a8a] mb-2">NEW PASSWORD</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-[#5a5a5a] focus:border-[#c8ff00] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.12em] text-[#8a8a8a] mb-2">CONFIRM PASSWORD</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-[#5a5a5a] focus:border-[#c8ff00] outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  onClick={handleChangePassword}
                  style={{ background: '#c8ff00' }}
                  className="px-5 py-2.5 rounded-lg text-black text-xs font-bold tracking-[0.05em] hover:opacity-90 transition-opacity"
                >
                  UPDATE PASSWORD
                </button>

                <div className="flex items-center justify-between pt-3 border-t border-[#1f1f1f]">
                  <div>
                    <p className="text-white text-sm font-semibold">Two-Factor Authentication</p>
                    <p className="text-[#6a6a6a] text-xs mt-0.5">Add an extra layer of security to your account.</p>
                  </div>
                  <ToggleSwitch checked={twoFactor} onChange={setTwoFactor} label="Two-factor authentication" />
                </div>
              </div>
            </AdminCard>

            {/* Notification Preferences */}
            <AdminCard icon={Bell} title="NOTIFICATION PREFERENCES">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-semibold">Order Updates</p>
                    <p className="text-[#6a6a6a] text-xs mt-0.5">New orders, status changes, cancellations.</p>
                  </div>
                  <ToggleSwitch checked={notifyOrders} onChange={setNotifyOrders} label="Order updates" />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#1f1f1f]">
                  <div>
                    <p className="text-white text-sm font-semibold">Low Stock Alerts</p>
                    <p className="text-[#6a6a6a] text-xs mt-0.5">Get notified when inventory runs low.</p>
                  </div>
                  <ToggleSwitch checked={notifyLowStock} onChange={setNotifyLowStock} label="Low stock alerts" />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#1f1f1f]">
                  <div>
                    <p className="text-white text-sm font-semibold">New User Signups</p>
                    <p className="text-[#6a6a6a] text-xs mt-0.5">Get notified when a new customer registers.</p>
                  </div>
                  <ToggleSwitch checked={notifyNewUsers} onChange={setNotifyNewUsers} label="New user signups" />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#1f1f1f]">
                  <div>
                    <p className="text-white text-sm font-semibold">Marketing Emails</p>
                    <p className="text-[#6a6a6a] text-xs mt-0.5">Product updates, tips, and promotions.</p>
                  </div>
                  <ToggleSwitch checked={notifyMarketing} onChange={setNotifyMarketing} label="Marketing emails" />
                </div>

                <button
                  onClick={handleSaveNotifications}
                  style={{ background: '#c8ff00' }}
                  className="px-5 py-2.5 rounded-lg text-black text-xs font-bold tracking-[0.05em] hover:opacity-90 transition-opacity"
                >
                  SAVE PREFERENCES
                </button>
              </div>
            </AdminCard>
          </div>

          {/* Danger Zone */}
          <div className="mt-5 bg-[#161010] border border-[#3a1f1f] rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#2a1414] text-[#ff5a5a]">
                <AlertTriangle size={15} />
              </div>
              <h2 className="text-[#ff5a5a] text-sm font-bold tracking-[0.1em]">DANGER ZONE</h2>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-white text-sm font-semibold">Deactivate Admin Account</p>
                <p className="text-[#8a8a8a] text-xs mt-0.5">This will revoke your access immediately. This action cannot be undone.</p>
              </div>
              <button
                onClick={handleDeactivate}
                className="px-5 py-2.5 rounded-lg border text-xs font-bold tracking-[0.05em] transition-colors shrink-0"
                style={{ borderColor: '#ff5a5a', color: '#ff5a5a' }}
              >
                DEACTIVATE ACCOUNT
              </button>
            </div>
          </div>
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}