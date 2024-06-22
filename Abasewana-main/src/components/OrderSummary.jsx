import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for HTTP requests
import { burger1 } from '../assets'; // Adjust the import path as needed
import './Styles/OrderDetails.css';

function OrderDetails() {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const { cart } = location.state;

  const [userName, setUserName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false); // New state for order confirmation

  useEffect(() => {
    const tableFromURL = new URLSearchParams(location.search).get('table');
    const storedTableNumber = localStorage.getItem('tableNumber');

    if (tableFromURL) {
      setTableNumber(tableFromURL);
    } else if (storedTableNumber) {
      setTableNumber(storedTableNumber);
    }
  }, [location.search]);

  const handleUserNameChange = (e) => setUserName(e.target.value);

  const handleSubmit = () => {
    if (userName && tableNumber) {
      setIsSubmitted(true);
    } else {
      alert('Please enter both your name and table number.');
    }
  };

  const calculateSubtotal = (item) => {
    const price =
      parseInt(tableNumber) >= 30 && parseInt(tableNumber) <= 35
        ? item.upper_price
        : item.ground_price;
    return price * item.quantity;
  };
  const calculateTotalPrice = () => {
    return Object.values(cart).reduce(
      (total, item) => total + calculateSubtotal(item),
      0
    );
  };

  const total = calculateTotalPrice();
  const getPriceDisplay = (item) => {
    const table = parseInt(tableNumber);
    const price =
      table >= 30 && table <= 35 ? item.upper_price : item.ground_price;
    return `Rs.${price}`;
  };
  // Function to generate a unique order number
  const generateOrderNumber = () => {
    const timestamp = new Date().getTime();
    const randomComponent = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${randomComponent}`;
  };

  const handlePlaceOrder = async () => {
    try {
      const orderNumber = generateOrderNumber();

      const orderItems = Object.values(cart).map((item) => ({
        itemName: item.name,
        image: burger1, // Replace with the actual image URL or logic to get image URL
        price: getPriceDisplay(item),
        quantity: item.quantity,
      }));

      const orderData = {
        customerName: userName,
        table: tableNumber,
        orderNumber: orderNumber, // Use the generated order number
        orderStatus: 'pending', // Example status, adjust as per your app logic
        items: orderItems,
      };

      // Send POST request to server
      const response = await axios.post(
        'http://localhost:3000/api/orders',
        orderData
      );

      // Handle success response
      console.log('Order placed successfully:', response.data);

      // Show confirmation message
      setOrderPlaced(true);

      // Redirect to the Placed Orders page with state
      setTimeout(() => {
        navigate('/placed-orders', { state: { orderData } });
      }, 2000); // Adjust delay as needed
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
            <p>Please Don't Leave or Change Your Table</p>
            <label htmlFor="tableNumber">Table Number:</label>
            <input
              id="tableNumber"
              type="text"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              readOnly
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
                    <p>Price: {getPriceDisplay(item)}</p>
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
          {orderPlaced && (
            <div className="confirmation-seal">
              <p>Order placed successfully!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default OrderDetails;
