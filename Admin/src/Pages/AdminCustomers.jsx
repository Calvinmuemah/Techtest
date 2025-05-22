import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, Phone } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';


const customers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234-567-8900',
    orders: 5,
    totalSpent: 74900,
    joinDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 234-567-8901',
    orders: 3,
    totalSpent: 45900,
    joinDate: '2024-02-20'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1 234-567-8902',
    orders: 8,
    totalSpent: 129900,
    joinDate: '2023-12-10'
  }
];

const AdminCustomers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <h1 className="fw-bold mb-4">Customers</h1>

      {/* Search */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <Search size={20} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
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
        {customers.map((customer) => (
          <motion.div
            key={customer.id}
            className="col-md-6 col-lg-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">{customer.name}</h5>
                  <span className="badge bg-primary">#{customer.id}</span>
                </div>
                
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <Mail size={16} className="text-muted me-2" />
                    <a href={`mailto:${customer.email}`} className="text-decoration-none">
                      {customer.email}
                    </a>
                  </div>
                  <div className="d-flex align-items-center">
                    <Phone size={16} className="text-muted me-2" />
                    <a href={`tel:${customer.phone}`} className="text-decoration-none">
                      {customer.phone}
                    </a>
                  </div>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <div className="bg-light rounded p-2 text-center">
                      <small className="text-muted d-block">Orders</small>
                      <strong>{customer.orders}</strong>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-light rounded p-2 text-center">
                      <small className="text-muted d-block">Total Spent</small>
                      <strong>₹{customer.totalSpent.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>

                <div className="text-muted small">
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