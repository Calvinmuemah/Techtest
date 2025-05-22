import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import { products } from '../Data/Products';
import 'bootstrap/dist/css/bootstrap.min.css';


const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(product => product.category))];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">Products</h1>
        <button className="btn btn-primary d-flex align-items-center gap-2">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <Search size={20} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <Filter size={20} />
                </span>
                <select
                  className="form-select border-start-0"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <motion.div
        className="card border-0 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="rounded"
                          width="40"
                          height="40"
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">{product.name}</h6>
                          <small className="text-muted">#{product.id}</small>
                        </div>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>₹{product.price.toLocaleString()}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary">
                          <Edit size={16} />
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminProducts;