import React from 'react';
import { motion } from 'framer-motion';

const CategoryCard = ({ category }) => {
  const placeholderImage = "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="card h-100 border-0 shadow-sm"
    >
      <img
        src={category.image || placeholderImage}
        alt={category.name}
        className="card-img-top"
        style={{ height: '200px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold">{category.name}</h5>
        <p className="card-text text-muted flex-grow-1">{category.description}</p>
        <p className="mt-auto text-primary fw-semibold small">{category.itemCount} Products</p>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
