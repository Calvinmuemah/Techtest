import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package, ShoppingCart, Users, TrendingUp,
  AlertTriangle, Star 
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  // --- State Management ---
  const [theme, setTheme] = useState(() => localStorage.getItem('adminTheme') || 'light');
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:5000/api';

  // --- Data Fetching ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          productsCountRes,
          ordersCountRes,
          customersCountRes,
          revenueRes,
          recentOrdersRes,
          lowStockRes,
          topSellingRes,
          salesOverviewRes,
        ] = await Promise.all([
          fetch(`${API_BASE_URL}/products/count`),
          fetch(`${API_BASE_URL}/orders/ordersCount`),
          fetch(`${API_BASE_URL}/customers/count`).catch(e => {
            console.warn("Customers count API failed, returning default.", e);
            return { json: async () => ({ count: 0 }) }; 
          }),
          fetch(`${API_BASE_URL}/orders/orders/revenue`), 
          fetch(`${API_BASE_URL}/orders/orders/recent`),  
          fetch(`${API_BASE_URL}/products/low-stock`),
          fetch(`${API_BASE_URL}/products/top-selling`),
          fetch(`${API_BASE_URL}/orders/sales/overview`),
        ]);

        // Parse JSON responses
        const productsCount = await productsCountRes.json();
        const ordersCount = await ordersCountRes.json();
        const customersCount = await customersCountRes.json();
        const revenueData = await revenueRes.json();
        const recentOrdersData = await recentOrdersRes.json();
        const lowStockData = await lowStockRes.json();
        const topSellingData = await topSellingRes.json();
        const salesOverviewData = await salesOverviewRes.json();

        // Update states
        setTotalProducts(productsCount.count);
        setTotalOrders(ordersCount.count);
        setTotalCustomers(customersCount.count);
        setRevenue(revenueData.total);
        setRecentOrders(recentOrdersData);
        setLowStockProducts(lowStockData);
        setTopSellingProducts(topSellingData);

        // Update sales data for the chart
        setSalesData({
          labels: salesOverviewData.labels,
          datasets: [
            {
              label: 'Sales (KES)',
              data: salesOverviewData.data,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.3,
              fill: false, 
            },
          ],
        });

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  // Theme effect
  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme');
    localStorage.setItem('adminTheme', theme);
  }, [theme]);

  // --- Dynamic Data for Stats Cards ---
  const stats = [
    { title: 'Total Products', value: totalProducts, icon: <Package size={24} /> },
    { title: 'Total Orders', value: totalOrders, icon: <ShoppingCart size={24} /> },
    { title: 'Total Customers', value: totalCustomers, icon: <Users size={24} /> },
    { title: 'Revenue', value: `KES ${new Intl.NumberFormat('en-KE').format(revenue)}`, icon: <TrendingUp size={24} /> },
  ];

  const cardClass = `card border-0 shadow-sm rounded-3 ${theme === 'dark' ? 'bg-secondary text-white' : ''}`;
  const listItemClass = `list-group-item ${theme === 'dark' ? 'bg-dark text-white border-light' : ''}`;

  // Chart options (can be customized further)
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme === 'dark' ? '#f0f0f0' : '#333'
        }
      },
      title: {
        display: true,
        text: 'Monthly Sales',
        color: theme === 'dark' ? '#f0f0f0' : '#333'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `KES ${new Intl.NumberFormat('en-KE').format(context.parsed.y)}`;
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: theme === 'dark' ? '#f0f0f0' : '#333'
        },
        grid: {
          color: theme === 'dark' ? '#444' : '#eee'
        }
      },
      y: {
        ticks: {
          color: theme === 'dark' ? '#f0f0f0' : '#333'
        },
        grid: {
          color: theme === 'dark' ? '#444' : '#eee'
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`container-fluid py-4 ${theme === 'dark' ? 'text-white bg-dark' : ''}`}>
      <h2 className="fw-bold mb-4">Dashboard</h2>

      {/* Stats */}
      <div className="row g-4 mb-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title} 
            className="col-md-6 col-lg-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={cardClass}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="bg-light rounded-circle p-3">{stat.icon}</div>
                </div>
                <h3 className="fw-bold">{stat.value}</h3>
                <p className="text-muted">{stat.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sales Chart & Recent Orders */}
      <div className="row g-4">
        <div className="col-lg-8">
          <motion.div
            className={cardClass}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="card-body">
              <h5 className="card-title mb-3">Sales Overview</h5>
              <Line data={salesData} options={chartOptions} />
            </div>
          </motion.div>
        </div>

        <div className="col-lg-4">
          <motion.div
            className={cardClass}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="card-body">
              <h5 className="card-title mb-3">Recent Orders</h5>
              <div className="list-group list-group-flush">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order, index) => ( 
                    <div key={order._id} className={listItemClass}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">Order {index + 1} - ID: {(order._id || '').slice(-6)}</h6>
                          <small className="text-muted">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            }) : 'Invalid Date'}
                          </small>
                        </div>
                        <span className={`badge bg-${order.status === 'Completed' ? 'success' : 'warning'}`}>{order.status}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No recent orders found.</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Additional Widgets */}
      <div className="row g-4 mt-4">
        <div className="col-md-6">
          <motion.div
            className={cardClass}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="card-body">
              <h5 className="card-title mb-3"><AlertTriangle size={18} className="me-2" />Low Stock Alerts</h5>
              <ul className="list-group list-group-flush">
                {lowStockProducts.length > 0 ? (
                  lowStockProducts.map(product => (
                    <li key={product._id} className={`${listItemClass} d-flex justify-content-between`}>
                      <span>{product.name}</span>
                      <span className="badge bg-warning text-dark">{product.stock} left</span>
                    </li>
                  ))
                ) : (
                  <p>No products with low stock.</p>
                )}
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="col-md-6">
          <motion.div
            className={cardClass}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="card-body">
              <h5 className="card-title mb-3"><Star size={18} className="me-2" />Top Selling Products</h5>
              <ul className="list-group list-group-flush">
                {topSellingProducts.length > 0 ? (
                  topSellingProducts.map(product => (
                    <li key={product._id} className={`${listItemClass} d-flex justify-content-between`}>
                      <span>{product.name}</span>
                      <span>KES {new Intl.NumberFormat('en-KE').format(product.price)}</span>
                    </li>
                  ))
                ) : (
                  <p>No top-selling products found.</p>
                )}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add dark theme styles */}
      <style>{`
        body.dark-theme { background-color: #121212; color: #f0f0f0; }
        body.light-theme { background-color: #f8f9fa; color: #212529; }
        .bg-dark { background-color: #212529 !important; }
        .bg-secondary { background-color: #343a40 !important; }
        .list-group-item.bg-dark {
          background-color: #343a40 !important;
          color: #f0f0f0 !important;
          border-color: #495057 !important;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;