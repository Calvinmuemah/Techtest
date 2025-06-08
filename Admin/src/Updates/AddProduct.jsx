import { useState, useEffect } from 'react';
import { useTheme } from '../Contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const emptyProduct = {
  name: '',
  category: '',
  price: '',
  oldPrice: '',
  description: '',
  features: [''],
  specifications: [{ key: '', value: '' }],
  image: '',
  isFeatured: false,
  isNew: false,
  stock: 0,
};

// Backend endpoints
const CATEGORY_FETCH_ENDPOINT = 'http://localhost:5000/api/getCats';
const IMAGE_UPLOAD_ENDPOINT = 'http://localhost:5000/api/upload/image';
const PRODUCT_CREATE_ENDPOINT = 'http://localhost:5000/api/createProduct';

const AddProduct = () => {
  const { theme } = useTheme();
  const [product, setProduct] = useState(emptyProduct);
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(CATEGORY_FETCH_ENDPOINT);
        const data = await res.json();
        setCategories(data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'isFeatured' || name === 'isNew') {
      setProduct((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'price' || name === 'oldPrice' || name === 'stock') {
      setProduct((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...product.features];
    newFeatures[index] = value;
    setProduct((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setProduct((prev) => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index) => {
    const newFeatures = product.features.filter((_, i) => i !== index);
    setProduct((prev) => ({ ...prev, features: newFeatures }));
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...product.specifications];
    newSpecs[index][field] = value;
    setProduct((prev) => ({ ...prev, specifications: newSpecs }));
  };

  const addSpecification = () => {
    setProduct((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { key: '', value: '' }],
    }));
  };

  const removeSpecification = (index) => {
    const newSpecs = product.specifications.filter((_, i) => i !== index);
    setProduct((prev) => ({ ...prev, specifications: newSpecs }));
  };

  // Image upload via backend
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const res = await fetch(IMAGE_UPLOAD_ENDPOINT, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Image upload failed');
      const data = await res.json();
      setProduct((prev) => ({ ...prev, image: data.imageUrl || data.url }));
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name.trim()) {
      alert('Product name is required');
      return;
    }
    if (!product.category) {
      alert('Please select a category');
      return;
    }
    if (!product.price || product.price <= 0) {
      alert('Price must be greater than zero');
      return;
    }
    if (product.stock < 0) {
      alert('Stock cannot be negative');
      return;
    }

    const specsObj = {};
    product.specifications.forEach(({ key, value }) => {
      if (key.trim()) specsObj[key.trim()] = value.trim();
    });

    const dataToSend = {
      ...product,
      specifications: specsObj,
      features: product.features.filter((f) => f.trim() !== ''),
    };

    try {
      const res = await fetch(PRODUCT_CREATE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      if (!res.ok) throw new Error('Failed to add product');
      alert('Product added successfully!');
      navigate('/products');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-dark text-white' : ''} p-3`}>
      <h1 className="mb-4">Add Product</h1>
      <form
        onSubmit={handleSubmit}
        className={`${theme === 'dark' ? 'bg-secondary p-4 rounded' : ''}`}
      >
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name*</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category*</label>
          <select
            className="form-select"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              -- Select category --
            </option>
            {categories.map((cat) => (
              <option key={cat._id || cat} value={cat.name || cat}>
                {cat.name || cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price (Ksh)*</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Old Price */}
        <div className="mb-3">
          <label className="form-label">Old Price (Ksh)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="form-control"
            name="oldPrice"
            value={product.oldPrice}
            onChange={handleChange}
          />
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label className="form-label">Stock*</label>
          <input
            type="number"
            min="0"
            className="form-control"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={product.description}
            onChange={handleChange}
          />
        </div>

        {/* Features */}
        <div className="mb-3">
          <label className="form-label">Features</label>
          {product.features.map((feature, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                type="text"
                className="form-control"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder="Feature"
              />
              <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={() => removeFeature(index)}
                disabled={product.features.length === 1}
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={addFeature}
          >
            + Add Feature
          </button>
        </div>

        {/* Specifications */}
        <div className="mb-3">
          <label className="form-label">Specifications</label>
          {product.specifications.map(({ key, value }, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Key"
                value={key}
                onChange={(e) =>
                  handleSpecChange(index, 'key', e.target.value)
                }
              />
              <input
                type="text"
                className="form-control ms-2"
                placeholder="Value"
                value={value}
                onChange={(e) =>
                  handleSpecChange(index, 'value', e.target.value)
                }
              />
              <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={() => removeSpecification(index)}
                disabled={product.specifications.length === 1}
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={addSpecification}
          >
            + Add Specification
          </button>
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {uploading && <div className="text-info mt-2">Uploading...</div>}
          {product.image && (
            <img
              src={product.image}
              alt="Preview"
              className="mt-3 rounded"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          )}
        </div>

        {/* Is Featured */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="isFeatured"
            id="isFeatured"
            checked={product.isFeatured}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="isFeatured">
            Is Featured
          </label>
        </div>

        {/* Is New */}
        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            name="isNew"
            id="isNew"
            checked={product.isNew}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="isNew">
            Is New
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
