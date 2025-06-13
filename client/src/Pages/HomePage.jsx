import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Hero from '../Components/Hero';
import FeaturedProducts from '../Components/FeaturedProducts'; // Make sure this path is correct
import CategoryCard from '../Components/CategoryCard';
import PromoBanner from '../Components/PromoBanner';
import TestimonialSection from '../Components/TestimonialSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState(null);

  const [newArrivals, setNewArrivals] = useState([]);
  const [loadingNewArrivals, setLoadingNewArrivals] = useState(true);
  const [errorNewArrivals, setErrorNewArrivals] = useState(null);

  const [bestsellers, setBestsellers] = useState([]);
  const [loadingBestsellers, setLoadingBestsellers] = useState(true);
  const [errorBestsellers, setErrorBestsellers] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT;

  // --- Fetch Categories ---
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      setErrorCategories(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/getCats`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const categoryData = Array.isArray(data) ? data : data.categories || [];
        setCategories(categoryData);
      } catch (err) {
        setErrorCategories('Failed to load categories.');
        console.error('Error fetching categories:', err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, [API_BASE_URL]);

  // --- Fetch Featured Products ---
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoadingFeatured(true);
      setErrorFeatured(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/product/getFeaturedProducts`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setFeaturedProducts(data);
      } catch (err) {
        setErrorFeatured('Failed to load featured products.');
        console.error('Error fetching featured products:', err);
      } finally {
        setLoadingFeatured(false);
      }
    };
    fetchFeaturedProducts();
  }, [API_BASE_URL]);

  // --- Fetch New Arrivals ---
  useEffect(() => {
    const fetchNewArrivals = async () => {
      setLoadingNewArrivals(true);
      setErrorNewArrivals(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/product/getNewArrivals`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        // Limit to 4 products here if backend doesn't already
        setNewArrivals(data.slice(0, 4));
      } catch (err) {
        setErrorNewArrivals('Failed to load new arrivals.');
        console.error('Error fetching new arrivals:', err);
      } finally {
        setLoadingNewArrivals(false);
      }
    };
    fetchNewArrivals();
  }, [API_BASE_URL]);

  // --- Fetch Bestsellers ---
  useEffect(() => {
    const fetchBestsellers = async () => {
      setLoadingBestsellers(true);
      setErrorBestsellers(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/top-selling`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        // Limit to 4 products here if backend doesn't already
        setBestsellers(data.slice(0, 4));
      } catch (err) {
        setErrorBestsellers('Failed to load bestsellers.');
        console.error('Error fetching bestsellers:', err);
      } finally {
        setLoadingBestsellers(false);
      }
    };
    fetchBestsellers();
  }, [API_BASE_URL]);

  const homepageCategories = categories.filter(category =>
    ['Monitors', 'Phones', 'Laptops', 'Laptop Bags'].includes(category.name)
  );

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
              <Link to="/categories" className="btn btn-outline-primary d-inline-flex align-items-center">
                View All Categories <ArrowRight size={16} className="ms-2" />
              </Link>
            </div>
          </div>

          {loadingCategories ? (
            <p>Loading categories...</p>
          ) : errorCategories ? (
            <p className="text-danger">{errorCategories}</p>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {homepageCategories.length > 0 ? (
                homepageCategories.map((category) => (
                  <div key={category._id} className="col">
                    <CategoryCard
                      category={{
                        id: category._id,
                        name: category.name,
                        description: category.description,
                        image: category.imageUrl ? `${API_BASE_URL}${category.imageUrl}` : '/placeholder.png',
                        itemCount: category.itemCount || 0,
                      }}
                    />
                  </div>
                ))
              ) : (
                <p className="text-muted">No featured categories found.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts
        title="Featured Products"
        products={featuredProducts}
        loading={loadingFeatured}
        error={errorFeatured}
        viewAllLink="/products?filter=featured"
        API_BASE_URL={API_BASE_URL}
      />

      {/* Promo Banner 1 */}
      <PromoBanner
        title="Premium Laptops"
        subtitle="Up to 15% off on selected models"
        backgroundImage="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
        link="/products/category/1"
        alignment="left"
      />

      {/* New Arrivals Section */}
      <FeaturedProducts
        title="New Arrivals"
        products={newArrivals}
        loading={loadingNewArrivals}
        error={errorNewArrivals}
        viewAllLink="/products?filter=new"
        API_BASE_URL={API_BASE_URL}
      />

      {/* Promo Banner 2 */}
      <PromoBanner
        title="Smart Home Revolution"
        subtitle="Transform your living space with cutting-edge appliances"
        backgroundImage="https://images.pexels.com/photos/4049979/pexels-photo-4049979.jpeg"
        link="/products/category/4"
        alignment="right"
      />

      {/* Bestsellers Section */}
      <FeaturedProducts
        title="Bestsellers"
        products={bestsellers}
        loading={loadingBestsellers}
        error={errorBestsellers}
        viewAllLink="/products?filter=bestseller"
        API_BASE_URL={API_BASE_URL}
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