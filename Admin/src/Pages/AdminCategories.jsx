import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { categories } from '../Data/Categories';
import 'bootstrap/dist/css/bootstrap.min.css';


const AdminCategories = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">Categories</h1>
        <button 
          className="btn btn-primary d-flex align-items-center gap-2"
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
            <div className="card border-0 shadow-sm h-100">
              <img
                src={category.image}
                className="card-img-top"
                alt={category.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="card-title mb-1">{category.name}</h5>
                    <p className="text-muted small mb-2">{category.itemCount} items</p>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary">
                      <Edit size={16} />
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
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