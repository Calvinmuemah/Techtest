import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Hero from '../Components/Hero';
import FeaturedProducts from '../Components/FeaturedProducts';
import CategoryCard from '../Components/CategoryCard';
import PromoBanner from '../Components/PromoBanner';
import TestimonialSection from '../Components/TestimonialSection';
import { getFeaturedProducts, getNewArrivals, getBestsellers } from '../Data/products';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);

  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const bestsellers = getBestsellers();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/getCats');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError('Failed to load categories.');
        console.error('Error fetching categories:', err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Hero />

      {/* Categories Section */}
      <section className="py-5">
        <div className="container">
          <div className="row mb-4 align-items-center">
            <div className="col-md-8">
              <h2 className="fw-bold">Shop by Category</h2>
              <p className="text-muted">Find what you need in our extensive product categories</p>
            </div>
            <div className="col-md-4 text-md-end">
              <a href="/products" className="btn btn-outline-primary d-inline-flex align-items-center">
                View All Categories <ArrowRight size={16} className="ms-2" />
              </a>
            </div>
          </div>

          {loadingCategories ? (
            <p>Loading categories...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {categories.map((category) => (
                <div key={category._id} className="col">
                  <CategoryCard
                    category={{
                      id: category._id,
                      name: category.name,
                      description: category.description,
                      image: category.imageUrl,
                      itemCount: category.itemCount || 0,
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts 
        title="Featured Products" 
        products={featuredProducts} 
        viewAllLink="/products" 
      />

      {/* Promo Banner 1 */}
      <PromoBanner 
        title="Premium Laptops" 
        subtitle="Up to 15% off on selected models"
        backgroundImage="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
        link="/products/category/1"
        alignment="left"
      />

      {/* New Arrivals */}
      <FeaturedProducts 
        title="New Arrivals" 
        products={newArrivals} 
        viewAllLink="/products?filter=new" 
      />

      {/* Promo Banner 2 */}
      <PromoBanner 
        title="Smart Home Revolution" 
        subtitle="Transform your living space with cutting-edge appliances"
        backgroundImage="https://images.pexels.com/photos/4049979/pexels-photo-4049979.jpeg"
        link="/products/category/4"
        alignment="right"
      />

      {/* Bestsellers */}
      <FeaturedProducts 
        title="Bestsellers" 
        products={bestsellers}
        viewAllLink="/products?filter=bestseller" 
      />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Newsletter & Brands Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Newsletter */}
            <div className="col-lg-6">
              <motion.div
                className="card border-0 shadow-sm h-100 bg-primary text-white"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="card-body p-4 p-md-5">
                  <h3 className="fw-bold mb-3">Subscribe to Our Newsletter</h3>
                  <p className="mb-4">Stay updated with the latest products, exclusive offers, and tech news.</p>
                  <form className="d-flex flex-column flex-md-row gap-2">
                    <input type="email" className="form-control" placeholder="Your email address" />
                    <button type="submit" className="btn btn-light">Subscribe</button>
                  </form>
                </div>
              </motion.div>
            </div>

            {/* Brands */}
            <div className="col-lg-6">
              <motion.div
                className="card border-0 shadow-sm h-100"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="card-body p-4 p-md-5">
                  <h3 className="fw-bold mb-4">Featured Brands</h3>
                  <div className="row row-cols-2 row-cols-md-3 g-3">
                    {['Apple', 'Samsung', 'Sony', 'Dell', 'LG', 'Philips'].map((brand, index) => (
                      <div key={index} className="col text-center">
                        <div className="py-3 px-2 bg-light rounded">
                          <h6 className="mb-0">{brand}</h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
