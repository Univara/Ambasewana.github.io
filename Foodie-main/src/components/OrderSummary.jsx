import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import Axios for HTTP requests
import { burger1 } from '../assets'; // Adjust the import path as needed
import './Styles/OrderDetails.css';

function OrderDetails() {
  const location = useLocation();
  const { cart } = location.state;

  const [userName, setUserName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handleTableNumberChange = (e) => setTableNumber(e.target.value);

  const handleSubmit = () => {
    if (userName && tableNumber) {
      setIsSubmitted(true);
    } else {
      alert('Please enter both your name and table number.');
    }
  };

  const calculateSubtotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateTotalPrice = () => {
    return Object.values(cart).reduce(
      (total, item) => total + calculateSubtotal(item),
      0
    );
  };

  const total = calculateTotalPrice();

  const handlePlaceOrder = async () => {
    try {
      const orderItems = Object.values(cart).map((item) => ({
        itemName: item.name,
        image: burger1, // Replace with the actual image URL or logic to get image URL
        price: item.price,
        quantity: item.quantity,
      }));

      const orderData = {
        customerName: userName,
        table: tableNumber,
        orderNumber: 'your_order_number_here', // Generate/order number as needed
        orderStatus: 'pending', // Example status, adjust as per your app logic
        items: orderItems,
      };
      console.log(orderData);
      // Send POST request to server
      const response = await axios.post(
        'http://localhost:3000/api/orders',
        orderData
      );

      // Handle success response
      console.log('Order placed successfully:', response.data);

      // Optionally, you can redirect or show a success message here
      setIsSubmitted(false); // Reset submission state if needed
    } catch (error) {
      // Handle error
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again later.');
    }
  };

  return (
    <div className="order-details">
      {!isSubmitted ? (
        <div className="input-form">
          <h2>Enter Your Details</h2>
          <div className="input-group">
            <label htmlFor="userName">User Name:</label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={handleUserNameChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="tableNumber">Table Number:</label>
            <input
              id="tableNumber"
              type="text"
              value={tableNumber}
              onChange={handleTableNumberChange}
              required
            />
          </div>
          <button onClick={handleSubmit} className="button">
            Submit
          </button>
        </div>
      ) : (
        <>
          <h2>Order Details</h2>
          <p>User Name: {userName}</p>
          <p>Table Number: {tableNumber}</p>
          <div className="cart-list-container">
            {Object.values(cart).map((item) => (
              <div key={item.id} className="cart-list">
                <div className="cart-item-details">
                  <img
                    src={burger1}
                    className="cart-item-image"
                    alt={item.name}
                  />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p>Price: Rs.{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="divider"></div>
          <div className="total-price">
            <h2>Total Price: Rs.{total}</h2>
          </div>
          <button onClick={handlePlaceOrder} className="button">
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default OrderDetails;
