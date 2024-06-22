import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/Products.css'; // Assuming you have a CSS file for styling
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('indian');
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleDelete = async (id) => {
    // Show confirmation dialog using SweetAlert
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:3000/api/products/${category}/${id}`
        );
        setProducts(products.filter((product) => product.id !== id));
        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting product:', error);
        Swal.fire('Error!', 'Failed to delete the product.', 'error');
      }
    }
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <Link to="/add_product">
        <button className="add-btn">Add Product</button>
      </Link>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <table className="products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Category</th>
            <th>Ground_Price</th>
            <th>Upper_Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>
                <img src={product.image} alt={product.name} width="50" />
              </td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>Rs.{product.ground_price}</td>
              <td>Rs.{product.upper_price}</td>
              <td>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
