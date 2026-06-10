import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import { useUiStore } from '../store/uiStore';

const ProtectedLayout = () => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <Navbar />

      <div className="flex pt-16">

        <Sidebar />

        <main className={`flex-1 transition-all duration-200 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <div className="p-6">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default ProtectedLayout;