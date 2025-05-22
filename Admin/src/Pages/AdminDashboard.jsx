import { motion } from 'framer-motion';
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  Star
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales (KES)',
        data: [300000, 350000, 420000, 480000, 520000, 600000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3
      }
    ]
  };

  const stats = [
    {
      title: 'Total Products',
      value: '248',
      icon: <Package size={24} />,
      change: '+12%',
      isPositive: true
    },
    {
      title: 'Total Orders',
      value: '856',
      icon: <ShoppingCart size={24} />,
      change: '+23%',
      isPositive: true
    },
    {
      title: 'Total Customers',
      value: '1,247',
      icon: <Users size={24} />,
      change: '+18%',
      isPositive: true
    },
    {
      title: 'Revenue',
      value: 'KES 4.2M',
      icon: <TrendingUp size={24} />,
      change: '-5%',
      isPositive: false
    }
  ];

  return (
    <div className="container-fluid">
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>

      {/* Stats */}
      <div className="row g-4 mb-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="col-md-6 col-lg-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="bg-light rounded-circle p-3">{stat.icon}</div>
                  <span className={`badge ${stat.isPositive ? 'bg-success' : 'bg-danger'}`}>
                    {stat.isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    {stat.change}
                  </span>
                </div>
                <h3 className="fw-bold">{stat.value}</h3>
                <p className="text-muted">{stat.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="row g-4">
        {/* Sales Chart */}
        <div className="col-lg-8">
          <motion.div
            className="card border-0 shadow-sm rounded-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="card-body">
              <h5 className="card-title mb-3">Sales Overview</h5>
              <Line data={salesData} />
            </div>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <div className="col-lg-4">
          <motion.div
            className="card border-0 shadow-sm rounded-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="card-body">
              <h5 className="card-title mb-3">Recent Orders</h5>
              <div className="list-group list-group-flush">
                {[1, 2, 3].map((order) => (
                  <div key={order} className="list-group-item border-0 px-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">Order #{order}23{order}</h6>
                        <small className="text-muted">2 hours ago</small>
                      </div>
                      <span className="badge bg-success">Completed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Additional Widgets */}
      <div className="row g-4 mt-4">
        <div className="col-md-6">
          <motion.div
            className="card border-0 shadow-sm rounded-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="card-body">
              <h5 className="card-title mb-3"><AlertTriangle size={18} className="me-2" />Low Stock Alerts</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Wireless Mouse</span>
                  <span className="badge bg-warning text-dark">4 left</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Bluetooth Speaker</span>
                  <span className="badge bg-warning text-dark">2 left</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="col-md-6">
          <motion.div
            className="card border-0 shadow-sm rounded-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="card-body">
              <h5 className="card-title mb-3"><Star size={18} className="me-2" />Top Selling Products</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>iPhone 14 Pro</span>
                  <span>KES 200,000</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Dell XPS 13</span>
                  <span>KES 150,000</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
