import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTheme } from '../Contexts/ThemeContext';

const emptyProduct = {
  id: '',
  name: '',
  category: '',
  price: 0,
  stock: 0,
  image: '',
  description: '',
};

const AdminProducts = () => {
  const { theme } = useTheme();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentProduct, setCurrentProduct] = useState(emptyProduct);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
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

  const saveProduct = async (product) => {
    try {
      let res, savedProduct;

      if (modalMode === 'add') {
        res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        });
        if (!res.ok) throw new Error('Failed to add product');
        savedProduct = await res.json();
        setProducts((prev) => {
          const updated = [...prev, savedProduct];
          localStorage.setItem('products', JSON.stringify(updated));
          return updated;
        });
      } else {
        res = await fetch(`/api/products/${product.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        });
        if (!res.ok) throw new Error('Failed to update product');
        savedProduct = await res.json();
        setProducts((prev) => {
          const updated = prev.map((p) => (p.id === savedProduct.id ? savedProduct : p));
          localStorage.setItem('products', JSON.stringify(updated));
          return updated;
        });
      }

      closeModal();
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete product');
      setProducts((prev) => {
        const updated = prev.filter((p) => p.id !== id);
        localStorage.setItem('products', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const openAddModal = () => {
    setModalMode('add');
    setCurrentProduct(emptyProduct);
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setModalMode('edit');
    setCurrentProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentProduct(emptyProduct);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentProduct((prev) => ({
        ...prev,
        image: reader.result, // base64 string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentProduct.name.trim()) {
      alert('Product name is required');
      return;
    }
    saveProduct(currentProduct);
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-dark text-white' : ''} p-3`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">Products</h1>
        <button
          className={`btn d-flex align-items-center gap-2 ${theme === 'dark' ? 'btn-light text-dark' : 'btn-primary'}`}
          onClick={openAddModal}
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
                          <small className="text-muted">{product.id}</small>
                        </div>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>Ksh {product.price.toLocaleString()}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        title="Edit"
                        onClick={() => openEditModal(product)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        title="Delete"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={closeModal}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className={`modal-content ${theme === 'dark' ? 'bg-dark text-white' : ''}`}>
              <div className="modal-header">
                <h5 className="modal-title">{modalMode === 'add' ? 'Add Product' : 'Edit Product'}</h5>
                <button type="button" className={`btn-close ${theme === 'dark' ? 'btn-close-white' : ''}`} onClick={closeModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={currentProduct.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      value={currentProduct.category}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={currentProduct.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Stock</label>
                      <input
                        type="number"
                        className="form-control"
                        name="stock"
                        value={currentProduct.stock}
                        onChange={handleChange}
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Image Upload</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    {currentProduct.image && (
                      <img
                        src={currentProduct.image}
                        alt="Preview"
                        className="mt-2"
                        style={{ maxWidth: '100px', height: 'auto' }}
                      />
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="3"
                      value={currentProduct.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {modalMode === 'add' ? 'Add Product' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
