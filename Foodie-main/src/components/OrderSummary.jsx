import React from 'react';
import { useLocation } from 'react-router-dom';
import { burger1 } from '../assets'; // Adjust the import path as needed
import './Styles/OrderDetails.css';
function OrderDetails() {
  const location = useLocation();
  const { userName, tableNumber, cart } = location.state;

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
      <h2>Order Details</h2>
      <p>User Name: {userName}</p>
      <p>Table Number: {tableNumber}</p>
      <div className="cart-list-container">
        {Object.values(cart).map((item) => (
          <div key={item.id} className="cart-list">
            <div className="cart-item-details">
              <img src={burger1} width="120px" alt={item.name} />
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
    </div>
  );
}

export default OrderDetails;
