// OrderDisplay.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import './Styles/OrderDisplay.css'; // Import CSS file for styling
import Loading from './Loading'; // Import the Loading component

const OrderDisplay = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchOrders();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/getOrders');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching orders. Please try again later.');
      setLoading(false);
      console.error('Error fetching orders:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/deleteOrder/${orderId}`
      );
      const { message } = response.data;

      toast.success(message);

      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Error deleting order. Please try again.');
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/updateOrderStatus/${orderId}`,
        { orderStatus: newStatus }
      );
      const { message } = response.data;

      toast.success(message);

      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error(
        `Error updating order status: ${
          error.response?.data?.message || error.message
        }. Please try again.`
      );
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="orders-container error-message">{error}</div>;
  }

  return (
    <div className="orders-container">
      <ToastContainer />
      <Link to="/order-history">
        <button className="order-history-button">Go to Order History</button>
      </Link>
      <h1 className="orders-heading">Orders</h1>

      {orders.map((order) => (
        <div key={order.orderId} className="order-item-container">
          <div className="order-summary">
            <div className="order-info-group">
              <p className="order-info">
                <strong>Date Time:</strong>{' '}
                {new Date(order.dateTime).toLocaleString()}
              </p>
              <p className="order-info">
                <strong>Customer Name:</strong> {order.customerName}
              </p>
              <p className="order-info">
                <strong>Table:</strong> {order.table}
              </p>
            </div>
            <div>
              <ul className="items-list">
                {order.items &&
                  order.items.map((item, index) => (
                    <li key={index} className="item">
                      <div className="item-details">
                        <p className="item-info">
                          <strong>Item Name:</strong>{' '}
                          {item.itemName || item.name}
                        </p>
                        <p className="item-info">
                          <strong>Quantity:</strong> {item.quantity}
                        </p>
                        <p className="item-info">
                          <strong>Price:</strong> Rs.{item.price}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="order-actions">
            <select
              className="status-select"
              value={order.orderStatus}
              onChange={(e) =>
                handleUpdateOrderStatus(order.orderId, e.target.value)
              }
            >
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
            </select>
            <button
              className="action-button"
              onClick={() => handleDeleteOrder(order.orderId)}
            >
              Done
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDisplay;
