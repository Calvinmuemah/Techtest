import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

// Added loading, error, and API_BASE_URL props
const FeaturedProducts = ({ title, products, loading, error, viewAllLink, API_BASE_URL }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Ensure we only display a maximum of 4 products in this section
  const productsToDisplay = products ? products.slice(0, 4) : [];

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">{title}</h2>
          {viewAllLink && (
            <Link to={viewAllLink} className="btn btn-outline-primary d-flex align-items-center">
              View All <ArrowRight size={16} className="ms-1" />
            </Link>
          )}
        </div>

        {/* Display loading, error, or products */}
        {loading ? (
          <p>Loading {title.toLowerCase()}...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : productsToDisplay.length > 0 ? (
          <motion.div
            className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {productsToDisplay.map((product) => (
              // CORRECTED: Key prop placed on the outermost element of the mapped array
              <div key={product._id} className="col">
                <ProductCard product={product} API_BASE_URL={API_BASE_URL} /> {/* Pass API_BASE_URL */}
              </div>
            ))}
          </motion.div>
        ) : (
          <p className="text-muted">No {title.toLowerCase()} found.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;