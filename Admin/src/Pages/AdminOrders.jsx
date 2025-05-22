import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTheme } from '../Contexts/ThemeContext'; // 🧠 Use ThemeContext

const orders = [
  {
    id: '1',
    customer: 'John Doe',
    date: '2024-03-15',
    total: 24990,
    status: 'Completed',
    items: 3,
  },
  {
    id: '2',
    customer: 'Jane Smith',
    date: '2024-03-14',
    total: 49900,
    status: 'Processing',
    items: 2,
  },
  {
    id: '3',
    customer: 'Mike Johnson',
    date: '2024-03-14',
    total: 15900,
    status: 'Shipped',
    items: 1,
  },
];

const AdminOrders = () => {
  const { theme } = useTheme(); // 🌗 Get current theme
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-success';
      case 'processing':
        return 'bg-warning text-dark';
      case 'shipped':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.includes(searchQuery);

    const matchesStatus =
      statusFilter === 'all' || order.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className={`container-fluid ${theme === 'dark' ? 'bg-dark text-white' : ''}`}>
      <h1 className="fw-bold mb-4">Orders</h1>

      {/* Filters */}
      <div className={`card border-0 shadow-sm mb-4 ${theme === 'dark' ? 'bg-secondary text-white' : ''}`}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className={`input-group-text ${theme === 'dark' ? 'bg-dark text-white border-light' : 'bg-white'}`}>
                  <Search size={20} />
                </span>
                <input
                  type="text"
                  className={`form-control ${theme === 'dark' ? 'bg-dark text-white border-light' : ''}`}
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="input-group">
                <span className={`input-group-text ${theme === 'dark' ? 'bg-dark text-white border-light' : 'bg-white'}`}>
                  <Filter size={20} />
                </span>
                <select
                  className={`form-select ${theme === 'dark' ? 'bg-dark text-white border-light' : ''}`}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <motion.div
        className={`card border-0 shadow-sm ${theme === 'dark' ? 'bg-secondary text-white' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="card-body">
          <div className="table-responsive">
            <table className={`table table-hover ${theme === 'dark' ? 'table-dark' : ''}`}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>{order.items}</td>
                    <td>Ksh {order.total.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminOrders;
