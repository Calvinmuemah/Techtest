import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css'

const CategoryCard = ({ category }) => {
  return (
    <motion.div 
      className="card border-0 shadow-sm h-100 overflow-hidden"
      whileHover={{ 
        scale: 1.03, 
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/products/category/${category.id}`} className="text-decoration-none">
        <div className="position-relative">
          <img 
            src={category.image} 
            alt={category.name}
            className="card-img-top"
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-40"></div>
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white p-3">
            <h3 className="fw-bold mb-2">{category.name}</h3>
            <p className="mb-2 text-center">{category.description}</p>
            <div className="badge bg-light text-dark">
              {category.itemCount} Products
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
