import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTheme } from '../Contexts/ThemeContext';

const AdminCategories = () => {
  const { theme } = useTheme();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    image: null
  });
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Load categories from backend if not in localStorage
    if (!localStorage.getItem('categories')) {
      fetch('http://localhost:5000/api/categories')
        .then(res => res.json())
        .then(data => {
          setCategories(data);
          localStorage.setItem('categories', JSON.stringify(data));
        })
        .catch(console.error);
    }
  }, []);

  const handleAddCategory = async () => {
    const formData = new FormData();
    formData.append('name', newCategory.name);
    formData.append('description', newCategory.description);
    formData.append('image', newCategory.image);

    try {
      const response = await fetch('http://localhost:5000/api/createCat', {
        method: 'POST',
        body: formData,
      });

      const savedCategory = await response.json();
      const updatedCategories = [...categories, savedCategory];
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      setIsAddModalOpen(false);
      setNewCategory({ name: '', description: '', image: null });
    } catch (err) {
      console.error('Error saving category:', err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/deleteCat/${id}`, { method: 'DELETE' });
      const updated = categories.filter(cat => cat.id !== id);
      setCategories(updated);
      localStorage.setItem('categories', JSON.stringify(updated));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className={theme === 'dark' ? 'bg-dark text-white min-vh-100' : ''}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">Categories</h1>
        <button 
          className={`btn d-flex align-items-center gap-2 ${
            theme === 'dark' ? 'btn-info text-dark' : 'btn-primary'
          }`}
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      <div className="row g-4">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="col-md-6 col-lg-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`card border-0 shadow-sm h-100 ${theme === 'dark' ? 'bg-secondary text-white' : ''}`}>
              <img
                src={category.image?.url}
                className="card-img-top"
                alt={category.name}
                style={{ 
                  height: '200px', 
                  objectFit: 'cover', 
                  filter: theme === 'dark' ? 'brightness(0.8)' : 'none' 
                }}
              />
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="card-title mb-1">{category.name}</h5>
                    <p className={`${theme === 'dark' ? 'text-light-50' : 'text-muted'} small mb-2`}>
                      {category.itemCount || 0} items
                    </p>
                  </div>
                  <div className="d-flex gap-2">
                    <button 
                      className={`btn btn-sm ${
                        theme === 'dark' ? 'btn-outline-info text-info' : 'btn-outline-primary'
                      }`}
                      aria-label={`Edit ${category.name}`}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className={`btn btn-sm ${
                        theme === 'dark' ? 'btn-outline-danger text-danger' : 'btn-outline-danger'
                      }`}
                      aria-label={`Delete ${category.name}`}
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="card-text">{category.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className={`modal-content ${theme === 'dark' ? 'bg-dark text-white' : ''}`}>
              <div className="modal-header">
                <h5 className="modal-title">Add New Category</h5>
                <button type="button" className="btn-close" onClick={() => setIsAddModalOpen(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setNewCategory({ ...newCategory, image: e.target.files[0] })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddCategory}>
                  Save Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
