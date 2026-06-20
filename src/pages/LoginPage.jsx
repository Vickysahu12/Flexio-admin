import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, AlertTriangle } from 'lucide-react';
import { useAdminAuth } from '../admin/AdminAuthContext';

const BOOT_LINES = [
  'FLEXIO ADMIN ENGINE V.2.0.4',
  'INITIALIZING SECURE SESSION...',
  'AWAITING CREDENTIALS',
];

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError('Username and password are required.');
      return;
    }

    setIsSubmitting(true);
    // tiny artificial delay so "AUTHENTICATING..." actually registers —
    // swap this whole block for an await fetch() to your auth endpoint later
    setTimeout(() => {
      const result = login(username, password);
      if (result.success) {
        navigate('/dashboard', { replace: true });
      } else {
        setError(result.error);
        setIsSubmitting(false);
      }
    }, 500);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 relative overflow-hidden">
      {/* faint engine-room dot grid, signature backdrop */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#2a2a2a 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(200,255,0,0.08), transparent)' }}
      />

      <div className="relative z-10 w-full max-w-[420px]">
        {/* boot sequence — the signature element */}
        <div className="font-mono-data text-[11px] tracking-[0.15em] mb-8 space-y-1.5">
          {BOOT_LINES.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.25, duration: 0.4 }}
              className={i === 0 ? 'text-[#c8ff00]' : 'text-[#6a6a6a]'}
            >
              {i === BOOT_LINES.length - 1 ? (
                <span>
                  &gt; {line}
                  <span className="inline-block w-[6px] h-[12px] bg-[#c8ff00] ml-1 align-middle animate-pulse" />
                </span>
              ) : (
                <span>&gt; {line}</span>
              )}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.45 }}
          className="bg-[#141414] border border-[#262626] rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-lg bg-[#1b1b1b] border border-[#262626] flex items-center justify-center">
              <Lock size={16} className="text-[#c8ff00]" />
            </div>
            <div>
              <h1 className="text-white font-semibold text-lg leading-tight">FLEXIO</h1>
              <p className="text-[#6a6a6a] text-[10px] font-mono-data tracking-[0.2em]">ADMIN ACCESS ONLY</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
            <div>
              <label htmlFor="username" className="block text-[11px] font-mono-data tracking-[0.15em] text-[#8a8a8a] mb-2">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-[#4a4a4a] focus:border-[#c8ff00] outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[11px] font-mono-data tracking-[0.15em] text-[#8a8a8a] mb-2">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-[#4a4a4a] focus:border-[#c8ff00] outline-none transition-colors"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-[#2a1414] border border-[#3a1c1c] rounded-lg px-3 py-2.5">
                <AlertTriangle size={14} className="text-[#ef4444] mt-0.5 shrink-0" />
                <p className="text-[#f87171] text-xs font-mono-data leading-relaxed">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              style={{ background: '#c8ff00' }}
              className="w-full mt-2 text-black font-semibold text-sm rounded-lg py-2.5 flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {isSubmitting ? 'AUTHENTICATING...' : (
                <>
                  ACCESS SYSTEM <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </motion.div>

        <p className="text-center text-[#4a4a4a] text-[10px] font-mono-data tracking-[0.15em] mt-6">
          AUTHORIZED PERSONNEL ONLY · © 2024 FLEXIO
        </p>
      </div>
    </div>
  );
}
