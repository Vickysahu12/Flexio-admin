import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './admin/AdminAuthContext';
import ProtectedRoute from './admin/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductPage from './pages/ProductPage';
import AddProductPage from './pages/AddProductPage';
import OrderPage from './pages/OrderPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';

function withGuard(element) {
  return <ProtectedRoute>{element}</ProtectedRoute>;
}

export default function App() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={withGuard(<DashboardPage />)} />
        <Route path="/products" element={withGuard(<ProductPage />)} />
        <Route path="/products/new" element={withGuard(<AddProductPage />)} />
        <Route path="/orders" element={withGuard(<OrderPage />)} />
        <Route path="/users" element={withGuard(<UsersPage />)} />
        <Route path="/settings" element={withGuard(<SettingsPage />)} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AdminAuthProvider>
  );
}