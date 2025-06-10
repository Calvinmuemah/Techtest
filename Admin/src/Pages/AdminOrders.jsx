import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTheme } from '../Contexts/ThemeContext';

const AdminOrders = () => {
  const { theme } = useTheme();
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders/getAllOrders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
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
      order.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order._id?.includes(searchQuery);

    const matchesStatus =
      statusFilter === 'all' || order.status?.toLowerCase() === statusFilter;

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
                  <option value="pending">Pending</option>
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
          {loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="text-danger">Error: {error}</p>
          ) : (
            <div className="table-responsive">
              <table className={`table table-hover ${theme === 'dark' ? 'table-dark' : ''}`}>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, index) => (
                      <tr key={order._id}>
                        <td>{index + 1}</td> {/* Auto-incrementing order number */}
                        <td>{order.customerName}</td>
                        <td>{order.email}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>{order.cartItems?.length}</td>
                        <td>Ksh {order.total?.toLocaleString()}</td>
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center text-muted">
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminOrders;
