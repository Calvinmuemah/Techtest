import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTheme } from '../Contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const AdminCategories = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    console.log('Initial categories from localStorage:', saved);
    try {
      const parsed = saved ? JSON.parse(saved) : [];
      console.log('Parsed categories:', parsed);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to parse categories from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    console.log('Fetching categories from backend...');
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/getCats`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched categories:', data);
        const catArray = Array.isArray(data) ? data : data.categories || [];
        setCategories(catArray);
        localStorage.setItem('categories', JSON.stringify(catArray)); // optional cache
      })
      .catch(err => {
        console.error('Failed to fetch categories:', err);
        setCategories([]);  // clear categories on error
      });
  }, []);

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      console.log('Deleting category with id:', id);
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/deleteCat/${id}`, { method: 'DELETE' });
      console.log('Delete response status:', response.status);
      if (response.ok) {
        const updated = categories.filter(cat => cat._id !== id);
        setCategories(updated);
        localStorage.setItem('categories', JSON.stringify(updated));
        console.log('Category deleted and state/localStorage updated.');
      } else {
        console.error('Failed to delete category:', response.statusText);
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  console.log('Rendering categories:', categories);

  return (
    <div className={theme === 'dark' ? 'bg-dark text-white min-vh-100 p-4' : 'p-4'}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">Categories</h1>
        <button 
          className={`btn btn-primary`}
          onClick={() => navigate('/addCategories')}
        >
          Add Category
        </button>
      </div>

      <div className="row g-4">
        {Array.isArray(categories) && categories.map((category) => (
          <motion.div
            key={category._id}
            className="col-md-6 col-lg-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`card border-0 shadow-sm h-100 ${theme === 'dark' ? 'bg-secondary text-white' : ''}`}>
              <img
                // Prefix backend URL to imageUrl here:
                src={category.imageUrl ? `${import.meta.env.VITE_API_ENDPOINT}${category.imageUrl}` : '/placeholder.png'}
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
                      className={`btn btn-sm ${theme === 'dark' ? 'btn-outline-info text-info' : 'btn-outline-primary'}`}
                      aria-label={`Edit ${category.name}`}
                      onClick={() => navigate(`/editCategory/${category._id}`)}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className={`btn btn-sm btn-outline-danger`}
                      aria-label={`Delete ${category.name}`}
                      onClick={() => handleDeleteCategory(category._id)}
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
    </div>
  );
};

export default AdminCategories;
