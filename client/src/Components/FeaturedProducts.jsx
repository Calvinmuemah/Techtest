import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

const FeaturedProducts = ({ title, products, viewAllLink }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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
        
        <motion.div 
          className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {products.map((product) => (
            <div key={product.id} className="col">
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
