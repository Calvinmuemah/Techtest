import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

const PromoBanner = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  link, 
  alignment = 'left' 
}) => {
  return (
    <div className="container my-5">
      <motion.div
        className="position-relative rounded-4 overflow-hidden shadow-sm"
        style={{ height: '300px' }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div 
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.8)'
          }}
        />

        <div 
          className={`position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center ${
            alignment === 'left' ? 'align-items-start ps-5' :
            alignment === 'right' ? 'align-items-end pe-5' :
            'align-items-center text-center px-4'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-white fw-bold display-5 mb-3">{title}</h2>
            <p className="text-white fs-5 mb-4">{subtitle}</p>
            <Link to={link} className="btn btn-light px-4 py-2">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PromoBanner;
