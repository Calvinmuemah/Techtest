import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css'
const Hero = () => {
  return (
    <div className="bg-dark text-white py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Text Section */}
          <motion.div 
            className="col-md-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="display-4 fw-bold mb-4">Discover the Latest in Tech Innovation</h1>
            <p className="lead mb-4">
              Explore our premium collection of cutting-edge electronics and home appliances. From smartphones to smart homes, we've got you covered.
            </p>
            <div className="d-flex gap-3">
              <Link to="/products" className="btn btn-primary px-4 py-2">
                Shop Now
              </Link>
              <Link to="/categories" className="btn btn-outline-light px-4 py-2">
                View Deals
              </Link>
            </div>
            <div className="d-flex gap-4 mt-4">
              <div>
                <div className="fs-4 fw-bold text-primary">24/7</div>
                <div className="text-light">Customer Support</div>
              </div>
              <div>
                <div className="fs-4 fw-bold text-primary">100%</div>
                <div className="text-light">Secure Checkout</div>
              </div>
              <div>
                <div className="fs-4 fw-bold text-primary">Fast</div>
                <div className="text-light">Delivery</div>
              </div>
            </div>
          </motion.div>

          {/* Carousel Section */}
          <motion.div 
            className="col-md-6 mt-5 mt-md-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div 
              id="heroCarousel" 
              className="carousel slide" 
              data-bs-ride="carousel"
            >
              <div className="carousel-inner rounded-4 shadow-lg overflow-hidden">
                <div className="carousel-item active">
                  <img 
                    src="https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    className="d-block w-100" 
                    alt="Latest smartphones"
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Latest Smartphones</h5>
                    <p>Experience the power of next-gen technology</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img 
                    src="https://images.pexels.com/photos/3178938/pexels-photo-3178938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    className="d-block w-100" 
                    alt="Premium Laptops"
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Premium Laptops</h5>
                    <p>Power and performance in your hands</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img 
                    src="https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    className="d-block w-100" 
                    alt="Smart Home Devices"
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Smart Home Appliances</h5>
                    <p>Transform your living space</p>
                  </div>
                </div>
              </div>

              {/* Carousel Controls */}
              <button 
                className="carousel-control-prev" 
                type="button" 
                data-bs-target="#heroCarousel" 
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button 
                className="carousel-control-next" 
                type="button" 
                data-bs-target="#heroCarousel" 
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
