import React, { useState } from 'react';
import axios from 'axios';
import './Styles/AddProductForm.css';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ground_price: '',
    upper_price: '',
    category: '',
    image: null,
  });
  const [message, setMessage] = useState('');
  const [productType, setProductType] = useState('indian'); // Default to 'indian'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/products/${productType}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage('Product added successfully!');
    } catch (error) {
      setMessage(`Failed to add product: ${error.response.data.error}`);
    }
  };

  const toggleProductType = () => {
    setProductType(productType === 'indian' ? 'chinese' : 'indian');
    setMessage(''); // Clear message when toggling to reset state
  };

  return (
    <div className="add-form">
      <div className="container-add mt-5">
        <h1 className="text-center">
          Add {productType === 'indian' ? 'Indian' : 'Chinese'} Product
        </h1>
        <button
          className="btn btn-sm btn-info mb-3"
          onClick={toggleProductType}
        >
          Switch to {productType === 'indian' ? 'Chinese' : 'Indian'} Product
        </button>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="ground_price">Ground Price</label>
            <input
              type="number"
              className="form-control"
              id="ground_price"
              name="ground_price"
              value={formData.ground_price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="upper_price">Upper Price</label>
            <input
              type="number"
              className="form-control"
              id="upper_price"
              name="upper_price"
              value={formData.upper_price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Product Image</label>
            <input
              type="file"
              className="form-control-file"
              id="image"
              name="image"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit" className="btn-add">
            Add Product
          </button>
          <div className="mt-3">{message}</div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
