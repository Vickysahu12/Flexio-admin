import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';

/**
 * Wrap any admin-only page with this. Anyone without a valid
 * session gets bounced straight back to /login — no flash of
 * dashboard content first.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <span className="font-mono-data text-[#8a8a8a] text-xs tracking-[0.2em]">VERIFYING SESSION...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
