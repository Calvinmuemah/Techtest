import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CategoryCard from '../Components/CategoryCard'; // Adjust path if needed
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useTheme } from '../Contexts/ThemeContext'; // Removed ThemeContext import

const AllCategoriesPage = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Removed: const { theme } = useTheme(); 

  const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT; 

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        setLoading(true); // Start loading
        const res = await fetch(`${API_BASE_URL}/api/getCats`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        // Normalize the data: ensure it's an array
        const categoryData = Array.isArray(data) ? data : data.categories || [];
        setAllCategories(categoryData);
      } catch (err) {
        setError('Failed to load categories. Please try again later.');
        console.error('Error fetching all categories:', err);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchAllCategories();
  }, [API_BASE_URL]); // Dependency array to re-run if API_BASE_URL changes

  // --- UI for Loading, Error, and Content ---
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light"> {/* Fixed to bg-light */}
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading categories...</span>
        </div>
        <p className="ms-3 text-dark">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center bg-light"> {/* Fixed to bg-light */}
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
        <p className="text-dark">There was a problem fetching the categories. Please refresh the page or try again later.</p>
      </div>
    );
  }

  return (
    <div className="container py-5 bg-light text-dark"> {/* Fixed to bg-light text-dark */}
      <h1 className="fw-bold mb-5 text-center">All Product Categories</h1>

      {allCategories.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {allCategories.map((category) => (
            <motion.div
              key={category._id} // Using _id for unique key
              className="col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }} // Subtle hover effect
            >
              <CategoryCard
                category={{
                  id: category._id,
                  name: category.name,
                  description: category.description,
                  // Construct the full image URL
                  image: category.imageUrl ? `${API_BASE_URL}${category.imageUrl}` : '/placeholder.png',
                  itemCount: category.itemCount || 0,
                }}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center p-5">
          <p className="lead text-dark">No categories found at the moment.</p>
          <p className="text-dark">It seems there are no product categories to display.</p>
        </div>
      )}
    </div>
  );
};

export default AllCategoriesPage;