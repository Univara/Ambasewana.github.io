import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/OrderHistory.css";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderHistory();
    
    // Set up event listener for visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchOrderHistory();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const fetchOrderHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/getOrderHistory"
      );
      setOrderHistory(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching order history. Please try again later.");
      setLoading(false);
      console.error("Error fetching order history:", error);
    }
  };

  if (loading) {
    return <div className="order-history-container">Loading...</div>;
  }

  if (error) {
    return <div className="order-history-container">{error}</div>;
  }

  return (
    <div className="order-history-container">
      <ToastContainer />
      <Link to="/OrderDisplay">
        <button>Go to Orders</button>
      </Link>
      <h1>Order History</h1>
      <ul>
        {orderHistory.map((order) => (
          <li key={order.id} className="order-item">
            <div>
              <p>Order ID: {order.id}</p>
              <p>Date Time: {new Date(order.dateTime).toLocaleString()}</p>
              <p>Order Number: {order.orderNumber}</p>
              <p>Order Status: {order.orderStatus}</p>
            </div>
            <ul className="items-list">
              {order.items &&
                order.items.map((item, index) => (
                  <li key={index} className="item">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.itemName || item.name}
                        className="item-image"
                      />
                    )}
                    <div>
                      <p>Item Name: {item.itemName || item.name}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: Rs.{item.price}</p>
                    </div>
                  </li>
                ))}
            </ul>
            <p>Customer Name: {order.customerName}</p>
            <p>Table: {order.table}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
