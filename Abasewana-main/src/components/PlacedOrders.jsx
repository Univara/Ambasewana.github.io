import React from 'react';
import { useLocation } from 'react-router-dom';
import './Styles/PlacedOrders.css';

function PlacedOrders() {
  const location = useLocation();
  const { orderData } = location.state || {}; // Destructure orderData from state

  if (!orderData) {
    return <p>No order data available.</p>;
  }

  return (
    <div className="placed-orders">
      <h2>Order Confirmation</h2>
      <p>Customer Name: {orderData.customerName}</p>
      <p>Table Number: {orderData.table}</p>
      <p>Order Number: {orderData.orderNumber}</p>
      <p>Order Status: {orderData.orderStatus}</p>
      <div className="order-items">
        {orderData.items.map((item, index) => (
          <div key={index} className="order-item">
            <img src={item.image} alt={item.itemName} />
            <p>{item.itemName}</p>
            <p>Price: Rs.{item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacedOrders;
