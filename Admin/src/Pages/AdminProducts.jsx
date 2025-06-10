import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTheme } from '../Contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const AdminProducts = () => {
  const { theme } = useTheme();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/products/all`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
      localStorage.setItem('products', JSON.stringify(data));
    } catch (error) {
      console.error(error);
      const local = localStorage.getItem('products');
      if (local) {
        setProducts(JSON.parse(local));
      }
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete product');
      setProducts((prev) => {
        const updated = prev.filter((p) => p._id !== id);
        localStorage.setItem('products', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const goToAddProduct = () => {
    navigate('/addProducts');
  };

  const goToEditProduct = (id) => {
    navigate(`/editproduct/${id}`);
  };

  const filteredProducts = products.filter((product) => {
    const name = product.name?.toLowerCase() || '';
    const matchesSearch = name.includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  return (
    <div className={`${theme === 'dark' ? 'bg-dark text-white' : ''} p-3`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">Products</h1>
        <button
          className={`btn d-flex align-items-center gap-2 ${theme === 'dark' ? 'btn-light text-dark' : 'btn-primary'}`}
          onClick={goToAddProduct}
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className={`card border-0 shadow-sm mb-4 ${theme === 'dark' ? 'bg-secondary text-white' : ''}`}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className={`input-group-text ${theme === 'dark' ? 'bg-dark text-white border-light' : ''}`}>
                  <Search size={20} />
                </span>
                <input
                  type="text"
                  className={`form-control ${theme === 'dark' ? 'bg-dark text-white border-light' : ''}`}
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="input-group">
                <span className={`input-group-text ${theme === 'dark' ? 'bg-dark text-white border-light' : ''}`}>
                  <Filter size={20} />
                </span>
                <select
                  className={`form-select ${theme === 'dark' ? 'bg-dark text-white border-light' : ''}`}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
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
                  <th>NO</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td><div><h6 className="mb-0">{product.name}</h6><small className="text-muted">{product._id}</small></div></td>
                      <td>{product.category}</td>
                      <td>Ksh {Number(product.price).toLocaleString()}</td>
                      <td>{product.stock}</td>
                      <td><span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          title="Edit"
                          onClick={() => goToEditProduct(product._id)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Delete"
                          onClick={() => deleteProduct(product._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={7} className="text-center text-muted">No products found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminProducts;
