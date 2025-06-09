import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, Phone } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTheme } from '../Contexts/ThemeContext';

const AdminCustomers = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomersData = async () => {
      try {
        const usersRes = await fetch('http://localhost:5000/api/Users');
        const users = await usersRes.json();

        const combined = users.map((user, index) => ({
          serialId: index + 1, // Auto-incremented ID
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone_number || 'N/A',
          orders: 0,
          totalSpent: 0,
          joinDate: user.createdAt || user.joinDate || new Date().toISOString(),
        }));

        setCustomers(combined);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomersData();
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`${theme === 'dark' ? 'bg-dark text-white' : ''}`}>
      <h1 className="fw-bold mb-4">Customers</h1>

      {/* Search */}
      <div className={`card border-0 shadow-sm mb-4 ${theme === 'dark' ? 'bg-secondary text-white' : ''}`}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="input-group">
                <span className={`input-group-text ${theme === 'dark' ? 'bg-dark text-white border-light' : 'bg-white'}`}>
                  <Search size={20} />
                </span>
                <input
                  type="text"
                  className={`form-control ${theme === 'dark' ? 'bg-dark text-white border-light' : ''}`}
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="row g-4">
        {filteredCustomers.map((customer) => (
          <motion.div
            key={customer.id}
            className="col-md-6 col-lg-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`card border-0 shadow-sm h-100 ${theme === 'dark' ? 'bg-secondary text-white' : ''}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">{customer.name}</h5>
                  <span className={`badge ${theme === 'dark' ? 'bg-info text-dark' : 'bg-primary'}`}>
                    {customer.serialId}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <Mail size={16} className={`${theme === 'dark' ? 'text-light' : 'text-muted'} me-2`} />
                    <a
                      href={`mailto:${customer.email}`}
                      className={`text-decoration-none ${theme === 'dark' ? 'text-light' : ''}`}
                    >
                      {customer.email}
                    </a>
                  </div>
                  <div className="d-flex align-items-center">
                    <Phone size={16} className={`${theme === 'dark' ? 'text-light' : 'text-muted'} me-2`} />
                    <a
                      href={`tel:${customer.phone}`}
                      className={`text-decoration-none ${theme === 'dark' ? 'text-light' : ''}`}
                    >
                      {customer.phone}
                    </a>
                  </div>
                </div>

                <div className="row g-2 mb-3">
                  <div className={`col-6 ${theme === 'dark' ? 'bg-dark' : 'bg-light'} rounded p-2 text-center`}>
                    <small className="text-muted d-block">Orders</small>
                    <strong>{customer.orders}</strong>
                  </div>
                  <div className={`col-6 ${theme === 'dark' ? 'bg-dark' : 'bg-light'} rounded p-2 text-center`}>
                    <small className="text-muted d-block">Total Spent</small>
                    <strong>Ksh {(customer.totalSpent || 0).toLocaleString()}</strong>
                  </div>
                </div>

                <div className="small text-muted">
                  Member since {new Date(customer.joinDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminCustomers;
