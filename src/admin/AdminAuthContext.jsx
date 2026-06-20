import { createContext, useContext, useState, useEffect } from 'react';

/**
 * AdminAuthContext
 * ------------------------------------------------------------------
 * Minimal admin-only auth gate for the Flexio Admin Engine.
 *
 * IMPORTANT — this is a frontend stub:
 * Credential checking currently happens in the browser against
 * ADMIN_CREDENTIALS below. That's fine for now (2-person internal
 * tool, nothing public-facing) but before this ever ships anywhere
 * reachable from outside, swap `verifyCredentials` for a real call
 * to your FastAPI backend that returns a signed token. Hardcoded
 * passwords in a JS bundle are visible to anyone who opens devtools.
 */

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'flexio2026',
};

const SESSION_KEY = 'flexio_admin_session';

const AdminAuthContext = createContext(null);

function verifyCredentials(username, password) {
  return (
    username.trim().toLowerCase() === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  );
}

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        setAdmin(JSON.parse(stored));
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  function login(username, password) {
    if (!verifyCredentials(username, password)) {
      return { success: false, error: 'Invalid username or password.' };
    }
    const session = { username: ADMIN_CREDENTIALS.username, role: 'SUPERUSER', loggedInAt: Date.now() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setAdmin(session);
    return { success: true };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setAdmin(null);
  }

  return (
    <AdminAuthContext.Provider value={{ admin, isLoading, isAuthenticated: !!admin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return ctx;
}
