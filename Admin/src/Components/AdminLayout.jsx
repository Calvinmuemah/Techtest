import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Cat as Categories,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/products', icon: <Package size={20} />, label: 'Products' },
    { path: '/categories', icon: <Categories size={20} />, label: 'Categories' },
    { path: '/orders', icon: <ShoppingCart size={20} />, label: 'Orders' },
    { path: '/customers', icon: <Users size={20} />, label: 'Customers' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' }
  ];

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/');
  };

  return (
    <div className="min-vh-100 d-flex bg-light">
      {/* Sidebar */}
      <motion.div
        className={`bg-dark text-white d-flex flex-column justify-content-between ${
          isSidebarOpen ? 'width-240' : 'width-70'
        }`}
        animate={{ width: isSidebarOpen ? 240 : 70 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'fixed', height: '100vh', zIndex: 1000 }}
      >
        <div className="p-3">
          <div className="d-flex align-items-center justify-content-between mb-4">
            {isSidebarOpen && (
              <div className="text-white">
                <h5 className="mb-0">TechTest</h5>
                <small className="text-muted">Admin Panel</small>
              </div>
            )}
            <button
              className="btn btn-link text-white p-0"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <nav className="nav flex-column">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className={({ isActive }) =>
                  `nav-link py-2 px-3 mb-2 d-flex align-items-center ${
                    isActive ? 'bg-primary text-white rounded' : 'text-white'
                  }`
                }
              >
                {item.icon}
                {isSidebarOpen && <span className="ms-3">{item.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-3">
          <button
            className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <main
        className="flex-grow-1 d-flex flex-column"
        style={{
          marginLeft: isSidebarOpen ? '240px' : '70px',
          transition: 'margin-left 0.3s'
        }}
      >
        <div className="p-4 flex-grow-1 bg-white" style={{ minHeight: '100vh' }}>
          <Outlet />
        </div>
        <footer className="bg-white text-center py-3 border-top small text-muted">
          © {new Date().getFullYear()} TechTest Admin. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default AdminLayout;
