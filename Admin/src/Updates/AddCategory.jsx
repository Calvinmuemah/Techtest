import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const AddCategory = () => {
  const navigate = useNavigate();  // Initialize navigate

  const [form, setForm] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });

  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await axios.post('http://localhost:5000/api/upload/image', formData);

      setForm((prev) => ({ ...prev, imageUrl: res.data.imageUrl }));
    } catch (error) {
      setError('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name || !form.description) {
      return setError('Name and description are required.');
    }

    try {
      const res = await axios.post('http://localhost:5000/api/createCat', form);
      setSuccess('Category created successfully!');
      setForm({ name: '', description: '', imageUrl: '' });

      // Navigate to categories page after successful creation
      navigate('/categories');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">Add New Category</h2>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Category Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter category name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter category description"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Image (optional)</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
          {uploading && <small>Uploading...</small>}
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Category"
              style={{ width: '150px', marginTop: '10px', borderRadius: '5px' }}
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={uploading}>
          {uploading ? 'Creating...' : 'Create Category'}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
