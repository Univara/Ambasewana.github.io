import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/Products.css'; // Assuming you have a CSS file for styling

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('indian');

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/products/${category}`
      );
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const handleDelete = (id) => {
    // Handle delete product
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleAdd = () => {
    // Handle add product
    const newProduct = {
      id: new Date().getTime(),
      name: 'New Product',
      type: category,
      image: 'https://via.placeholder.com/100',
      description: 'Description of the new product',
      category: 'New Category',
      price: Math.floor(Math.random() * 100),
    };
    setProducts([...products, newProduct]);
  };

  const handleSwitchCategory = () => {
    setCategory(category === 'indian' ? 'chinese' : 'indian');
    setLoading(true);
    setError(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="products-container">
      <h1>Products</h1>
      <button onClick={handleSwitchCategory} className="switch-btn">
        Switch to {category === 'indian' ? 'Chinese' : 'Indian'} Products
      </button>
      <button onClick={handleAdd} className="add-btn">
        Add Product
      </button>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <h2>
              {product.name} ({product.type})
            </h2>
            <img src={product.image} alt={product.name} width="100" />
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <button
              onClick={() => handleDelete(product.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
