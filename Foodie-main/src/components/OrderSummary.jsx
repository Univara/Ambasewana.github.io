import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
          <button className="button">Place Order</button>
        </>
      )}
    </div>
  );
}

export default OrderDetails;
